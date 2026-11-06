# Source:

https://docs.aws.amazon.com/cdk/v2/guide/serverless-example.html

# Testing with MiniStack on docker:

## 1. Launch ministack

```bash
docker run -p 4566:4566 -e LOG_LEVEL=DEBUG ministackorg/ministack
```

## 2. on this directory, bootstrap and deploy:

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

find the unique identifier

```bash
aws lambda list-functions
```

then call the lambda

```bash
aws lambda invoke --function-name CdkHelloWorldStack-HelloWorldFunctionB2AB6E79-766087AC9E31B output.txt
```

```bash
cat output.txt | jq
{
  "statusCode": 200,
  "headers": {
    "Content-Type": "text/plain"
  },
  "body": "{\"message\":\"Hello World!\"}"
}
```

## 5. access via the API Gateway:
> MiniStack doesn't implement the API endpoints entirely, so we need a workaround, i.e. using `aws apigateway test-invoke-method` and `curl http://94d6cbe9.execute-api.us-east-1.localhost:4566/prod/hello/` won't work

```bash
aws apigateway get-rest-apis  # api id

curl http://localhost:4566/restapis/<api_id>/prod/_user_request_/hello
# {"message":"Hello World!"}⏎   
```

