import { IsString, IsDateString, IsUrl } from 'class-validator';

export class CreateVisitDto {
  @IsUrl({}, { message: 'The visited url to track is invalid.' })
  url: string;

  @IsDateString({}, { message: 'The visit timestamp must be a valid ISO string.' })
  timestamp: string;
}
