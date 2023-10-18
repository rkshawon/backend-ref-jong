import nodemailer, { SendMailOptions } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import handlebarOptions from './viewEngine';

// mail sender
export const transporter: nodemailer.Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
} as SendMailOptions);

console.log(process.env.SMTP_HOST);

transporter.use('compile', hbs(handlebarOptions));
