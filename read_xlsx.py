import sys

try:
    import pandas as pd
    file_path = "d:\\TOOL GOOGLE ANTIGRAVITY\\10. Tool Checklist Report\\Database\\Checklist\\CheckList_Install.xlsx"
    df = pd.read_excel(file_path, sheet_name=None)
    for sheet_name, sheet_data in df.items():
        print(f"--- Sheet: {sheet_name} ---")
        print(sheet_data.head(20).to_string())
except ImportError:
    print("pandas or openpyxl not installed.")
except Exception as e:
    print(f"Error: {e}")
