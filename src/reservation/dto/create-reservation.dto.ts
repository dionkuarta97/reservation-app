import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator"

export class CreateReservationDto {
  @ApiProperty({ description: 'hours_booked is required, format must be hh:mm, and can only be booked when the restaurant is open', example: '15:00' })
  @IsNotEmpty()
  hours_booked: string;
  @IsNotEmpty()
  @ApiProperty({ description: 'date_booked is required, format must be yyyy-mm-dd', example: '2024-09-15' })
  date_booked: string;
  @ApiProperty({ description: 'table_number is required', example: 2 })
  @IsNotEmpty()
  table_number: number;
  @IsEmail()
  @ApiProperty({ description: 'email is required, format must be email', example: 'johndoe@mail.com' })
  @IsNotEmpty()
  email: string;
  @ApiProperty({ description: 'name is required', example: 'johndoe' })
  @IsNotEmpty()
  name: string
}
