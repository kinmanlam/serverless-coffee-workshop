+++
title = "Simple Integration Test"
weight = 13
+++

## Node.js module setup ##
We will be using the Mocha framework to perform the integration testing. To setup the testing environment you will need to:
1. Navigate to the root directory which contains the main `package.json` of the project:
```
cd ~/environment/serverlesspresso
```
2. Install the necessary Node.js module dependencies which consists of `amazon-cognito-identity-js, axios,` and `mocha` using this command:
```code
npm install
```
3. Open and update the `gConfig.json` file with the appropriate values.


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