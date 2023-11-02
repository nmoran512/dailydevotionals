const express = require('express');
const app = express();
const port = 3000;

const nodemailer = require('nodemailer');
const path = require('path'); // Import the 'path' module

app.use(express.static(path.join(__dirname))); // Serve static files (CSS, images, etc.)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/subscribe', (req, res) => {
    const { name, email } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Outlook',
        auth: {
            user: 'noah@dailydevotionals.life',
            pass: 'Unitedstates11!!',
        },
    });

    const mailOptions = {
        from: 'noah@dailydevotionals.life',
        to: email,
        subject: 'Thank you for subscribing to Daily Devotionals!',
        text: `${name},\nThank you for your subscription to Daily Devotionals!\nYou will now be able to stay up to date with all the happenings here at Daily Devotions.\nPlease let me know if there are any questions or concerns :)\nVery Respectfully,\nNoah\nDaily Devotionals`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.send('<link rel="stylesheet" href="stylesheet.css"> <h1>Subscription successful!</h1> <a href="index.html">Return to homepage</a>');
        }
    });

    const notificationMailOptions = {
        from: 'noah@dailydevotions.life',
        to: 'noahmoran512@gmail.com',
        subject: 'New Subscriber',
        text: `A new subscriber has joined: ${name} ${email}`,
    };

    transporter.sendMail(notificationMailOptions, (error, info) => {
        if (error) {
            console.log('Error sending notification email:', error);
        } else {
            console.log('Notification email sent:', info.response);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
