import { Injectable } from "@nestjs/common";
import { Page } from "../entities/page.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PageService {
    constructor(
        @InjectRepository(Page)
        private pageRepository: Repository<Page>
    ) { }

    async getPageById(pageId: number): Promise<Page | null> {
        return this.pageRepository.findOne({ where: { id: pageId } });
    }

    async getPagesOfWebsite(websiteId: number): Promise<Page[]> {
        return this.pageRepository.find({ where: { website: { id: websiteId } } });
    }
}