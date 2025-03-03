import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { PageService } from '../services/page.service';
import { Website } from '../entities/website.entity';
import { WebsiteService } from '../services/website.service';
import { ParseIntPipe } from '../pipes/parse-int.pipe';

@Controller()
export class PageController {
  constructor(
    private readonly websiteService: WebsiteService,
    private readonly pageService: PageService
  ) { }

  @Get('websites/:websiteId/pages')
  async getPagesOfWebsite(@Param('websiteId', ParseIntPipe) websiteId: number) {
    const website: Website | null = await this.websiteService.getWebsiteById(websiteId);

    if (!website) {
      throw new HttpException(`Website with id: ${websiteId} not found.`, HttpStatus.NOT_FOUND);
    }

    return this.pageService.getPagesOfWebsite(websiteId);
  }
}
