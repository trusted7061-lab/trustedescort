#!/usr/bin/env python3
with open('src/pages/CompanionProfile.jsx', 'r') as f:
    lines = f.readlines()

# Find the line with "export default CompanionProfile"
export_line = -1
for i, line in enumerate(lines):
    if 'export default CompanionProfile' in line:
        export_line = i
        break

if export_line != -1:
    # Keep only lines up to and including the export line plus one blank line
    new_content = ''.join(lines[:export_line+2])  
    with open('src/pages/CompanionProfile.jsx', 'w') as f:
        f.write(new_content)
    print(f"Truncated file. Removed garbage after line {export_line+1}")
else:
    print("Export line not found")
