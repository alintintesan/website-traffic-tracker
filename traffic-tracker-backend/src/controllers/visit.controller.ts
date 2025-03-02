import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { VisitService } from '../services/visit.service';

@Controller('visits')
export class VisitController {
    constructor(private readonly visitService: VisitService) { }

    @Get('count/:pageId')
    async getVisitCountForPage(
        @Param('pageId') pageId: number,
        @Query('startDate') start: string,
        @Query('endDate') end: string
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
}
