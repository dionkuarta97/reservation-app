import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReservationDto } from './create-reservation.dto';
import { IsNotEmpty, IsEmail } from "class-validator"

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @ApiProperty({ description: 'If you do not update hours booked, do not fill it in, format must be hh:mm, and can only be booked when the restaurant is open' })
  hours_booked?: string;
  @ApiProperty({ description: 'If you do not update date booked, do not fill it in, format must be yyyy-mm-dd' })
  date_booked?: string;
  @IsNotEmpty()
  table_number: number;

}
