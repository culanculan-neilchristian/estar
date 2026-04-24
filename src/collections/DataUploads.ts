import type { CollectionConfig } from 'payload';
import { revalidatePath } from 'next/cache';
import path from 'path';
import fs from 'fs';
import { CsvDataService } from '../services/csv-data-service';

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
    staticDir: '../public/media',
    mimeTypes: ['text/csv', 'application/vnd.ms-excel', 'text/plain'],
    imageSizes: [],
    adminThumbnail: false,
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB
    },
  },
  fields: [],
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === 'create' || operation === 'update') {
          // Use an async IIFE to not block the return of the document
          // This prevents the "There was a problem while uploading the file" error in the UI
          // even if the post-processing (copying/revalidating) fails.
          (async () => {
            try {
              console.log(`[CSV-HOOK] Processing ${operation} for ${doc.filename}`);
              
              const root = process.cwd();
              // In Payload, if staticDir is '../public/media' and file is in src/collections
              // the actual folder is project_root/public/media
              const uploadedFilePath = path.resolve(root, 'public/media', doc.filename);
              const targetPath = path.resolve(root, 'src/data/estar-data.csv');
              
              // Wait a tiny bit to ensure the file is flushed to disk by Payload
              await new Promise(resolve => setTimeout(resolve, 500));

              if (fs.existsSync(uploadedFilePath)) {
                console.log(`[CSV-HOOK] Overwriting ${targetPath}`);
                fs.copyFileSync(uploadedFilePath, targetPath);
                
                CsvDataService.clearCache();
                
                // Try revalidate, but catch errors as it might fail in some server environments
                try {
                  revalidatePath('/');
                  revalidatePath('/churches');
                  console.log('[CSV-HOOK] Cache revalidated');
                } catch (revalidateError) {
                  console.warn('[CSV-HOOK] Revalidation failed (expected in some environments):', revalidateError);
                }
                
                console.log('✅ [CSV-HOOK] Update complete.');
              } else {
                console.warn('[CSV-HOOK] Source file not found:', uploadedFilePath);
              }
            } catch (error) {
              console.error('❌ [CSV-HOOK] Post-upload error:', error);
            }
          })();
        }
        return doc;
      }
    ]
  }
};
