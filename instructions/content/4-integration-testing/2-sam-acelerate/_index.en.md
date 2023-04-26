+++
title = "AWS SAM and AWS SAM Accelerate"
weight = 11
+++

Now that you have completed the [Get the code from GitHub](../99-the-code/5-deploy.html) section. You have a fully configured AWS SAM environment.

* You have used `sam build` to build the artifacts necessary to deploy the serverlesspresso infrastructure.

* You have used `sam deploy` with a set a parameters that define the working environment. Alternatively you could have used `sam deploy --guided` to have a interactive prompt to configure the working environment. Your configuration can be save to a file, be default it is named `samconfig.toml`. With your environment configured you can make any changes to your infrastructure templates or Lambda code and perform `sam build` and `sam deploy`. 

## Deploying a change ##
1. Navigate to the Lambda code `~/environment/serverlesspresso/backends/backends/2-config-service/code/configChanged.js`
2. Let add a log statement at the beginning of the handler function. Add this to line 14:
```code
console.log('Handler: Start')
```
3. Save changes. Then run `sam build` and `sam deploy --guided`
4. Enter `serverlesspresso-backend` for the stack name.
5. For `LogRetentionInDays` set to `1`, and the rest of the parameters you can use the default.

Now the AWS SAM framework will generate a changeset by completely analysis of your template and Lambda code changes and the currently deployed stack in Cloudformation.

Great! But can it be done faster? Yes!

## AWS SAM Accelerate ##
AWS SAM Accelerate is a collection of tools and features designed to speed up common development operations such as deploying code changes. We will use the `sam sync` command to see how we can simply making code changes to Lambda functions.

1. `sam sync --stack-name serverlesspresso-backend --code --watch`
* `--code`: Limits the syncing to Lambda code changes. SAM template changes will not be synced.
* `--watch`: Tells AWS SAM to monitor file changes and automatically synchronize when changes are made.
2. Let's made another Lambda code change to `configChanged.js`. This time add a logging statement at the end of the function handler on line 34:
```code
console.log('Handler: Finish')
```
3. Save changes.

If you look at your console you see that AWS SAM detected the change to the `configChanged.js` file and automatically built and deployed the code update to the Lambda function. The second thing to notice is how faster and seamless it was to deploy your local code changes to the cloud environment.

To learn more about other features of AWS SAM Accelerate read the blog: [Acclerating serverless development with AWS SAM Accelerate](https://aws.amazon.com/blogs/compute/accelerating-serverless-development-with-aws-sam-accelerate/)