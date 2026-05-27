# 📊 CSV Upload & Data Format Guidelines

This document provides comprehensive steps and technical details on how to upload the latest `estar-data.csv` file into the application via Payload CMS, including data format requirements and mandatory headers.

---

## 🚀 How to Upload the CSV

To update the live dashboard with the latest dataset, follow these steps in the Admin Panel:

1. **Log in to the Admin Panel**:
   - Navigate to the Payload CMS Admin UI (typically at `/admin`, e.g., `http://localhost:3000/admin` or your production domain).
2. **Go to CSV Uploads**:
   - In the left sidebar navigation, find and click on **CSV Uploads** (or **Data Uploads** under Collections).
3. **Upload a New File**:
   - Click **Create New** or **Upload**.
   - Select your new `.csv` file containing the updated records.
   - Click **Save / Publish**.
4. **Automated Processing**:
   - Upon saving, the system automatically parses the CSV using PapaParse, cleans up old records in the database to optimize space, and triggers a revalidation of the frontend routes (`/` and `/churches`).
   - The dashboard will **instantly update** in real-time!

---

## 📐 General CSV File Requirements

To prevent parsing errors or character corruption, ensure your file adheres to the following rules:

- **File Extension**: Must be `.csv` (Comma Separated Values) or `.txt` (containing valid comma-separated text).
- **Encoding**: Must be saved with **UTF-8 Encoding**. This is extremely important because the dataset contains Thai characters for province names, districts, sub-districts, and church names. If not encoded in UTF-8, these characters will render as gibberish (e.g., `???`).
- **Separator**: Standard comma `,` separator.
- **Line Endings**: LF or CRLF.

---

## 📋 CSV Headers and Data Mapping

The following table details the expected headers in the CSV file, how they map to the system's internal fields, and their requirements:

| CSV Header Name (Case-Sensitive / Exact Match) | System Internal Field | Status | Description & Expected Format | Example |
| :--- | :--- | :--- | :--- | :--- |
| **`Response ID`** | `id` | 🔴 **Required** | Unique ID for each church record. Must not be blank. | `183416` |
| **`Church name`** | `churchName` | 🔴 **Required** | The name of the church. Must not be blank. | `แสนสุขพัฒนา` |
| `Submitted Time` | `submittedTime` | 🟢 Optional | Date and time when the response was submitted. | `2024-10-21 14:32` |
| `The year the church began` | `yearBegan` | 🟢 Optional | 4-digit calendar year when the church started. | `2024` |
| `Church type` | `type` | 🟢 Optional | Type of the church location. | `หมู่บ้าน` |
| `Village` | `village` | 🟢 Optional | Village or mooban number. Parsed as an integer. Defaults to `0`. | `20` |
| `province` or `Provincial region` | `province` | 🟢 Optional | Thai province name. | `พิษณุโลก` |
| `district` or `District Church` | `amphoe` | 🟢 Optional | Thai district (Amphoe) name. | `วังนกแอ่น` |
| `sub district` or `Sub District` | `tambon` | 🟢 Optional | Thai sub-district (Tambon) name. | `วังนกแอ่น` |
| `Participate` | `participate` | 🟢 Optional | Number of participants/members. Parsed as an integer. Defaults to `0`. | `4` |
| `Coordinates of the church` | `coordinates` | 🟢 Optional | Geographical coordinates. Must be formatted as `latitude, longitude`. | `16.850006, 100.668110` |
| `Status of the Church` | `status` | 🟢 Optional | Current operational status of the church. | `เปิดอยู่` |
| `Church pictures` | `imageMain` | 🟢 Optional | URL pointing to the primary photo of the church. | `https://storage.googleapis.com/...` |

> [!IMPORTANT]
> - The columns **`Response ID`** and **`Church name`** are strictly mandatory for each row. If any of these two are missing or blank in a row, the parser will **skip** that row to prevent saving invalid or corrupt data.
> - The **`Coordinates of the church`** must be simple numbers separated by a comma. Extra text, letters, or formatting within this cell will cause map rendering failures.

---

## 📝 Sample CSV Template

You can copy and use this raw text template to format your data:

```csv
Response ID,Submitted Time,The year the church began,Church name,Participate,Church type,Village,Provincial region,District Church,Sub District,Coordinates of the church,Status of the Church,Church pictures
183416,2024-10-21 14:32,2024,แสนสุขพัฒนา,4,หมู่บ้าน,20,พิษณุโลก,วังนกแอ่น,วังนกแอ่น,"16.850006693430018, 100.66811040379929",เปิดอยู่,https://storage.googleapis.com/kaptrack-main-asia-southeast1/form/1373/response/GXEwPfK9DTB4aVOVuVCVz7MA97HvNm29.jpg
181479,2023-12-29 10:53,2023,บึงบ้าน,7,หมู่บ้าน,7,พิจิตร,ทุ่งใหญ่,ทุ่งใหญ่,"16.311105427332098, 100.02159702598857",เปิดอยู่,
269377,2025-11-26 11:19,2025,ไผ่ค่อม,3,หมู่บ้าน,3,พิษณุโลก,ปากโทก,ปากโทก,"16.8887489, 100.2402783",เปิดอยู่,https://storage.googleapis.com/kaptrack-main-asia-southeast1/form/1373/response/0ArE6Qmgd53ZYVwwnRIj8XUoR8y0DofY.jpg
```

---

## 🛠️ Troubleshooting Common Issues

- **Dashboard didn't update after upload?**
  - Ensure you clicked the **Save** or **Publish** button in Payload CMS.
  - Verify that your file is formatted as a proper `.csv`.
  - Double check that the columns **`Response ID`** and **`Church name`** are spelled exactly as shown (they are case-sensitive and spacing-sensitive).
- **Thai characters turned into `???`?**
  - Make sure you save/export the file using **CSV UTF-8 (Comma delimited) (*.csv)** in Microsoft Excel or Google Sheets. Standard CSV exports in Windows-based Excel can sometimes use ANSI/Windows-1252 encoding, which destroys non-Latin characters.
- **Coordinates not rendering on the Map?**
  - Ensure there are no spaces or extra characters inside the coordinate field (e.g. should be strictly in the format `13.7563, 100.5018`).
