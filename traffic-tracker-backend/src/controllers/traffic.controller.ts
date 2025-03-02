import { Controller, Get, HttpException, HttpStatus, Param, Query } from "@nestjs/common";
import { TrafficService } from "../services/traffic.service";
import { VisitService } from "../services/visit.service";
import { VisitInfo } from "../models/visit-info.model";

@Controller()
export class TrafficController {
    constructor(
        private readonly visitService: VisitService,
        private readonly trafficService: TrafficService
    ) { }

    @Get('/websites/:websiteId/traffic/analyze')
    async analyzeTrafficSpikes(@Param('websiteId') websiteId: number) {
        const visits: VisitInfo[] = await this.visitService.getVisitInfoForWebsite(websiteId);
        const insight = await this.trafficService.analyzeTrafficSpikes(visits);

        return insight;
    }

    @Get('/websites/:websiteId/traffic/predict')
    async predictTraffic(@Param('websiteId') websiteId: number) {
        const visits: VisitInfo[] = await this.visitService.getVisitInfoForWebsite(websiteId);
        const prediction = await this.trafficService.predictTraffic(visits);
        return prediction;
    }

    @Get('/websites/:websiteId/traffic/optimize')
    async optimizeTraffic(@Param('websiteId') websiteId: number) {
        const visits: VisitInfo[] = await this.visitService.getVisitInfoForWebsite(websiteId);
        const suggestions = await this.trafficService.optimizeTraffic(visits);
        return suggestions;
    }
}