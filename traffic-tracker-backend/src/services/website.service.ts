import { Injectable } from "@nestjs/common";
import { Page } from "../entities/page.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Website } from "../entities/website.entity";

@Injectable()
export class WebsiteService {
    constructor(
        @InjectRepository(Website)
        private websiteRepository: Repository<Website>
    ) { }

    async getWebsiteById(websiteId: number): Promise<Website | null> {
        return this.websiteRepository.findOne({ where: { id: websiteId } });
    }

    async getAllWebsites(): Promise<Website[]> {
        return this.websiteRepository.find();
    }
}