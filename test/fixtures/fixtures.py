import os


def get_sample_data_json_filepath() -> str:
    """
    Returns the system file path for sample_data.json file path
    :return:
    """
    curr_dir = os.path.dirname(os.path.realpath(__file__))
    return f"{curr_dir}/sample_data.json"
