import Papa from 'papaparse';
import type { ChurchData } from '@/types/church';

interface RawCsvRow {
  id?: string;
  submittedTime?: string;
  churchName?: string;
  yearBegan?: string;
  type?: string;
  village?: string;
  province?: string;
  provinceRegion?: string;
  amphoe?: string;
  districtChurch?: string;
  tambon?: string;
  participate?: string;
  coordinates?: string;
  status?: string;
  imageMain?: string;
}

function parseCsvNumber(value: string | undefined): number {
  const parsed = parseInt(value || '0', 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function parseChurchCsv(csvString: string): ChurchData[] {
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
      if (h === 'Provincial region') return 'provinceRegion';
      if (h === 'Coordinates of the church') return 'coordinates';
      if (h === 'Status of the Church') return 'status';
      if (h === 'Church pictures') return 'imageMain';
      if (h === 'Participate') return 'participate';
      if (h === 'district') return 'amphoe';
      if (h === 'District Church') return 'districtChurch';
      if (h === 'sub district' || h === 'Sub District') return 'tambon';
      return h;
    },
  });

  return (results.data as RawCsvRow[])
    .filter((row): row is RawCsvRow & { id: string; churchName: string } =>
      !!row.id && !!row.churchName
    )
    .map((row) => ({
      id: row.id,
      submittedTime: row.submittedTime || '',
      churchName: row.churchName,
      yearBegan: row.yearBegan,
      type: row.type,
      village: parseCsvNumber(row.village),
      province: row.province || row.provinceRegion || '',
      amphoe: row.amphoe || '',
      tambon: row.tambon || '',
      participate: parseCsvNumber(row.participate),
      coordinates: row.coordinates,
      status: row.status || '',
      imageMain: row.imageMain,
    }));
}
