"""A Google Cloud Python Pulumi program"""

import pulumi
from pulumi_gcp import sql

# Create a GCP resource (Storage Bucket)
gcp_sql = sql.Database

# Export the DNS name of the bucket
pulumi.export("bucket_name", bucket.url)
