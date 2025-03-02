import { Controller, Get, HttpException, HttpStatus, Param, Query } from "@nestjs/common";
import { TrafficService } from "../services/traffic.service";
import { VisitService } from "../services/visit.service";
import { VisitInfo } from "../models/visit-info.model";

@Controller('traffic')
export class TrafficController {
    constructor(
        private readonly visitService: VisitService,
        private readonly trafficService: TrafficService
    ) { }

    @Get('analyze/spikes/:websiteId')
    async analyzeTrafficSpikes(@Param('websiteId') websiteId: number) {
        const visits: VisitInfo[] = await this.visitService.getVisitInfoForWebsite(websiteId);
        const insight = await this.trafficService.analyzeTrafficSpikes(visits);

        return insight;
    }

    @Get('predict/:websiteId')
    async predictTraffic(@Param('websiteId') websiteId: number) {
        const visits: VisitInfo[] = await this.visitService.getVisitInfoForWebsite(websiteId);
        const prediction = await this.trafficService.predictTraffic(visits);
        return prediction;
    }

    @Get('optimize/:websiteId')
    async optimizeTraffic(@Param('websiteId') websiteId: number) {
        const visits: VisitInfo[] = await this.visitService.getVisitInfoForWebsite(websiteId);
        const suggestions = await this.trafficService.optimizeTraffic(visits);
        return suggestions;
    }
}