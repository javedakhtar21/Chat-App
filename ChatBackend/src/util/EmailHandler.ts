import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: `${process.env.GMAIL}`, pass: `${process.env.GMAIL_PASS}` },
    });
  }

  sendEmail = async (email: String, name: String, password: String) => {
    try {
      if (!email || !name || !password) {
        console.warn("Please provide email, password and name to send email");
        return;
      }


      await this.transporter.sendMail({
        from: `"Talksy" ${process.env.GMAIL}`,
        to: `${email}`,
        subject: "Welcome email",
        html: `<h3>Welcome ${name} and your email is :<strong>${email}</strong> and password is: <strong>${password}</strong></h3>`,
      });
      console.log("Email sent successfully");
    } catch (error: any) {
      console.error("Error while sending email: ", error);
    }
  };
}

const EmailHandler = new EmailService();
export { EmailHandler };
