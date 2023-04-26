+++
title = "Overview"
weight = 11
+++

## How do you test Serverless architecture?
Many developers are accustomed to deploying a local copy of the application or service they are working on to develop and test. Using the [AWS Serverless Architecture Model (SAM)](https://aws.amazon.com/serverless/sam/) framework it is possible to replicate the local testing workflow while actually deploying and executing components in the cloud. This section of the workshop will show you how.

## Testing Techniques
There are three primary testing techniques when it comes to testing cloud-native applications and services. They are mocking, emulation and testing in the cloud.

### Mocking
Mocking (and stubbing) is the technique of replicating the interface of a service and implementing the minimal functionality so that your code is able to execute. Mocking and stubbing is fast but by design doesn't model the full behaviour of the system. Generally mocking is used in the development and unit testing stages. It can be used in other stages with the understand that passing mock tests does not ensure correct operation in production.

### Emulation
With the emulation technique the objective is to build an emulator that replicate the interface and model the behaviour of the service. The AWS SAM framework proves emulators for:
- API Gateway - [sam local start-api](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-local-start-api.html)
- AWS Lambda - [sam local invoke](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-local-invoke.html)
- [AWS DynamoDB Local](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html)
- [AWS Step Functions Local](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html)

With emulators this improves the test coverage over the mocking technique. The challenge with using emulators is:
- Does an emulators exist for all the services you are using
- Overhead with setting up and keeping emulators up-to-date

### Testing In The Cloud
With the [annoucement of AWS SAM Acelerate](https://aws.amazon.com/about-aws/whats-new/2022/06/aws-sam-accelerate-test-code-against-cloud/) it is now easier to develop and test locally while actually deploying and executing you code changes in the cloud.

Testing in the cloud allows you to mirror your production environment and ensures IAM policies, service quotas and configurations are covered.

The challenge of the testing in the cloud is a stable internet connection is required.

## Comprehensive Test Suite
A comprehensive test suite will use a combination of all three testing techniques. Testing in the cloud does have cost associated with executing the functionality in the cloud, but is the only technique that can be used to fully replicate a production environment.

*More information on this services used in this section:*
[AWS Serverless Architecture Model (SAM)](https://aws.amazon.com/serverless/sam/)
[AWS SAM Accelerate demonstration](https://www.youtube.com/watch?v=DDhOa4ekn80)