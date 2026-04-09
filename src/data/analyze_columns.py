import csv
import json

def analyze_columns():
    try:
        with open(r'c:\RepoOutside\estar\src\data\estar-data.csv', encoding='utf-8') as f:
            reader = csv.reader(f)
            headers = next(reader)
            
            c28_counts = {}
            c29_counts = {}
            
            for row in reader:
                if row[27] == "นครสวรรค์":
                    v28 = row[28]
                    v29 = row[29]
                    c28_counts[v28] = c28_counts.get(v28, 0) + 1
                    c29_counts[v29] = c29_counts.get(v29, 0) + 1
            
            result = {
                "col28_counts": dict(sorted(c28_counts.items(), key=lambda item: item[1], reverse=True)),
                "col29_counts": dict(sorted(c29_counts.items(), key=lambda item: item[1], reverse=True))
            }
            
            with open(r'c:\RepoOutside\estar\src\data\column_analysis.json', 'w', encoding='utf-8') as out:
                json.dump(result, out, ensure_ascii=False, indent=2)
            print("Analyze columns complete.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    analyze_columns()
