const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = 'SG.KzGPIG8kSiucmGFF-NRP3Q.2oXVV4TiR3NHlIbSVQZ4SmlxmRkmvF4lySgFHnScTzA';

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'zhek4770@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}