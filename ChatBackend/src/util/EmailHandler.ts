import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import fs from "fs";

class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: `${process.env.GMAIL}`, pass: `${process.env.GMAIL_PASS}` },
    });
  }

  // this sends an email to the recepient
  sendEmail = async (email: string, name: string, password: string) => {
    try {
      if (!email || !name || !password) {
        console.warn("Please provide email, password and name to send email");
        return;
      }

      const welcomeRegisterationTemplatePath = path.join(
        __dirname,
        "../util/EmailTemplates/WelcomeEmail.html",
      );
      let welcomeRegisterationTemplateData = fs.readFileSync(
        welcomeRegisterationTemplatePath,
        "utf8",
      );

      welcomeRegisterationTemplateData = welcomeRegisterationTemplateData
        .replace("{{NAME}}", name)
        .replace("{{EMAIL}}", email)
        .replace("{{PASSWORD}}", password);

      await this.transporter.sendMail({
        from: `"Talksy" ${process.env.GMAIL}`,
        to: `${email}`,
        subject: "Welcome email",
        html: welcomeRegisterationTemplateData
        // html: `<h3>Welcome ${name} and your email is :<strong>${email}</strong> and password is: <strong>${password}</strong></h3>`,
      });
      console.log("Email sent successfully");
    } catch (error: any) {
      console.error("Error while sending email: ", error);
    }
  };
}

const EmailHandler = new EmailService();
export { EmailHandler };
