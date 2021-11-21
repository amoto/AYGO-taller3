// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
    "aws_user_pools_web_client_id": "6tgppj5t2g4sv852tjbe05bffv",     // CognitoClientID
    "api_base_url": "https://9t14d34q06.execute-api.us-east-1.amazonaws.com/prod",                                     // TodoFunctionApi
    "cognito_hosted_domain": "aygo-taller3.auth.us-east-1.amazoncognito.com",                   // CognitoDomainName
    "redirect_url": "https://master.d36xp2z3xbppz9.amplifyapp.com/"                                      // AmplifyURL
};

export default config;