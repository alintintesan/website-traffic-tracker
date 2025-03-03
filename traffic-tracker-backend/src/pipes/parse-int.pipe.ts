import { PipeTransform, Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
    transform(value: any) {
        const parsed = parseInt(value, 10);
        if (isNaN(parsed)) {
            throw new HttpException('Validation failed. Parameter must be a number.', HttpStatus.BAD_REQUEST);
        }
        return parsed;
    }
}
