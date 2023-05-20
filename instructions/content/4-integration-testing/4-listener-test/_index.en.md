+++
title = "Testing Asynchronous Services"
weight = 14
+++

In this section you setup and run integration testing on the `config-service` Lambda function which triggers a Amazon EventBridge event when a change has been made to `serverlesspresso-config-table`. The test harness that we will be implementing captures this event so we can audit it.