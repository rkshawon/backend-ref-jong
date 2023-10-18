import { transporter } from './config';
interface IMailContext {
  subject: string;
  data: object;
}

const sendEmail = async (
  receiverEmail: string | string[],
  context: IMailContext,
  template: string
): Promise<void> => {
  try {
    const from = `"Cannabis Connecter" <registration@cannabis-connecter.com>`;

    const reports = await transporter.sendMail({
      from,
      to: receiverEmail,
      subject: context.subject,
      template,
      context: context.data,
    });

    console.log(reports);
  } catch (err) {
    console.error(err);
    console.error('EMAIL SEND FAILED');
  }
};

export default sendEmail;
