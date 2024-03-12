const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// ejs
// app.set('view engine', 'ejs');
// 루트 설정
// app.use('/assets', express.static('assets'));
app.use(express.static(__dirname));

app.use(bodyParser.json());
require('dotenv').config()
const cors = require('cors'); 
app.use(cors()) 
app.use(bodyParser.urlencoded({ extended: true }));

//    /submit






app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html',)
})
// app.get('/sitekey', (req, res) => {
//     // 데이터를 원하는대로 처리
//     let data = {
//         siteKey: process.env.SITE_KEY
//     };
    // res.send(data);
// });

// app.get('/contact', (req, res) => {
//     res.render('contact.ejs', {
//         sitekey: process.env.SITE_KEY,
//     })
// })
// app.get('/', (req, res) => {
//     res.render('index.ejs')
// })
app.get('/test', (req, res) => {
    res.render('contact.html')
})



app.post('/submit', async (req, res) => {
    console.log('데이터:', req.body);
    
    await sendEmail(req.body.name, req.body.email, req.body.tel, req.body.title, req.body.content)
    res.send('이메일이 전송되었습니다.');
    
    console.log('submit 완료')
});
const sendEmail = async (name, email, tel, title, content) => {
    const transporter = nodemailer.createTransport({
        service: 'naver',
        host: 'smtp.naver.com',
        port: 587,
        auth: { user: process.env.KEY_ID, pass: process.env.KEY_PASSWORD}
    })
    
    const mailOptions = {
        from: 'tjdtnyj@naver.com',
        to: 'tjdtnyj@naver.com',
        subject: `${title}`,
        // html: `
        //     <div class="container"></div>
        //     <p>${name}</p><p>${email}</p><p>${tel}</p><p>${title}/p><p>${content}</p>
        // `,
        html: `
            <div class="container">
            <p style="background:red; color:blue;">이메일 내용</p>
            <p>${name}</p><p>${email}</p><p>${tel}</p><p>${title}/p><p>${content}</p>
            </div>
        `
    }
    
    try {
        await transporter.sendMail(mailOptions);
        console.log('이메일 전송 성공')
    } catch (error) {
        console.log('이메일 전송 실패:', error)
    }
}
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

