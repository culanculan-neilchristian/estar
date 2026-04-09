import csv
import json
from collections import Counter

def summarize_nakhon_sawan():
    target_province = "นครสวรรค์"
    try:
        with open(r'c:\RepoOutside\estar\src\data\estar-data.csv', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            years = Counter()
            statuses = Counter()
            types = Counter()
            total_joined = 0
            count = 0
            
            for row in reader:
                if row['province'] == target_province:
                    count += 1
                    years[row['The year the church began']] += 1
                    statuses[row['Status of the Church']] += 1
                    types[row['Church type']] += 1
                    try:
                        total_joined += int(row['Participate'])
                    except:
                        pass
            
            summary = {
                "total_rows": count,
                "total_joined": total_joined,
                "years": dict(years),
                "statuses": dict(statuses),
                "types": dict(types)
            }
            
            with open(r'c:\RepoOutside\estar\src\data\nakhon_sawan_summary.json', 'w', encoding='utf-8') as out:
                json.dump(summary, out, ensure_ascii=False, indent=2)
            print("Summary complete.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    summarize_nakhon_sawan()
