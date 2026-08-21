require("dotenv").config()
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const sendVerificationEmail = async (name, email, verificationCode) => {
    const mailOption = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "E-posta Doğrulama Kodu - Mariam shopping",
      html: `
        <!DOCTYPE html>
        <html lang="tr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .header {
              background-color: #4a90e2;
              color: white;
              text-align: center;
              padding: 20px;
            }
            .content {
              padding: 20px;
              text-align: center;
            }
            .code-box {
              display: inline-block;
              background-color: #e8f0fe;
              color: #4a90e2;
              font-size: 24px;
              font-weight: bold;
              padding: 10px 20px;
              border-radius: 5px;
              margin: 20px 0;
            }
            .footer {
              background-color: #f4f4f4;
              padding: 10px;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
            a {
              color: #4a90e2;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Hoş Geldiniz, ${name}!</h2>
              <p>Mariam shopping Platformuna Katıldığınız İçin Teşekkürler</p>
            </div>
            <div class="content">
              <p>Hesabınızı doğrulamak için aşağıdaki kodu kullanın:</p>
              <div class="code-box">${verificationCode}</div>
              <p>Bu kodu kimseyle paylaşmayın, güvenliğiniz bizim için önemli!</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 Mariam shopping. Tüm hakları saklıdır. #Mariam Amhan</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOption)
  };


module.exports = sendVerificationEmail
