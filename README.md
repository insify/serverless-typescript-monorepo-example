# Deploying Typescript Lambda functions with Serverless in a monorepo

## The application
* A simple UI that you to create a poll with a topic and 2 to 5 options.
* When the poll has been created, it shows 2 links. If you open the first link, you can vote on the poll. This link should be shared with people you want to participate. By the second link, you can see the results of the poll.
* The server side has 4 Lambda functions exposed via API Gateway endpoints (create poll, get poll details, vote and see the summary). Polls and their results are stored in a DynamoDB table.

The repository contains a description of the infrastructure, the backend service, the frontend application and some shared code.

## How to run
Prerequisites: 
* an AWS account
* nodejs 12
* React
* yarn
* serverless

```
yarn
cd poll/infra && sls deploy # Will create all necessay infrastructure.
cd poll/service && sls deploy # Will deploy Lambda functions
cd poll/app && yarn start
```

**Warning:** Server-side from the master branch will not work! Please switch to any branch to have a working example.

## Branches

### Experiment 1
Disable hoisiting in Yarn Workspaces. All external dependencies will be replicated to `node_modules` of the service. Additionally, copy internal dependencies (dependencies to other modules from this repository) with Yalc.

### Experiment 2
Use `serverless-plugin-monorepo` instead of using nohoist. It creates symlinks to all the modules that Lambda functions use. To make it work, replace `serverless-plugin-typescript` with calling Typescript compiler manually.

### Experiment 3
Use `serverless-plugin-webpack` to transpile and package Lambda functions. Provide Babel and Webpack configuration, and make sure the gigantic `aws-sdk` dependency doesn't creep in.

### Experiment 4
Use `serverless-plugin-optimize` that packages Lambda functions and minimizes their size.

