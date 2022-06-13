import os
import sys

# Add visibility to the project level directories such as common
curr_dir = os.path.dirname(os.path.realpath(__file__))
sys.path.append(f"{curr_dir}/..")
