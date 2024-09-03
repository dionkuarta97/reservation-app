import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Prisma, } from '@prisma/client'
import { ApiBody, ApiTags, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerEntity } from './entities/customer.entity';


@ApiTags('Customer')
@Controller('/api/customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post()
  @ApiBody({
    description: 'Data required to create a new customer',
    type: CreateCustomerDto,
    examples: {
      example1: {
        summary: 'example request body',
        description: 'This is an example of how the request body should look.',
        value: {
          name: 'johndoe',
          email: 'johndoe@example.com',
        },
      },
    },
  })
  @ApiResponse({ description: 'Created Succesfully', type: CustomerEntity, status: 201 })
  async create(@Body() createCustomerDto: Prisma.CustomerCreateInput) {
    return await this.customerService.create(createCustomerDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'list all customer',
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(CustomerEntity) },
      example: [
        {
          "id": 6,
          "email": "diondpkp97@gmail.com",
          "name": "dion dpkp",
          "createdAt": "2024-09-02T16:26:55.366Z",
          "updatedAt": "2024-09-02T16:26:55.366Z"
        },
        {
          "id": 8,
          "email": "johndoe@example.com",
          "name": "johndoe",
          "createdAt": "2024-09-02T16:54:18.357Z",
          "updatedAt": "2024-09-02T16:54:18.357Z"
        },
        {
          "id": 10,
          "email": "diondpkp@gmail.com",
          "name": "dion dpkp",
          "createdAt": "2024-09-02T17:03:38.680Z",
          "updatedAt": "2024-09-02T17:03:38.680Z"
        },
      ],
    }
  })
  async findAll() {
    return await this.customerService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: CustomerEntity, status: 200 })
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({
    description: 'Data required to update a  customer',
    type: CreateCustomerDto,
    examples: {
      example1: {
        summary: 'example request body',
        description: 'This is an example of how the request body should look.',
        value: {
          name: 'johndoe',
          email: 'johndoe@example.com',
        },
      },
    },
  })
  @ApiResponse({ description: 'Updated Succesfully', type: CustomerEntity, status: 200 })
  update(@Param('id') id: string, @Body() updateCustomerDto: Prisma.CustomerCreateInput) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiResponse({ description: 'Deleted Succesfully', type: CustomerEntity, status: 200 })
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
