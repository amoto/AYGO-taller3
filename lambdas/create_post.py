import json
import uuid
import boto3

dynamodb = boto3.resource('dynamodb')
table_name = 'aygo-taller-3'
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    print(event)
    print(context)
    body = json.loads(event['body'])
    user = event['requestContext']['authorizer']['claims']['cognito:username']
    # TODO implement
    item = {
                'id': uuid.uuid4().hex,
                'content': body['content'],
                'created_by': user
            }
    result = table.put_item(
            Item=item
        )
    print(result)
    return {
        'statusCode': 201,
        'body': json.dumps({
            'Item': item,
            'created_by': user
        }),
        'headers': {
            'Access-Control-Allow-Origin': '*',
        }
    }
