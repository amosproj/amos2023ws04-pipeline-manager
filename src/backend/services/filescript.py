import csv
import os

from collections import defaultdict
from decimal import Decimal


def process_csv(filename):
    product_types = defaultdict(Decimal)

    with open(filename, 'r') as f:
        reader = csv.DictReader(f)

    output_file = f'product_types.csv'
    with open(os.path.join('../mainapp', output_file), 'w') as f:
        writer = csv.writer(f)

    return output_file
