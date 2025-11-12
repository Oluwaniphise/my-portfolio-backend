import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { ContactFormDto } from './contact.dto';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED) // Return 202 Accepted status
  @ApiOperation({ summary: 'Submit a contact form message' })
  async submitMessage(@Body() contactFormDto: ContactFormDto) {
    // We handle the database save and email send here
    await this.contactService.handleContactForm(contactFormDto);

    return {
      statusCode: HttpStatus.ACCEPTED,
      message: 'Thank you for your message! We will be in touch shortly.',
    };
  }
}
