import { Controller, Get } from '@nestjs/common';
import { PageService } from '../services/page.service';

@Controller('pages')
export class PageController {
  constructor(
    private readonly pageService: PageService
  ) { }

  @Get()
  async getAllPages() {
    return this.pageService.getAllPages();
  }

  @Get(':websiteId')
  async getPagesOfWebsite(websiteId: number) {
    return this.pageService.getPagesOfWebsite(websiteId);
  }
}
