const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// ejs
app.set('view engine', 'ejs');
// 루트 설정
app.use('/assets', express.static('assets'));
app.use(bodyParser.json());
require('dotenv').config()
const cors = require('cors'); 
app.use(cors()) 
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/:id', (req, res) => {
    const contactId = req.params.id;
    res.render(`${contactId}.ejs`)
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
        auth: { user: process.env.KEY_ID, pass: process.env.KEY_PASSWORD},  
    })
    



    

    const mailOptions = {
        from: 'tjdtnyj@naver.com',
        to: 'tjdtnyj@naver.com',
        subject: `${title}`,
        // html: `
        //     <div class="container">
        //     <p style="background:red; color:blue;">이메일 내용</p>
        //     <p>${name}</p><p>${email}</p><p>${tel}</p><p>${title}/p><p>${content}</p>
        //     </div>
        // `
        html:`
            <div>
                <div style="font-size:18px;">${name}</div>
                <div style="font-size:18px;">${email}</div>
                <div style="font-size:18px;">${title}</div>
                <div style="font-size:18px;">content : </div>
                <div style="font-size:20px;">${content}</div>
            </div>
        `, 
        attachments: [{
            filename:'logo.png',
            path:'logo.png'
        }]
        // attachments: [ {path: file} ]
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

