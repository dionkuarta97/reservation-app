import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTableDto } from './create-table.dto';

export class UpdateTableDto extends PartialType(CreateTableDto) {
  @ApiProperty({ description: "table number is required and unique", example: 1 })
  table_number: number;
  @ApiProperty({ description: "is booked is required", example: false })
  is_booked: boolean
}
