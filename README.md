# An example monorepo project 
It contains the server side, a frontend application and some shared code.

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
