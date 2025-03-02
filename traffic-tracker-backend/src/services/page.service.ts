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

    async getPagesOfWebsite(websiteId: number): Promise<Page[]> {
        return this.pageRepository.find({ where: { id: websiteId } });
    }
}