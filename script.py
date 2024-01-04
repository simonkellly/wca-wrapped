import csv
import json
import collections

# aliases
OrderedDict = collections.OrderedDict


data = []

header = ['subid', 'name','country','gender','id']

country_dict = {
    
}

with open("WCA_export_Persons.tsv", "r") as file:
    reader = csv.reader(file, delimiter="\t")
    for row in reader:
        if row[4][0:4] == "2023":
            # row = filter(None, row)
            data.append(row)
            if country_dict.get(row[2]) == None:
                country_dict[row[2]] = 1
            else:
                country_dict[row[2]] += 1
            
print(country_dict)
print(len(data))