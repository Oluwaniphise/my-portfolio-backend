import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { ContactMessage } from './contact.entity';
import { ContactFormDto } from './contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactMessage)
    private readonly contactRepository: Repository<ContactMessage>,
    private readonly mailerService: MailerService,
  ) {}

  async handleContactForm(
    contactFormDto: ContactFormDto,
  ): Promise<ContactMessage> {
    const newMessage = this.contactRepository.create(contactFormDto);
    const savedMessage = await this.contactRepository.save(newMessage);

    try {
      await this.mailerService.sendMail({
        to: process.env.GMAIL_USERNAME,
        from: savedMessage.email,
        subject: `New Portfolio Inquiry: ${savedMessage.subject}`,
        text: `
          New message received from your portfolio:
          Name: ${savedMessage.name}
          Email: ${savedMessage.email}
          
          --- Message ---
          ${savedMessage.message}
          ---
        `,
        // HTML body can be used for better formatting
        html: `
          <h1>New Portfolio Inquiry</h1>
          <p><strong>Name:</strong> ${savedMessage.name}</p>
          <p><strong>Email:</strong> ${savedMessage.email}</p>
          <hr>
          <p><strong>Subject:</strong> ${savedMessage.subject}</p>
          <p><strong>Message:</strong></p>
          <div style="border: 1px solid #eee; padding: 10px; margin-top: 10px;">
            ${savedMessage.message.replace(/\n/g, '<br>')}
          </div>
        `,
      });

      savedMessage.emailSent = true;
      await this.contactRepository.save(savedMessage);
    } catch (error) {
      console.error('Error sending contact email:', error);
    }

    return savedMessage;
  }
}
