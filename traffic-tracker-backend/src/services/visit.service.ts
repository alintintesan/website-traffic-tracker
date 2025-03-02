import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Page } from "../entities/page.entity";
import { Visit } from "../entities/visit.entity";
import { Repository } from "typeorm";
import { Website } from "../entities/website.entity";
import { VisitInfo } from "src/models/visit-info.model";

@Injectable()
export class VisitService {
    constructor(
        @InjectRepository(Website)
        private websiteRepository: Repository<Website>,
        @InjectRepository(Page)
        private pageRepository: Repository<Page>,
        @InjectRepository(Visit)
        private visitRepository: Repository<Visit>
    ) { }

    async getVisitInfoForWebsite(websiteId: number): Promise<VisitInfo[]> {
        const queryBuilder = this.visitRepository.createQueryBuilder('visit')
            .innerJoin('visit.page', 'page')
            .innerJoin('page.website', 'website')
            .select(['website.origin as origin', 'page.path as path', 'visit.timestamp as timestamp']);

        queryBuilder.andWhere('website.id = :websiteId', { websiteId });

        return queryBuilder.getRawMany();
    }

    async getVisitCountForPage(pageId: number, startDate?: Date, endDate?: Date): Promise<number> {
        const queryBuilder = this.visitRepository.createQueryBuilder('visit')
            .where('visit.pageId = :pageId', { pageId });

        if (startDate) {
            queryBuilder.andWhere('visit.timestamp >= :startDate', { startDate });
        }

        if (endDate) {
            queryBuilder.andWhere('visit.timestamp <= :endDate', { endDate });
        }

        const visitCount = await queryBuilder.getCount();
        return visitCount;
    }

    async createVisit(websiteOrigin: string, pagePath: string, visitTimestamp: Date): Promise<Visit> {
        let website: Website | null = await this.websiteRepository.findOne({ where: { origin: websiteOrigin } });
        if (!website) {
            website = new Website();
            website.origin = websiteOrigin;
            website = await this.websiteRepository.save(website);
        }

        let page: Page | null = await this.pageRepository.findOne({ where: { path: pagePath, website: { id: website.id } } });
        if (!page) {
            page = new Page();
            page.path = pagePath;
            page.website = website;
            page = await this.pageRepository.save(page);
        }

        const visit: Visit = new Visit();
        visit.page = page;
        visit.timestamp = visitTimestamp;

        return this.visitRepository.save(visit);
    }
}