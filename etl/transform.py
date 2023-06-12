import pandas as pd
import uuid
from etl.extract import JsonDataReader
from typing import TypeVar, Self

# TODO: Remove when https://peps.python.org/pep-0673/ is implemented in python 3.11 / 3.12
TJsonDataTransformer = TypeVar("TJsonDataTransformer", bound="JsonDataTransformer")


class JsonDataTransformer:
    def __init__(self, jdr: JsonDataReader):
        with jdr:
            data = jdr.to_pandas_df()
        self.__json_data_as_df: pd.DataFrame = data
        self.__problems_df: [pd.DataFrame | None] = None

    def initialize(self) -> Self:
        """
        Initializes the data to the following format
        returns a dataframe in the following format
        problem_id, company_id, company_name, title, titleSlug, difficult, tags
        :return:
        """
        df_all = self.__json_data_as_df.copy()
        df_combined_problems: [pd.DataFrame | None] = None
        for company_name in df_all["company"].unique():
            # extract the list of problems that match the company
            problems = df_all.loc[df_all["company"] == company_name]["problems"]
            df = pd.DataFrame(problems.iloc[0])[
                ["title", "titleSlug", "difficulty", "topicTags"]
            ]
            df = df.rename({"topicTags": "tags"}, axis=1)
            # add company name column
            df.loc[:, "company_name"] = company_name
            df.loc[:, "company_id"] = uuid.uuid4()
            if df_combined_problems is not None:
                df_combined_problems = pd.concat([df_combined_problems, df])
            else:
                df_combined_problems = df

        for titleSlug in df_combined_problems["titleSlug"].unique():
            df_combined_problems.loc[
                df_combined_problems["titleSlug"] == titleSlug, "problem_id"
            ] = uuid.uuid4()

        self.__problems_df = df_combined_problems
        return self

    def create_problems_table_data(self) -> [pd.DataFrame | None]:
        """
        Reads the data from leetcode and returns a dataframe with the following columns
        Columns = ['id', 'title', 'difficulty', 'mastered']
        :return:
        """
        df = self.__problems_df[["problem_id", "title", "titleSlug", "difficulty"]]
        df.loc[:, "mastered"] = False
        df.loc[:, "bookmarked"] = False
        df = df.rename({"problem_id": "id", "titleSlug": "title_slug"}, axis=1)
        df = df.drop_duplicates(subset=["id"])
        df = df.reset_index(drop=True)
        return df

    def create_company_table_data(self) -> [pd.DataFrame | None]:
        """
        Returns id (uuid), name (string)
        :return:
        """
        df = self.__problems_df.copy()
        companies_df: pd.DataFrame = df[["company_id", "company_name"]]
        companies_df = companies_df.drop_duplicates(subset=["company_id"])
        companies_df = companies_df.rename(
            {"company_id": "id", "company_name": "name"}, axis=1
        )
        companies_df = companies_df.reset_index(drop=True)
        return companies_df

    def create_problem_to_company_table_data(self) -> [pd.DataFrame | None]:
        """
        Returns id, problem_id, company_id
        :return:
        """
        problem_to_company_df = self.__problems_df[["problem_id", "company_id"]]
        problem_to_company_df.loc[:, "id"] = problem_to_company_df.apply(
            lambda _: uuid.uuid4(), axis=1
        )
        problem_to_company_df = problem_to_company_df.reset_index(drop=True)
        return problem_to_company_df[["id", "problem_id", "company_id"]]

    def create_problem_category_table_data(self) -> [pd.DataFrame | None]:
        """
        Returns id, problem_id, category.
        Classification in this dataframe is the problem tag in leetcode
        :return:
        """
        df_problems = self.__problems_df.copy().drop_duplicates(subset=["problem_id"])
        df_combined_problem_attr: [pd.DataFrame | None] = None
        for problem_id in df_problems["problem_id"]:
            problem_attr = df_problems.loc[df_problems["problem_id"] == problem_id][
                "tags"
            ].to_list()
            problem_attr_df = pd.DataFrame.from_dict(problem_attr[0], orient="columns")
            problem_attr_df.loc[:, "problem_id"] = problem_id
            problem_attr_df = problem_attr_df[["problem_id", "name"]]
            problem_attr_df = problem_attr_df.rename({"name": "category"}, axis=1)
            problem_attr_df.loc[:, "id"] = problem_attr_df.apply(
                lambda _: uuid.uuid4(), axis=1
            )
            if df_combined_problem_attr is not None:
                df_combined_problem_attr = pd.concat(
                    [df_combined_problem_attr, problem_attr_df]
                )
            else:
                df_combined_problem_attr = problem_attr_df
        df_combined_problem_attr = df_combined_problem_attr.reset_index(drop=True)
        return df_combined_problem_attr[["id", "problem_id", "category"]]
