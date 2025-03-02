import { Body, Controller, Get, HttpException, HttpStatus, Post, Res, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import * as path from "path";
import { CreateVisitDto } from "src/dto/create-visit.dto";
import { VisitService } from "src/services/visit.service";

@Controller('tracker')
export class TrackerController {
    constructor(
        private visitService: VisitService
    ) { }

    @Get('script')
    getTracker(@Res() response: Response): void {
        const trackerScriptPath: string = path.join(__dirname, '..', 'assets', 'tracker-script.js');
        response.sendFile(trackerScriptPath);
    }

    @Post('visit') // check route location?
    async trackVisit(@Body(new ValidationPipe()) visitData: CreateVisitDto) {
        try {
            const urlToParse: URL = new URL(visitData.url);
            await this.visitService.createVisit(urlToParse.origin, urlToParse.pathname, new Date(visitData.timestamp));
            console.log(`Visit data stored: ${visitData.url} | ${visitData.timestamp}`);
        } catch (e) {
            console.error('Unable to track visit:', e);
            throw new HttpException('Unable to store visit.', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return {
            message: 'Visit data stored.',
            statusCode: HttpStatus.CREATED
        };
    }
}