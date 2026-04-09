import csv
import json

def analyze_nakhon_sawan():
    target_province = "นครสวรรค์"
    districts_mapping = {
        "ลาดยาว": "Lat Yao",
        "ตากฟ้า": "Tak Fa",
        "ไไพศาลี": "Khaisali", # Wait, Phaisali?
        "ไพศาลี": "Khaisali"
    }
    
    try:
        with open(r'c:\RepoOutside\estar\src\data\estar-data.csv', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            stats = []
            for row in reader:
                if row['province'] == target_province:
                    stats.append({
                        "year": row['The year the church began'],
                        "district": row['district'],
                        "participate": row['Participate'],
                        "status": row['Status of the Church']
                    })
            
            with open(r'c:\RepoOutside\estar\src\data\nakhon_sawan_stats.json', 'w', encoding='utf-8') as out:
                json.dump(stats, out, ensure_ascii=False, indent=2)
            print(f"Stats for Nakhon Sawan saved. Count: {len(stats)}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    analyze_nakhon_sawan()
