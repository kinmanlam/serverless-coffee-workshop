/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
  try {
    // Create a new item in the DynamoDB table
    await dynamodb.putItem({
      TableName: process.env.TableName,
      Item: {
        'id': { S: JSON.stringify(event.id) },
        'type': { S:'EventBridge' },
        'timestamp': { S: new Date().toISOString() },
        'source': { S: JSON.stringify(event.source) },
        'eventData': { S: JSON.stringify(event) },
      }
    }).promise();

    console.log('TH - EventBridge event captured');
  } catch (error) {
    console.error('TH - EventBridge Error:', error);
  }
};