import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { resumeDTO } from './resume.dto';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('/dev_profile_pdf')
  async pdf(@Body() payload: resumeDTO, @Res() res: Response) {
    return await this.appService.pdf(payload, res);
  }
}
