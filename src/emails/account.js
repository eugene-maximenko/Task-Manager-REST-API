const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'eugene.maximenko@alisa.in.ua',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'eugene.maximenko@alisa.in.ua',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}