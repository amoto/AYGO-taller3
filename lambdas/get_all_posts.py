import json

import boto3

dynamodb = boto3.resource('dynamodb')
table_name = 'aygo-taller-3'
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    # TODO implement
    result = table.scan()
    return {
        'statusCode': 200,
        'body': json.dumps({
            'Items': result.get('Items', [])
        }),
        'headers': {
            'Access-Control-Allow-Origin': '*',
        }
    }
