import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport(
      {
        host: process.env.EMAIL_HOST,
        port: +process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        },
      },
      {
        from: {
          name: 'HANDIKA',
          address: process.env.DEFAULT_MAIL_ADDRES,
        },
      },
    );
  }
  async sendMail(email: string, table_number: number, date: string) {


    await this.transporter.sendMail({
      to: email,
      subject: `Success Booked`,
      text: `you already booked table ${table_number} at ${new Date(date).toLocaleDateString('id-ID', { hour: "2-digit", minute: "2-digit" })}`,
    });
  }
}
