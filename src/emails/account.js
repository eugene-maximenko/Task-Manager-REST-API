const sgMail = require('@sendgrid/mail');

// Set API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Send welcome email
const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: '',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })

    console.log('Email is sent...');
}

// Send cancelation email
const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: '',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}