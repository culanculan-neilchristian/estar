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
  amphoe?: string;
  tambon?: string;
  participate?: string;
  coordinates?: string;
  status?: string;
  imageMain?: string;
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
      if (h === 'province' || h === 'Provincial region') return 'province';
      if (h === 'Coordinates of the church') return 'coordinates';
      if (h === 'Status of the Church') return 'status';
      if (h === 'Church pictures') return 'imageMain';
      if (h === 'Participate') return 'participate';
      if (h === 'district' || h === 'District Church') return 'amphoe';
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
      village: parseInt(row.village || '0', 10),
      province: row.province || '',
      amphoe: row.amphoe || '',
      tambon: row.tambon || '',
      participate: parseInt(row.participate || '0', 10),
      coordinates: row.coordinates,
      status: row.status || '',
      imageMain: row.imageMain,
    }));
}
