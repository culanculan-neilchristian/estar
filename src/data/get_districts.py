import csv
import json

def get_nakhon_sawan_districts():
    try:
        with open(r'c:\RepoOutside\estar\src\data\estar-data.csv', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            districts = set()
            for row in reader:
                if row['province'] == "นครสวรรค์":
                    districts.add(row['district'])
            print(f"Districts: {list(districts)}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    get_nakhon_sawan_districts()
