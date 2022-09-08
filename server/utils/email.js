import nodemailer from 'nodemailer';

const email = async (obj) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  const message = {
    from: 'tuantm@gmail.com',
    to: obj.to,
    subject: obj.subject,
    text: obj.message,
  };

  await transport.sendMail(message);
};

export default email;
