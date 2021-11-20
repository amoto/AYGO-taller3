// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
    "aws_user_pools_web_client_id": "6tgppj5t2g4sv852tjbe05bffv",     // CognitoClientID
    "api_base_url": "None",                                     // TodoFunctionApi
    "cognito_hosted_domain": "aygo-taller3",                   // CognitoDomainName
    "redirect_url": "None"                                      // AmplifyURL
};

export default config;