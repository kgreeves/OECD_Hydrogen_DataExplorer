"""
From a publicly available IEA dataset in the csv file format, load, apply schema/dtypes, and store in an existing
postgres database.
"""
import pandas as pd
import numpy as np
import json

from app.modules.postgres_operations import connection_postgres, records_to_postgres


def combine_headings(col_names_df: pd.DataFrame) -> list:
    """
    Combine the hierarchical headings loaded from the dataset. Currently coded for two rows of heading and subheadings.

    :param col_names_df: Pandas dataframe representing the headings associated with the loaded dataset.
    :return: A single list of strings representing the heading and sub-headings. (I.e. [ 'Heading1: subheading1', ...,
    'HeadingN: subheadingM']
    """

    new_list = []

    # Update First row to fill in NaN
    for column in col_names_df.iloc[0, :]:
        if column is not np.nan:
            new_list.append(column)
        elif column is np.nan and len(new_list) > 0:
            new_list.append(new_list[-1])
        else:

            new_list.append(f'unknown-{len(new_list)}')

    # If not NaN in second row, append to first row.
    for i, sub_col in enumerate(col_names_df.iloc[1, :]):
        if sub_col is not np.nan:
            new_list[i] += ': '+str(sub_col)

    return new_list


def generate_column_dictionary(keys: list, values: list) -> dict:
    """
    Generate a dictionary from the unique column names to a more descriptive value.
    :param keys: Unique column values (e.g. column1)
    :param values: Descriptive column heading for use in legends and plots.
    :return: Dictionary with unique column names as keys and descriptive column headings as values.
    """
    return {keys[i]: values[i] for i in range(len(keys))}


_FILE_DIR = './app/data/'
_FILE_NAME = 'Hydrogen_projects_database_public_version.xlsx'

raw_data = pd.read_excel(_FILE_DIR+_FILE_NAME, sheet_name='References', header=1)

# col_names = raw_data.iloc[:3, :]
# raw_data = raw_data.iloc[3:, :].reset_index(drop=True)
# raw_data.columns = col_names.iloc[2, :].tolist()
#
# # Generate and store dictionary relating df col names and description.
# column_dictionary = generate_column_dictionary(col_names.iloc[2, :].tolist(),
#                                                combine_headings(col_names))
# # Store column dictionary for future lookup
# with open('column_dictionary.dict', 'w') as file:
#     file.write(json.dumps(column_dictionary))
#
# # Hard code schema to define dtypes.
# num_col_list = [1, 4, 5, 27, 28, 29, 30, 31]
# bool_col_list = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
# string_col_list = [2, 3, 6, 7, 8, 9, 10, 11, 26, 32]  # Additional work to convert Column26 to value and units.
#
# NUMERIC_COLS = ['Column'+str(i) for i in num_col_list]
# BOOL_COLS = ['Column'+str(i) for i in bool_col_list]
# STRING_COLS = ['Column'+str(i) for i in string_col_list]
#
# for col in NUMERIC_COLS:
#     raw_data[col] = pd.to_numeric(raw_data[col])  # int64 treated as floats as there are NaN values in all columns.
#
# raw_data[BOOL_COLS] = raw_data[BOOL_COLS].fillna(0).astype(bool)
# raw_data[['Column1', 'Column4', 'Column5']] = (raw_data[['Column1', 'Column4', 'Column5']]
#                                                .fillna(9999)
#                                                .astype(int)
#                                                )  # Convert int64 using '9999' dummy for NaN

full_data = raw_data.copy(deep=True)

# Send records to project table
records_to_postgres(full_data, table_name='reference')


