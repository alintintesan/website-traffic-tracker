import { Controller, Get } from '@nestjs/common';
import { PageService } from '../services/page.service';

@Controller()
export class PageController {
  constructor(
    private readonly pageService: PageService
  ) { }

  @Get('websites/:websiteId/pages')
  async getPagesOfWebsite(websiteId: number) {
    return this.pageService.getPagesOfWebsite(websiteId);
  }
}
