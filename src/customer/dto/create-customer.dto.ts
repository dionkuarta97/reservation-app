import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomerDto {
  @ApiProperty({ description: 'name from customer' })
  name: string;
  @ApiProperty({ description: "email from customer, email must unique" })
  email: string
}