import { Controller, Get } from '@nestjs/common';
import { WebsiteService } from '../services/website.service';

@Controller('websites')
export class WebsiteController {
    constructor(
        private readonly websiteService: WebsiteService
    ) { }

    @Get()
    async getAllWebsites() {
        return this.websiteService.getAllWebsites();
    }
}
