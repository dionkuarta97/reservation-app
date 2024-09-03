import { ApiProperty } from "@nestjs/swagger";

export class TableEntity {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 1 })
  table_number: number;
  @ApiProperty({ example: false })
  is_booked: boolean;
  @ApiProperty({ example: "2024-09-02T17:03:38.680Z" })
  createdAt: Date;
  @ApiProperty({ example: "2024-09-02T17:03:38.680Z" })
  updatedAt: Date;
}