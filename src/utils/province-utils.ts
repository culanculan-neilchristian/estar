
import { PROVINCE_MAPPING } from '../data/provinceMapping';

/**
 * Normalizes a province name from CSV data to its standard English name.
 * Handles Thai names, variations, and common prefixes.
 */
export function normalizeProvince(rawName: string | undefined | null): string {
    if (!rawName) return 'Unknown';
    
    const name = rawName.trim();
    
    // 1. Direct mapping check (Thai or English)
    if (PROVINCE_MAPPING[name]) return PROVINCE_MAPPING[name];
    
    // 2. Reverse mapping check (if rawName is already the English name)
    const englishNames = Object.values(PROVINCE_MAPPING);
    if (englishNames.includes(name)) return name;
    
    // 3. Handle common Thai prefixes/variations
    // Remove "จ.", "จังหวัด", "อำเภอเมือง" etc. if they are followed by a known province
    let cleanName = name
        .replace(/^(จ\.|จังหวัด|อำเภอเมือง|เมือง)\s*/, '')
        .replace(/\s*(ออก|ตก|เหนือ|ใต้)$/, ''); // Handle North/South/East/West suffixes
        
    if (PROVINCE_MAPPING[cleanName]) return PROVINCE_MAPPING[cleanName];
    
    // 4. Fuzzy check: if the raw name CONTAINS any of the keys in PROVINCE_MAPPING
    for (const [thaiName, engName] of Object.entries(PROVINCE_MAPPING)) {
        if (name.includes(thaiName)) return engName;
    }

    return name;
}

/**
 * Gets the Thai name for a province, given either Thai or English.
 */
export function getThaiProvinceName(name: string | undefined | null): string {
    if (!name) return 'นครสวรรค์'; // Default fallback
    
    const normalized = name.trim();
    
    // If it's already a key (Thai), return it
    if (PROVINCE_MAPPING[normalized]) return normalized;
    
    // If it's a value (English), find the key
    for (const [thai, eng] of Object.entries(PROVINCE_MAPPING)) {
        if (eng === normalized) return thai;
    }
    
    return normalized;
}
