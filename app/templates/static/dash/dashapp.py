import os
from pathlib import Path

import dash
import numpy as np
from dash.dependencies import Input, Output
from dash import dcc, html
import dash_bootstrap_components as dbc
from dash import dash_table
from dash.dash_table.Format import Format

import flask
import pandas as pd
from numpy import round, abs
import plotly.express as px
import plotly.figure_factory as ff
import plotly.graph_objs as go

from app.modules.postgres_operations import query_all_data
from app.modules.custom_df_functions import reference_markdown

BASE_PATH = Path(__file__).resolve().parent

PAGE_SIZE = 5


def create_dash_app(requests_pathname_prefix: str = None) -> dash.Dash:

    # Flask server
    server = flask.Flask(__name__)
    server.secret_key = os.environ.get('secret_key', 'secret')

    # Dash
    app = dash.Dash(__name__, server=server, requests_pathname_prefix=requests_pathname_prefix,
                    external_stylesheets=[dbc.themes.BOOTSTRAP])
    app.scripts.config.serve_locally = False
    dcc._js_dist[0]['external_url'] = 'https://cdn.plot.ly/plotly-basic-latest.min.js'

    # Get data from Postgres
    full_data = query_all_data(table_name='project')
    full_data = full_data.fillna("")
    ref_data = query_all_data(table_name='reference')

    full_data['reference_id'] = full_data['reference_id'].apply(lambda x: reference_markdown(x, ref_data))

    BOOL_COLS = [col for col in full_data.columns.tolist() if col[:6] == 'enduse']

    full_data['enduse_sum'] = full_data[BOOL_COLS].sum(axis=1)
    full_data['enduse'] = (full_data[BOOL_COLS]
                           .idxmax(axis=1)
                           .where(full_data['enduse_sum'] != 0)
                           )
    full_data['enduse'] = (full_data['enduse']
                           .str.replace('enduse', '')
                           .str.replace('_', ' ')
                           .str.strip()
                           .str.title()
                           )

    _TABLE_COLS = ['project_name', 'country', 'date_online', 'status', 'reference_id']
    table_df = full_data[_TABLE_COLS]
    # Layout
    app.layout = html.Div([
        html.Div([

            html.Font(),

            html.Div(
                dbc.Container([
                    dbc.Row([
                        dbc.Col([
                            html.Label('Publication', className='a-dropdown__label f-ui-2'),
                            dcc.Dropdown(id='publication', options=[
                                {"label": "Hydrogen Projects 2022", "value": 2022}
                            ],
                                         value=2022,
                                         className='a-dropdown__trigger f-title-8')
                        ]),
                        dbc.Col([
                            html.Label('Country', className='a-dropdown__label f-ui-2'),
                            dcc.Dropdown(id='country', options=['All'] + sorted(full_data
                                                                   [full_data['country'] != 'NaN']
                                                                   ['country']
                                                                   .dropna()
                                                                   .unique()
                                                                   .tolist()),
                                         value='All',
                                         className='a-dropdown__trigger f-title-8')
                        ]),
                    ]),
                    dbc.Row([
                        dbc.Col([
                            html.Label('Technology', className='a-dropdown__label f-ui-2'),
                            dcc.Dropdown(id='technology', options=['All'] + sorted(full_data
                                                                   [full_data['technology'] != 'NaN']
                                                                   ['technology']
                                                                   .dropna()
                                                                   .unique()
                                                                   .tolist()),
                                         value='All',
                                         className='a-dropdown__trigger f-title-8')
                        ]),
                        dbc.Col([
                            html.Label('Status', className='a-dropdown__label f-ui-2'),
                            dcc.Dropdown(id='status', options=['All'] + sorted(full_data
                                                                   [full_data['status'] != 'NaN']
                                                                   ['status']
                                                                   .dropna()
                                                                   .unique()
                                                                   .tolist()),
                                         value='All',
                                         className='a-dropdown__trigger f-title-8')
                        ]),
                    ]),
                ])
            ),
        ], style={'align-items': 'right', 'justify-content': 'right'}),
        html.Div(id='output_container', style={'text-align': 'center'}, children=[]),
        html.Br(),
        html.Div(
            dbc.Container([
                dbc.Row([
                    dbc.Col([
                        dcc.Graph(id='project_status', figure={})
                    ])
                ]),
                html.Br(),
                #  Download Button
                html.Div([
                    # html.A(
                    #     html.Span('Download All Current References'),
                    #     className='a-link-icon a-link-icon--primary'
                    # ),
                    dbc.Button("Download All References Below", color="primary", className="a-button a-button--primary"),
                    # html.Button(, id="btn-download-txt", className=),
                    dcc.Download(id="download-text")
                ], style={"text-align": "right"}),
                html.Br(),
                #  Reference Table
                dbc.Row(
                    html.Div(
                        dash_table.DataTable(table_df.to_dict('records'),
                                             [{"name": i.replace('_', ' ').title(),
                                               "id": i,
                                               "type": "text",
                                               'presentation': 'markdown'} for i in table_df.columns
                                              ],
                                             id='tbl',
                                             page_current=0,
                                             page_size=PAGE_SIZE,
                                             page_action='custom',
                                             style_header={'textAlign': 'center'},
                                             style_cell={'font-family': 'Graphik,Arial,sans-serif',
                                                         'whiteSpace': 'normal',
                                                         'height': 'auto'},
                                             ),
                        className='m-block m-block--text'
                    )
                ),
                dbc.Row([
                    dbc.Col([
                        dcc.Graph(id='figure2', figure={})
                    ])
                ])
            ]),
            className='m-chart-block',
            style={"border": "1px solid #e6e6e6;"}
        ),

        # dcc.Store stores the intermediate value
        dcc.Store(id='intermediate-value')
    ])

    @app.callback(
        Output(component_id='intermediate-value', component_property='data'),
        # [Output(component_id='tbl', component_property='page_current'),
        #  Output(component_id='intermediate-value', component_property='data')],
        [Input(component_id='publication', component_property='value'),
         Input(component_id='country', component_property='value'),
         Input(component_id='technology', component_property='value'),
         Input(component_id='status', component_property='value')]
    )
    def get_viz_data(publication_selected: int, country_selected: str,
                     technology_selected: str, status_selected: str):

        pub_data = full_data[full_data['dataset_version'] == publication_selected]

        # Filter based on current selections for country, technology and status
        for input_selection, col in [(country_selected, 'country'),
                                     (technology_selected, 'technology'),
                                     (status_selected, 'status')]:

            if input_selection != 'All':
                pub_data = pub_data[pub_data[col] == input_selection]
            else:
                pass

        pub_data['status'] = pub_data['status'].replace('NaN', None)
        pub_data_json = pub_data.to_json(date_format='iso', orient='split')

        return pub_data_json

    # @app.callback(
    #     Output(component_id='tbl', component_property='page_current'),
    #     # [Output(component_id='tbl', component_property='page_current'),
    #     #  Output(component_id='intermediate-value', component_property='data')],
    #     [Input(component_id='publication', component_property='value'),
    #      Input(component_id='country', component_property='value'),
    #      Input(component_id='technology', component_property='value'),
    #      Input(component_id='status', component_property='value')]
    # )
    # def update_table_page(publication_selected: int, country_selected: str,
    #                  technology_selected: str, status_selected: str):
    #     return 0

    @app.callback(
        [Output(component_id='output_container', component_property='children'),
         Output(component_id='project_status', component_property='figure'),
         Output(component_id='figure2', component_property='figure')],
        Input(component_id='intermediate-value', component_property='data')
    )
    def update_graph(json_viz_data):
        pub_data = pd.read_json(json_viz_data, orient='split')

        pub_data['status'] = pub_data['status'].replace('NaN', None)
        enduse_cols = [col for col in pub_data.columns.tolist() if col[:6] == 'enduse']

        status_by_enduse = (pub_data[['status'] + enduse_cols]
                            .dropna()
                            .groupby(by='status')
                            .sum(numeric_only=True)
                            .T
                            )

        status_by_enduse = status_by_enduse.drop('enduse_sum')

        status_by_enduse.index = generate_figure_labels(status_by_enduse.index)
        status_by_enduse.columns = [str(col).title() for col in status_by_enduse.columns]

        hovertemplate_enduse = '%{x}<br>' + 'Project Count: <b>%{y}</b>'

        fig = px.bar(status_by_enduse,
                     labels={'index': 'End Use',
                             'value': 'Project Count',
                             'variable': 'Status'})

        fig.update_traces(hovertemplate=hovertemplate_enduse)
        fig.update_layout(
            legend=dict(
                orientation="h",
                yanchor="bottom",
                y=1.02
            ),
            hoverlabel=dict(
                bgcolor="white",
                font_size=14,
                font_family="Graphik,Arial,sans-serif;"
            )
        )
        fig.update_xaxes()

        # table_data = pub_data.iloc[page_current*page_size:(page_current + 1)*page_size].to_dict('records')

        container = ''

        full_data['iea_zeroc_norm_capacity_est_nm3_h2h'] = pd.to_numeric(
            full_data['iea_zeroc_norm_capacity_est_nm3_h2h']
        )

        fig2_data = (full_data
                     [((full_data['iea_zeroc_norm_capacity_est_nm3_h2h'] > 0.0) &
                       (full_data['product'] != ''))]
                     .dropna()
                     )

        fig2_data['iea_zeroc_norm_capacity_est_nm3_h2h_log'] = (fig2_data['iea_zeroc_norm_capacity_est_nm3_h2h']
                                                                .apply(lambda x: np.log(np.abs(x)+0.0000001))
                                                                )

        hist_data = []
        product_labels = list(fig2_data['product'].dropna().unique())

        for product in product_labels:
            hist_data.append(fig2_data[fig2_data['product'] == product]
                             ['iea_zeroc_norm_capacity_est_nm3_h2h_log']
                             .to_numpy()
                             )

        fig2 = ff.create_distplot(hist_data, product_labels, bin_size=.2).update_layout(xaxis_title="Log[Norm. Capacity]")
        # fig2 = px.histogram(fig2_data, x='iea_zeroc_norm_capacity_est_nm3_h2h_log',
        #                     color='product')

        return container, fig, fig2 #  , table_data, page_current

    @app.callback(
        [Output(component_id='tbl', component_property='data'),
         Output(component_id='tbl', component_property='page_current')],
        [Input(component_id='intermediate-value', component_property='data'),
         Input(component_id='tbl', component_property='page_current'),
         Input(component_id='tbl', component_property='page_size'),
         ]
    )
    def update_table(json_viz_data, page_current: int, page_size: int):
        pub_data = pd.read_json(json_viz_data, orient='split')

        pub_data['status'] = pub_data['status'].replace('NaN', None)
        table_data = pub_data.iloc[page_current*page_size:(page_current + 1)*page_size].to_dict('records')

        return table_data, page_current

    return app



def generate_figure_labels(indices: pd.Index) -> pd.Index:

    formatted_indices = indices.map(lambda x: ' '.join(x.split('_')[1:])
                                    .strip()
                                    .title()
                                    )
    return_indices = []

    for i, index in enumerate(formatted_indices.to_list()):
        if ('ch4' in index) or ('Ch4' in index):
            new_index = index.replace('ch4', 'CH4')
            new_index = new_index.replace('Ch4', 'CH4')
            return_indices.append(new_index)

        elif ('chp' in index) or ('Chp' in index):
            new_index = index.replace('chp', 'CHP')
            new_index = new_index.replace('Chp', 'CHP')
            return_indices.append(new_index)
        else:
            return_indices.append(index)

    return pd.Index(return_indices)
