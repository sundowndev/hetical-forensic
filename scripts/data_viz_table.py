# -*- coding: utf-8 -*-
import dash
import dash_core_components as dcc
import dash_html_components as html
import pandas as pd

external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']

app = dash.Dash(__name__, external_stylesheets=external_stylesheets)

students = pd.read_csv('../data/students.csv')

def generate_table(dataframe, max_rows=300):
    return html.Table(
        # Header
        [html.Tr([html.Th(col) for col in dataframe.columns])] +

        # Body
        [html.Tr([
            html.Td(dataframe.iloc[i][col]) for col in dataframe.columns
        ]) for i in range(min(len(dataframe), max_rows))]
    )

app.layout = html.Div(children=[
    html.H1(children='Hetic console'),

    html.Div(children='''
        Agrégateur d'OSINT pour l'intranet d'HETIC, OGP et OGI compris.
    '''),

    generate_table(students)
])

if __name__ == '__main__':
    app.run_server(debug=False)
