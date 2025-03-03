import { Controller, Get, HttpException, HttpStatus, Param, Query } from "@nestjs/common";
import { TrafficService } from "../services/traffic.service";
import { VisitService } from "../services/visit.service";
import { VisitInfo } from "../models/visit-info.model";
import { WebsiteService } from "../services/website.service";
import { Website } from "../entities/website.entity";
import { ParseIntPipe } from "../pipes/parse-int.pipe";

@Controller()
export class TrafficController {
    constructor(
        private readonly visitService: VisitService,
        private readonly trafficService: TrafficService,
        private readonly websiteService: WebsiteService
    ) { }

    private async getWebsiteByIdOrThrow(websiteId: number): Promise<Website> {
        const website: Website | null = await this.websiteService.getWebsiteById(websiteId);
        if (!website) {
            throw new HttpException(`Website with id: ${websiteId} not found.`, HttpStatus.NOT_FOUND);
        }

        return website;
    }

    @Get('/websites/:websiteId/traffic/analyze')
    async analyzeTrafficSpikes(@Param('websiteId', ParseIntPipe) websiteId: number) {
        await this.getWebsiteByIdOrThrow(websiteId);

        const visits: VisitInfo[] = await this.visitService.getVisitInfoForWebsite(websiteId);
        if (visits.length === 0) {
            throw new HttpException(
                `No visits tracked for website with id: ${websiteId}. Can't provide traffic analysis.`,
                HttpStatus.NOT_FOUND
            );
        }

        const insight = await this.trafficService.analyzeTrafficSpikes(visits);
        return { result: insight };
    }

    @Get('/websites/:websiteId/traffic/predict')
    async predictTraffic(@Param('websiteId', ParseIntPipe) websiteId: number) {
        await this.getWebsiteByIdOrThrow(websiteId);

        const visits: VisitInfo[] = await this.visitService.getVisitInfoForWebsite(websiteId);
        if (visits.length === 0) {
            throw new HttpException(
                `No visits tracked for website with id: ${websiteId}. Can't provide traffic prediction.`,
                HttpStatus.NOT_FOUND
            );
        }

        const prediction = await this.trafficService.predictTraffic(visits);
        return { result: prediction };
    }

    @Get('/websites/:websiteId/traffic/optimize')
    async optimizeTraffic(@Param('websiteId', ParseIntPipe) websiteId: number) {
        await this.getWebsiteByIdOrThrow(websiteId);

        const visits: VisitInfo[] = await this.visitService.getVisitInfoForWebsite(websiteId);
        if (visits.length === 0) {
            throw new HttpException(
                `No visits tracked for website with id: ${websiteId}. Can't provide traffic optimization solutions.`,
                HttpStatus.NOT_FOUND
            );
        }

        const suggestions = await this.trafficService.optimizeTraffic(visits);
        return { result: suggestions };
    }
}