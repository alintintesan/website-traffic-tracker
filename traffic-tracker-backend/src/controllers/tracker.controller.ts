import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import * as path from "path";

@Controller()
export class TrackerController {
    @Get('tracker.js')
    getTracker(@Res() response: Response): void {
        const trackerScriptPath: string = path.join(__dirname, '..', 'assets', 'tracker-script.js');
        response.sendFile(trackerScriptPath);
    }
}