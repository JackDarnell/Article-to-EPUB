import AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-east-2',
    accessKeyId: 'AKIAQFNXA23WGX2XWLFA',
    secretAccessKey: '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',
  });

  export const parseArticle = (functionName, payload) => {
    const lambda = new AWS.Lambda();
    const params = {
      FunctionName: functionName,
      Payload: JSON.stringify(payload),
    };
    return lambda.invoke(params).promise();
  };