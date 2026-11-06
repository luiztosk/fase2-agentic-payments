# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   type-check the project
* `npm run watch`   watch for changes and type-check
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template



# Testing with MiniStack on docker:

## 1. Launch ministack

```bash
docker run -p 4566:4566 -e LOG_LEVEL=DEBUG ministackorg/ministack
```

## 2. on this directory bootstrap and deploy:

```bash
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=us-east-1
export AWS_ENDPOINT_URL=http://localhost:4566
export AWS_ENDPOINT_URL_S3=http://localhost:4566
export AWS_PROFILE=local
cdk bootstrap && cdk deploy
```

## 3. set an aws cli profile (write this in `~/.aws/config`):

```ini
# ~/.aws/config
[profile local]
region = us-east-1
```

## 4. invoke the lambda directly:

find the unique identifier (for example `FunctionName: CdkHelloWorldStack-HelloWorldFunctionB2AB6E79-766087AC9E31B`)

```bash
aws lambda list-functions
```

then call the lambda

```bash
aws lambda invoke --function-name CdkHelloWorldStack-HelloWorldFunctionB2AB6E79-766087AC9E31B output.txt
```

## 5. access via the API Gateway:
> MiniStack doesn't implement the API endpoints entirely, so we need a workaround, i.e. using `aws apigateway test-invoke-method` and `curl http://94d6cbe9.execute-api.us-east-1.localhost:4566/prod/hello/` won't work

```bash
aws apigateway get-rest-apis  # api id

curl http://localhost:4566/restapis/<api_id>/prod/_user_request_/hello
# {"message":"Hello World!"}⏎   
```

