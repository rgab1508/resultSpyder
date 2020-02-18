import json
import numpy as np
import matplotlib.pyplot as plt

files = ['data4027626-4029999.json', 'data4030000-4035000.json', 'data4035001-4039868.json']
# f = open('data4035001-4039629.json', 'r')
# f1 = open('data4039630-4039868.json', 'r')
# f2 = open('data4039000-4039629.json', 'r')

# json_f = json.load(f)
# json_f1 = json.load(f1)
# json_f2 = json.load(f2)
# students = json_f
# students1 = json_f1
# students2 = json_f2

# print(len(students))


def list_of_enggs():
    enggs = []
    for s in students:
        if s['branch'] in enggs:
            pass
        else:
            enggs.append(s['branch'])

    return enggs

def cgpa_ratio():

    cgpas = {}

    for i in range(len(students)):
        marks = students[i]['marks']
        cgpa = int(marks['cgpa'])

        if cgpa in cgpas:
            cgpas[cgpa] += 1
        else:
            cgpas[cgpa] = 1

    # return cgpas
    # print(cgpas)
    _ = []
    for j in sorted(cgpas.keys()):
        _.append(cgpas[j])

    return _


def cgpa_data():
    cgpas = {}
    students_len = 0
    for f in files:
        _f = open(f)
        students = json.load(_f)
        students_len += len(students)
        for s in students:
            marks = s['marks']
            cgpa = int(marks['cgpa'])

            if cgpa in cgpas:
                cgpas[cgpa] += 1
            else:
                cgpas[cgpa] = 1

    
    return cgpas, students_len
        
data, data_len = cgpa_data()

for i in sorted(data.keys()):
    print(f"{i}:{data[i]}")

print(f"no of students: {data_len}")


# a = cgpa_ratio()
# for i in range(len(a)):
#     print(f"{i}:{a[i]}")

# data = np.array(cgpa_ratio())
# print(data)

# # plt.pie(data,labels =np.arange(0, 11, 1),autopct='%1.2f%%')
# # plt.show()
# fig = plt.figure()
# ax = fig.add_axes([0,0,1,1])
# ax.axis('equal')
# langs = [f"{x} cgpa" for x in np.arange(0, 11, 1)]
# students = data
# ax.pie(students, labels = langs,autopct='%1.2f%%')
# plt.show()

def list_of_colleges():
    clgs = []
    for s in students: 
        if s['college'] in clgs:
            pass
        else:
            clgs.append(s['college'])

    return clgs


# l = list_of_colleges()
# print("\n".join(l), len(l))
# cgpa_ratio()

def success_ratio():
    status = {}
    for i in students:
        if i['status'] in status:
            status[i['status']] += 1
        else:
            status[i['status']] = 1
        
    return status['Successful'], status['Unsuccessful']

# print(success_ratio())

def merge_file(stud_1, stud_2,file_name):
    stud_n = stud_1 + stud_2
    ff = open(file_name, "w")
    ff.write(json.dumps(stud_n))
    ff.close()


# merge_file(students, students1, 'data4035001-4039629.json')