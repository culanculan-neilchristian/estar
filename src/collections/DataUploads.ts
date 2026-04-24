import type { CollectionConfig } from 'payload';
import { revalidatePath } from 'next/cache';
import Papa from 'papaparse';
// import { clearChurchCache } from '../utils/cache'; // No longer needed with revalidateTag

export const DataUploads: CollectionConfig = {
  slug: 'data-uploads',
  labels: {
    singular: 'CSV Upload',
    plural: 'CSV Uploads',
  },
  admin: {
    useAsTitle: 'filename',
    description: 'Upload the latest estar-data.csv file here to update the dashboard instantly.',
  },
  upload: {
    staticDir: 'uploads/data',
    disableLocalStorage: true,
    mimeTypes: ['text/csv', 'application/vnd.ms-excel', 'text/plain'],
    imageSizes: [],
    adminThumbnail: undefined,
  },
  fields: [
    {
      name: 'results',
      type: 'json',
      admin: {
        hidden: true, // Don't show the massive JSON in the admin UI
      },
    }
  ],
  hooks: {
    beforeChange: [
      async ({ operation, data, req }) => {
        if ((operation === 'create' || operation === 'update') && req.file && req.file.data) {
          console.log(`[CSV-PROCESS] Parsing ${req.file.name} into JSON...`);
          
          try {
            const csvString = req.file.data.toString('utf8');
            let districtCount = 0;
            
            // Parse synchronously from buffer
            const results = Papa.parse(csvString, {
              header: true,
              skipEmptyLines: true,
              transformHeader: (header) => {
                const h = header.trim();
                if (h === 'Response ID') return 'id';
                if (h === 'Submitted Time') return 'submittedTime';
                if (h === 'Church name') return 'churchName';
                if (h === 'The year the church began') return 'yearBegan';
                if (h === 'Church type') return 'type';
                if (h === 'Village') return 'village';
                if (h === 'province') return 'province';
                if (h === 'Coordinates of the church') return 'coordinates';
                if (h === 'Status of the Church') return 'status';
                if (h === 'Church pictures') return 'imageMain';
                if (h === 'Participate') return 'participate';
                
                if (h === 'district') {
                  districtCount++;
                  return districtCount === 1 ? 'amphoe' : 'tambon';
                }
                return h;
              }
            });

            interface RawCsvRow {
              id?: string;
              submittedTime?: string;
              churchName?: string;
              yearBegan?: string;
              type?: string;
              village?: string;
              province?: string;
              amphoe?: string;
              tambon?: string;
              participate?: string;
              coordinates?: string;
              status?: string;
              imageMain?: string;
            }

            const churches = (results.data as RawCsvRow[]).filter((row): row is RawCsvRow & { id: string; churchName: string } => 
              !!row.id && !!row.churchName
            ).map((row) => ({
              id: row.id,
              submittedTime: row.submittedTime,
              churchName: row.churchName,
              yearBegan: row.yearBegan,
              type: row.type,
              village: parseInt(row.village || '0', 10),
              province: row.province,
              amphoe: row.amphoe,
              tambon: row.tambon,
              participate: parseInt(row.participate || '0', 10),
              coordinates: row.coordinates,
              status: row.status,
              imageMain: row.imageMain,
            }));

            data.results = churches;
            console.log(`[CSV-PROCESS] Successfully parsed ${churches.length} churches.`);
          } catch (err) {
            console.error('[CSV-PROCESS] Error parsing CSV:', err);
          }

          // Cleanup old records
          try {
            const existing = await req.payload.find({
              collection: 'data-uploads',
              limit: 5,
            });
            if (existing.totalDocs > 0) {
              await Promise.all(existing.docs.map(doc => 
                req.payload.delete({ collection: 'data-uploads', id: doc.id })
              ));
            }
          } catch (e) {
            console.error('[CSV-PROCESS] Error cleaning up old records:', e);
          }
        }
      }
    ],
    afterChange: [
      async ({ operation }) => {
        if (operation === 'create' || operation === 'update') {
          // Trigger Next.js to revalidate the frontend pages
          try {
            revalidatePath('/', 'layout');
            revalidatePath('/churches', 'page');
            console.log('[CSV-UPLOAD] Cache cleared and revalidated');
          } catch (e) {
            console.warn('[CSV-UPLOAD] Revalidation failed:', e);
          }
        }
      }
    ]
  }
};
