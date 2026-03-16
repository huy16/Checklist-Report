import sys
import pandas as pd
import json

try:
    file_path = "d:\\TOOL GOOGLE ANTIGRAVITY\\10. Tool Checklist Report\\Database\\Checklist\\CheckList_Install.xlsx"
    df = pd.read_excel(file_path, sheet_name="Survey Checklist")
    # Clean up empty rows/columns
    df = df.dropna(how='all')
    df = df.dropna(axis=1, how='all')
    
    records = []
    for index, row in df.iterrows():
        # Combine non-null values in the row into a string or dictionary
        row_values = [str(val).strip() for val in row.values if pd.notna(val) and str(val).strip() != ""]
        if row_values:
            records.append(" | ".join(row_values))
            
    with open("d:\\TOOL GOOGLE ANTIGRAVITY\\10. Tool Checklist Report\\checklist_parsed.txt", "w", encoding="utf-8") as f:
        for r in records:
            f.write(r + "\n")
    print("Parsed successfully to checklist_parsed.txt")
except Exception as e:
    print(f"Error: {e}")
