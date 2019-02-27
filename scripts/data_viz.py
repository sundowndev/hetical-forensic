# -*- coding: utf-8 -*-
import dash
import dash_core_components as dcc
import dash_html_components as html
import pandas as pd

external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']

app = dash.Dash(__name__, external_stylesheets=external_stylesheets)

students = pd.read_csv('../data/students.csv')

nb2015 = len(students[students.promotion.isin([2015])])
nb2016 = len(students[students.promotion.isin([2016])])
nb2017 = len(students[students.promotion.isin([2017])])
nb2018 = len(students[students.promotion.isin([2018])])
nb2019 = len(students[students.promotion.isin([2019])])
nb2020 = len(students[students.promotion.isin([2020])])
nb2021 = len(students[students.promotion.isin([2021])])

app.layout = html.Div(children=[
    html.H1(children='Hetic console'),

    html.Div(children='''
        Agrégateur d'OSINT pour l'intranet d'HETIC, OGP et OGI compris.
    '''),

    dcc.Graph(
        id='graph1',
        figure={
            'data': [
                {'x': ['P2015', 'P2016', 'P2017', 'P2018', 'P2019', 'P2020', 'P2021'], 'y': [nb2015, nb2016, nb2017, nb2018, nb2019, nb2020, nb2021], 'type': 'bar', 'name': 'Étudiants'},
            ],
            'layout': {
                'title': 'Évolution du nombre d\'étudiants dans chaque promotions'
            }
        }
    ),

    dcc.Graph(
        id='graph2',
        figure={
            'data': [
                {'x': ['P2019', 'P2020', 'P2021'], 'y': [120, 110, 98], 'type': 'bar', 'name': 'WEB1'},
                {'x': ['P2019', 'P2020', 'P2021'], 'y': [80, 90, 88], 'type': 'bar', 'name': 'WEB2'},
                {'x': ['P2019', 'P2020', 'P2021'], 'y': [74, 86, 81], 'type': 'bar', 'name': 'WEB3'},
            ],
            'layout': {
                'title': 'Évolution du nombre d\'étudiants dans chaque promotions par cursus'
            }
        }
    )
])

if __name__ == '__main__':
    app.run_server(debug=False)
