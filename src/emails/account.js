const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = 'SG.KzGPIG8kSiucmGFF-NRP3Q.2oXVV4TiR3NHlIbSVQZ4SmlxmRkmvF4lySgFHnScTzA';

sgMail.setApiKey(sendgridAPIKey);

sgMail.send({
    to: 'zhek4770@gmail.com',
    from: 'zhek4770@gmail.com',
    subject: 'This is my first creation!',
    text: 'I hope this one actually get to you'
})