import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class CdkHelloWorldStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // lambda resource
    const helloWorldFunction = new lambda.Function(this, 'HelloWorldFunction', {
      runtime: lambda.Runtime.NODEJS_24_X,
      handler: 'hello.handler',
      code: lambda.Code.fromAsset('lambda'),
    });

    //api gateway resource
    const api = new apigateway.LambdaRestApi(this, 'HelloWorldApi', {
      handler: helloWorldFunction,
      proxy: false,
    });

    //define /hello resource
    const helloResource = api.root.addResource('hello');
    helloResource.addMethod('GET'); // GET /hello

    new cdk.CfnOutput(this, 'HelloWorldFunctionName', {
      value: helloWorldFunction.functionName,
      description: 'The name of the Hello World Lambda function',
    });


    // The code that defines your stack goes here
    // example resource
    // const queue = new sqs.Queue(this, 'CdkHelloWorldQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
