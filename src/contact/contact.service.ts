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
    // This assumes you have configured and imported the MailerModule
    private readonly mailerService: MailerService,
  ) {}

  /**
   * Saves the contact message to the database and sends an email notification.
   * @param contactFormDto The data from the contact form.
   * @returns The saved ContactMessage entity.
   */
  async handleContactForm(
    contactFormDto: ContactFormDto,
  ): Promise<ContactMessage> {
    // 1. SAVE TO DATABASE (High Priority)
    const newMessage = this.contactRepository.create(contactFormDto);
    const savedMessage = await this.contactRepository.save(newMessage);

    // 2. SEND EMAIL NOTIFICATION (Secondary Priority, but important)
    try {
      await this.mailerService.sendMail({
        // Replace with your actual target Gmail address
        to: process.env.GMAIL_USERNAME,
        from: savedMessage.email, // The sender's email
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

      // Update DB to reflect successful email send (optional but good practice)
      savedMessage.emailSent = true;
      await this.contactRepository.save(savedMessage);
    } catch (error) {
      console.error('Error sending contact email:', error);
      // Log the failure but still return the saved DB message
    }

    return savedMessage;
  }
}
