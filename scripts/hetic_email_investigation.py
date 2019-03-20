#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import requests
import json
import random

with open('./data/db.json') as f:
    data = json.load(f)

try:
    for student in data['students']:
        targetEmail = student['heticEmail']

        print('[*] Searching breaches for account %s' % (targetEmail))

        req = requests.request(
            'GET', 'https://haveibeenpwned.com/api/v2/breachedaccount/%s?truncateResponse=true' % (targetEmail))

        if req.status_code == 404:
            continue
        elif req.status_code == 200:
            breaches = json.loads(req.content)
            for breach in breaches:
                print('[!] Data breach found: %s' % (breach['Name']))
        elif req.status_code == 429:
            print('You can retry in %s seconds.' %
                  (req.headers['Retry-After']))
            sys.exit()
        else:
            print('You have been blocked. (%s)' % (req.status_code))
            sys.exit()
except KeyboardInterrupt:
    print('\nExited.')
