import csv
import json

def get_districts():
    try:
        with open(r'c:\RepoOutside\estar\src\data\estar-data.csv', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            districts = {}
            for row in reader:
                if row['province'] == "นครสวรรค์":
                    d = row['district']
                    districts[d] = districts.get(d, 0) + 1
            
            # Sort by count desc
            sorted_dist = dict(sorted(districts.items(), key=lambda item: item[1], reverse=True))
            
            with open(r'c:\RepoOutside\estar\src\data\ns_districts_counts.json', 'w', encoding='utf-8') as out:
                json.dump(sorted_dist, out, ensure_ascii=False, indent=2)
            print("Done")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    get_districts()
