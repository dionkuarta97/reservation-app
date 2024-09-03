import { ApiProperty } from "@nestjs/swagger";

export class CustomerEntity {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'johndoe@example.com' })
  email: string;
  @ApiProperty({ example: 'johndoe' })
  name: string;
  @ApiProperty({ example: "2024-09-02T17:03:38.680Z" })
  createdAt: Date;
  @ApiProperty({ example: "2024-09-02T17:03:38.680Z" })
  updatedAt: Date;
}