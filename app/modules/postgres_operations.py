"""
Interact with the postgres database.

Functions:

    connection_postgres() -> None
    records_to_postgres(pd.DataFrame, int) -> None

"""
from os import getenv
from datetime import datetime, timezone
import json
from dotenv import load_dotenv
import psycopg2
import pandas as pd


def connection_postgres():
    """
    Establish a connection to the local postgres database using authentification data stored in .env
    :return: connection to postgres database
    """
    load_dotenv()
    conn = psycopg2.connect(
        database=getenv('PG_DATABASE'),
        user=getenv('PG_USER'),
        password=getenv('PG_PASSWORD'),
        host=getenv('PG_HOST'),
        port=getenv('PG_PORT'),
    )
    return conn


def records_to_postgres(df: pd.DataFrame, version: int = None, table_name: str = None) -> None:
    """
    Establish a connection to the postgres database and add lines in the input df.
    :param df: Dataframe containing the rows of data to be added to the postgres dataset table.
    :param version: Integer corresponding to the year of the dataset.
    :param table_name: name of postgres table to insert data. Default is 'project' table.
    :return: None
    """
    conn = connection_postgres()
    conn.autocommit = True
    cursor = conn.cursor()
    col_names = df.columns.tolist()

    if table_name is None:
        table_name = 'project'

    if table_name == 'project':
        with open('app/postgres/column_dictionary.dict') as json_file:
            postgres_col_dict = json.load(json_file)

        # Appending additional columns for dataset version and data when the row was added to the table
        postgres_col_names = [postgres_col_dict[col] for col in col_names]
        postgres_col_names += ['dataset_version', 'date_updated']

        time_now = datetime.now(timezone.utc)
    else:
        postgres_col_names = [col.lower() for col in col_names]

    for row in df.values:
        # print(len(postgres_col_names))
        # print(f'INSERT INTO project ({", ".join(postgres_col_names)}) VALUES ({(" %s," * len(postgres_col_names))[:-1]})')
        # print(len(tuple(row)+('2002',)))
        if table_name == 'project':
            cursor.execute(
                f'INSERT INTO {table_name} ({", ".join(postgres_col_names)}) VALUES ({(" %s," * len(postgres_col_names))[:-1]})',
                tuple(row)+(version, time_now))
        elif table_name == 'reference':
            cursor.execute(
                f'INSERT INTO {table_name} ({", ".join(postgres_col_names)}) VALUES ({(" %s," * len(postgres_col_names))[:-1]})',
                tuple(row))

    conn.commit()
    conn.close()


def query_all_data(table_name: str) -> pd.DataFrame:
    conn = connection_postgres()
    conn.autocommit = True
    cursor = conn.cursor()

    cursor.execute(f'''
        SELECT *
        FROM public.{table_name};
    ''')

    latest_df = cursor.fetchall()
    conn.commit()

    #Get Column Names
    cursor.execute(f"""
        SELECT * FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = '{table_name}'
        """)
    table_cols = cursor.fetchall()
    table_cols = (pd.DataFrame(table_cols)
                  .iloc[:,3]
                  .to_list()
                  )
    conn.commit()

    conn.close()

    return pd.DataFrame(latest_df, columns=table_cols).replace('NaN', None)

