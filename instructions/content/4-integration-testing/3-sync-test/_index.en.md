+++
title = "Testing Synchronous Services"
weight = 13
+++

To demonstrate how to test a synchronous service we will test the deployed API Gateway to confirm that the data transformation and mapping template were implemented correct to faciliate the PUT and GET of the store configuration to the DynamoDB `serverlesspresso-config-table`.  

## Node.js modules setup ##
We will be using the Mocha framework to perform the integration testing. To setup the testing environment you will need to:
1. Navigate to the root directory which contains the main `package.json` of the project:
```
cd ~/environment/serverlesspresso
```
2. Install the necessary Node.js module dependencies which consists of `amazon-cognito-identity-js, aws-sdk, axios,` and `mocha` using this command:
```code
npm install
```

## 

## Securely Storing API Login Credentials ##
The user pool and client ID have already been stored to the Parameter Store in AWS Systems Manager. AWS Secrets Manager can be used to securely store the login credentials that the integration tests will retrieve and use.

To will create a secret named `/Serverlesspresso/core/apilogin` which will store the username and password key-value pairs.

```
aws secretsmanager create-secret --name /Serverlesspresso/core/apilogin --secret-string '{"username": "<User Email>", "password":"<Password>"}'
```

## Config API URL
1. Open to the integration testing code `~/environment/serverlesspresso/backends/2-config-service/code/integrationTest.js`

2. Locate the following code block:
```code
describe('API Data Endpoint', function () {
  const rootUrl = '<INSERT CONFIG API GATEWAY URL>'
```
3. Update the `'<INSERT CONFIG API GATEWAY URL>'` with the URL of the `ConfigServiceRESTAPI`

## Simple PUT / GET Integration Testing ##
1. Navigate to the `config-service`
```
cd ~/environment/serverlesspresso/backends/2-config-service/code
```
2. We will be running the `integrationTest.js` file using the Mocha framework. We will use the `npx` command to ensure the locally installed modules are accessed without having to modify the PATH variable.
```
npx mocha integrationTest.js
```

3. Review the console output, and also open the `integrationTest.js` and inspect the code. You will see the test performed made to authenticated PUT requests followed by a GET requests.

4. In the console you can use the `sam logs` command to retrieve the latest logs written to CloudWatch that is the result of the integration test.
```
sam logs --serverlesspresso-backend
```