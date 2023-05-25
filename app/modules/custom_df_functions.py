import pandas as pd
import re

from app.modules.postgres_operations import query_all_data

full_data = query_all_data(table_name='project')
ref_data = query_all_data(table_name='reference')


def ref_text_to_append(ref_id: int, ref_df: pd.DataFrame) -> str:
    text = ref_df[ref_df['number'] == ref_id].reference.values

    if len(text) > 0 and text[0][:4] == 'http':
        return f'[[{ref_id}]({text[0]})]'  # With URL in markup
    else:
        return f'[{ref_id}]'  # No URL available


def reference_markdown(ref_str: str, ref_df: pd.DataFrame) -> str:

    if ref_str is not None:
        ref_str = re.findall(r'\d+', ref_str)
        return ''.join([ref_text_to_append(int(elem), ref_df) for elem in ref_str])

    else:
        return None
