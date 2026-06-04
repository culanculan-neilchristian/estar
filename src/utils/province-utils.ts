import { PROVINCE_MAPPING } from '../data/provinceMapping';

const THAI_PROVINCE_MAPPING: Record<string, string> = {
  'นครสวรรค์': 'Nakhon Sawan',
  'เพชรบูรณ์': 'Phetchabun',
  'ขอนแก่น': 'Khon Kaen',
  'พิจิตร': 'Phichit',
  'ชัยภูมิ': 'Chaiyaphum',
  'พิษณุโลก': 'Phitsanulok',
  'กำแพงเพชร': 'Kamphaeng Phet',
  'ลพบุรี': 'Lop Buri',
  'ชัยนาท': 'Chai Nat',
  'อุทัยธานี': 'Uthai Thani',
};

/**
 * Normalizes a province name from CSV data to its standard English name.
 * Handles Thai names, variations, and common prefixes.
 */
export function normalizeProvince(rawName: string | undefined | null): string {
  if (!rawName) return 'Unknown';

  const name = rawName.trim();

  if (THAI_PROVINCE_MAPPING[name]) return THAI_PROVINCE_MAPPING[name];

  // Direct mapping check for older/mojibake data or other configured names.
  if (PROVINCE_MAPPING[name]) return PROVINCE_MAPPING[name];

  // Reverse mapping check if rawName is already the English name.
  const englishNames = Object.values(PROVINCE_MAPPING);
  if (englishNames.includes(name)) return name;

  const cleanName = name
    .replace(/^(จ\.|จังหวัด|อำเภอเมือง|เมือง)\s*/, '')
    .replace(/\s*(ออก|ตก|เหนือ|ใต้)$/, '')
    .replace(/^(à¸ˆ\.|à¸ˆà¸±à¸‡à¸«à¸§à¸±à¸”|à¸­à¸³à¹€à¸ à¸­à¹€à¸¡à¸·à¸­à¸‡|à¹€à¸¡à¸·à¸­à¸‡)\s*/, '')
    .replace(/\s*(à¸­à¸­à¸|à¸•à¸|à¹€à¸«à¸™à¸·à¸­|à¹ƒà¸•à¹‰)$/, '');

  if (THAI_PROVINCE_MAPPING[cleanName]) return THAI_PROVINCE_MAPPING[cleanName];
  if (PROVINCE_MAPPING[cleanName]) return PROVINCE_MAPPING[cleanName];

  for (const [thaiName, engName] of Object.entries(PROVINCE_MAPPING)) {
    if (name.includes(thaiName)) return engName;
  }

  return name;
}

/**
 * Gets the Thai name for a province, given either Thai or English.
 */
export function getThaiProvinceName(name: string | undefined | null): string {
  if (!name) return 'นครสวรรค์';

  const normalized = name.trim();

  for (const [thai, eng] of Object.entries(THAI_PROVINCE_MAPPING)) {
    if (thai === normalized || eng === normalized) return thai;
  }

  if (PROVINCE_MAPPING[normalized]) return normalized;

  for (const [thai, eng] of Object.entries(PROVINCE_MAPPING)) {
    if (eng === normalized) return thai;
  }

  return normalized;
}
