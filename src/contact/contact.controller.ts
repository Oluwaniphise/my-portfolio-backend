import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { ContactFormDto } from './contact.dto';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Submit a contact form message' })
  async submitMessage(@Body() contactFormDto: ContactFormDto) {
    await this.contactService.handleContactForm(contactFormDto);

    return {
      statusCode: HttpStatus.ACCEPTED,
      message: 'Thank you for your message! We will be in touch shortly.',
    };
  }
}
