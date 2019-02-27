# -*- coding: utf-8 -*-
from googlesearch import search
import json

with open('../data/db.json') as f:
    data = json.load(f)

for student in data['students']:
    for url in search('site:linkedin.com intext:"HETIC" inurl:"/in/{}.{}"'.format(student['firstName'], student['lastName']), stop=1):
        print('Linkedin profile for {} {}: {}'.format(student['firstName'], student['lastName'], url))
        break