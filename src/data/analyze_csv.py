import csv
import json

def analyze_csv():
    try:
        with open(r'c:\RepoOutside\estar\src\data\estar-data.csv', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            headers = reader.fieldnames
            rows = []
            for i, row in enumerate(reader):
                rows.append(row)
                if i >= 4:
                    break
            
            result = {
                "headers": headers,
                "samples": rows
            }
            
            with open(r'c:\RepoOutside\estar\src\data\analysis.json', 'w', encoding='utf-8') as out:
                json.dump(result, out, ensure_ascii=False, indent=2)
            print("Analysis complete. Saved to src/data/analysis.json")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    analyze_csv()
