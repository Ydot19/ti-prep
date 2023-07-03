from etl.main import ExtractTransformLoad

if __name__ == "__main__":
    executor = ExtractTransformLoad()
    executor.execute()