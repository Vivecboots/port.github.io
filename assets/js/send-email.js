const AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
  // Set the region where your SES identity is located
  AWS.config.update({ region: 'us-east-1' });

  // Create a new SES client
  const ses = new AWS.SES();

  const { name, email, message } = JSON.parse(event.body);

  // Set the to and from addresses for the forwarded email
  const params = {
    Destination: {
      ToAddresses: ['your@email.com'],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',




          Data: `<p>From: ${name} (${email})<br>Message: ${message}</p>`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `New message from ${name}`,
      },
    },
    Source: 'forwarder@your-domain.com',
  };

  // Send the email
  ses.sendEmail(params, (error) => {
    if (error) {
      console.log(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: error.message || 'Error sending email',
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: 'Success',
      });
    }
  });
};