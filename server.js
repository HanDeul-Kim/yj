const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const multer = require('multer');

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

const upload = multer({ dest: 'uploads/' });


app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/:id', (req, res) => {
    const contactId = req.params.id;
    res.render(`${contactId}.ejs`)
})

// app.post('/submit', async (req, res) => {
//     console.log('데이터:', req.body);
//     await sendEmail(req.body.name, req.body.email, req.body.tel, req.body.title, req.body.content, req.body.uploadFile)
//     res.send('이메일이 전송되었습니다.');
// });
app.post('/submit', upload.array('file'), async (req, res) => {
    console.log('데이터:', req.body);


    // if (!req.files || req.files.length === 0) {
    //     return res.status(400).end('파일이 전송되지 않음')
    // }

    const name = req.body.name;
    const email = req.body.email;
    const tel = req.body.tel;
    const title = req.body.title;
    const content = req.body.content;
    const files = req.files;
    if (!files) {
        res.status(500).json({ errorType: '파일첨부가 안됨'})
    }
    try {
        await sendEmail(name, email, tel, title, content, files);
        // res.send('이메일이 전송되었습니다.')
        // res.end()
        res.status(200).json({ success: '전송에 성공했습니다.' })
    } catch (error) {
        // res.status(500).end();
        if (error.responseCode === 552) {
            res.status(500).json({ errorType: '보낼 수 있는 용량이 초과되었습니다.' })
        } else {
            res.status(500).json({ errorType: '전송에 실패했습니다.' })
        }
    }
})

async function sendEmail(name, email, tel, title, content, files) {
    const transporter = nodemailer.createTransport({
        service: 'naver',
        host: 'smtp.naver.com',
        port: 587,
        auth: { user: process.env.KEY_ID, pass: process.env.KEY_PASSWORD },
    })

    const mailOptions = {
        from: 'tjdtnyj@naver.com',
        to: 'tjdtnyj@naver.com',
        subject: `${title}`,
        html: `
            <div class="container">
            <p style="background:red; color:blue;">이메일 내용</p>
            <p>${name}</p><p>${email}</p><p>${tel}</p><p>${title}</p><p>${content}</p>
            </div>
        `,
        // html: `
        //     <div>
        //         test
        //     </div>
        // `,
        attachments: files.map(file => ({
            filename: file.originalname,
            path: file.path
        }))
    }
    try {
        await transporter.sendMail(mailOptions);
        console.log('이메일 전송 성공')
    } catch (error) {
        throw error;
    }
}
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
