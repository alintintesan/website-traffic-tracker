import { Inject, Injectable } from "@nestjs/common";
import { AIService } from "../interfaces/ai-service.interface";
import { VisitInfo } from "../models/visit-info.model";
import { OPTIMIZE_TRAFFIC_PROMPT, PREDICT_TRAFFIC_PROMPT, TRAFFIC_SPIKES_PROMPT } from "../utils/constants";

@Injectable()
export class TrafficService {
    constructor(
        @Inject('AIService')
        private readonly aiService: AIService
    ) { }

    async analyzeTrafficSpikes(visitsInfo: VisitInfo[]): Promise<string> {
        const prompt = `${TRAFFIC_SPIKES_PROMPT} ${JSON.stringify(visitsInfo)}`;
        const response: string | undefined = await this.aiService.getResponse(prompt);

        if (!response) {
            throw new Error('Unable to retrieve analyze results.');
        }

        return response;
    }

    async predictTraffic(visitsInfo: any): Promise<string> {
        const prompt = `${PREDICT_TRAFFIC_PROMPT} ${JSON.stringify(visitsInfo)}`;
        const response: string | undefined = await this.aiService.getResponse(prompt);

        if (!response) {
            throw new Error('Unable to retrieve predict traffic results.');
        }

        return response;
    }

    async optimizeTraffic(visitsInfo: any): Promise<string> {
        const prompt = `${OPTIMIZE_TRAFFIC_PROMPT} ${JSON.stringify(visitsInfo)}`;
        const response: string | undefined = await this.aiService.getResponse(prompt);

        if (!response) {
            throw new Error('Unable to retrieve optimize traffic results.');
        }

        return response;
    }
}