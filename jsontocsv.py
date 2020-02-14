import csv
import json
fr = open("data4030000-4035499.json")
fw = open("data.csv", "w", newline="")
csv_writer = csv.writer(fw)

json_fr = json.load(fr)

csv_writer.writerow(["maths","phy","chem","mech","bee","workshop","cgpa","sgpa"])

for student in json_fr:
    marks = student['marks']
    csv_writer.writerow(list(marks.values()))

fr.close()
fw.close()