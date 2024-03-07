const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());
const cors = require('cors'); 
app.use(cors()) 
app.use(bodyParser.urlencoded({ extended: true }));


// app.get('', (req,res) => {
//     res.sendFile(__dirname + '/contact.html')
// })

// app.use('/', express.static("./public"))
// app.get('/express', (req,res) => {
//     res.render("contact.html")
// })


//    /submit
app.post('/contact.html', (req, res) => {
    res.send("<h1>psot요청</h1>")
})
// app.post('/submit', async (req, res) => {
//     console.log('데이터:', req.body);
    
//     await sendEmail(req.body.name, req.body.email, req.body.tel, req.body.title, req.body.content)
//     res.send('이메일이 전송되었습니다.');
// });
// const sendEmail = async (name, email, tel, title, content) => {
//     const transporter = nodemailer.createTransport({
//         service: 'naver',
//         host: 'smtp.naver.com',
//         port: 587,
//         auth: { user: 'tjdtnyj@naver.com', pass: '1q2w3e4r'}
//     })

//     const mailOptions = {
//         from: 'tjdtnyj@naver.com',
//         to: 'tjdtnyj@naver.com',
//         subject: `${title}`,
//         html: `
//             <div class="container"></div>
//             <p>${name}</p><p>${email}</p><p>${tel}</p><p>${title}/p><p>${content}</p>
//         `
//     }
    
//     try {
//         await transporter.sendMail(mailOptions);
//         console.log('이메일 전송 성공')
//     } catch (error) {
//         console.log('이메일 전송 실패:', error)
//     }
// }
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

