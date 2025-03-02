import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { VisitService } from '../services/visit.service';
import { CreateVisitDto } from 'src/dto/create-visit.dto';

@Controller()
export class VisitController {
    constructor(private readonly visitService: VisitService) { }

    @Get('/pages/:pageId/visits/count')
    async getVisitCountForPage(
        @Param('pageId') pageId: number,
        @Query('start') start: string,
        @Query('end') end: string
    ) {
        const startDate: Date | undefined = start ? new Date(start) : undefined;
        const endDate: Date | undefined = end ? new Date(end) : undefined;

        if (startDate && isNaN(startDate.getTime())) {
            throw new HttpException('Invalid start date format. Please use a valid ISO string.', HttpStatus.BAD_REQUEST);
        }

        if (endDate && isNaN(endDate.getTime())) {
            throw new HttpException('Invalid end date format. Please use a valid ISO string.', HttpStatus.BAD_REQUEST);
        }

        return this.visitService.getVisitCountForPage(pageId, startDate, endDate);
    }

    @Post('visits')
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
