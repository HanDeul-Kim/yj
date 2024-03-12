const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'naver',
    host: 'smtp.naver.com',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/contact', (req, res) => {
    res.render('contact.ejs', {
        sitekey: process.env.SITE_KEY,
    });
});

app.post('/submit', async (req, res) => {
    try {
        console.log('데이터:', req.body);
        await sendEmail(req.body.name, req.body.email, req.body.tel, req.body.title, req.body.content);
        res.send('이메일이 전송되었습니다.');
        console.log('submit 완료');
    } catch (error) {
        console.error('이메일 전송 실패:', error);
        res.status(500).send('이메일 전송에 실패했습니다.');
    }
});

const sendEmail = async (name, email, tel, title, content) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `${title}`,
        html: `
            <div class="container">
                <p style="background:red; color:blue;">이메일 내용</p>
                <p>${name}</p><p>${email}</p><p>${tel}</p><p>${title}</p><p>${content}</p>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
    console.log('이메일 전송 성공');
};

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});