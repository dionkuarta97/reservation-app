import { Prisma } from '@prisma/client';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { ApiBody, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { TableEntity } from './entities/table.entity';


@ApiTags('Table')
@Controller('/api/table')
export class TableController {
  constructor(private readonly tableService: TableService) { }

  @Post()
  @ApiBody({
    description: 'Data required to create a new table',
    type: CreateTableDto,

  })
  @ApiResponse({ description: "created succesfully", type: TableEntity, status: 201 })
  async create(@Body() createTableDto: Prisma.TableCreateInput) {
    return await this.tableService.create(createTableDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'list all table',
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(TableEntity) },
      example: [
        {
          "id": 1,
          "table_number": 1,
          "is_booked": false,
          "createdAt": "2024-09-02T18:34:50.408Z",
          "updatedAt": "2024-09-02T18:34:50.408Z"
        },
        {
          "id": 2,
          "table_number": 2,
          "is_booked": false,
          "createdAt": "2024-09-02T18:34:50.408Z",
          "updatedAt": "2024-09-02T18:34:50.408Z"
        },
        {
          "id": 3,
          "table_number": 3,
          "is_booked": false,
          "createdAt": "2024-09-02T18:34:50.408Z",
          "updatedAt": "2024-09-02T18:34:50.408Z"
        },
      ],
    }
  })
  async findAll() {
    return await this.tableService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: TableEntity, status: 200 })
  async findOne(@Param('id') id: string) {
    return await this.tableService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({
    description: 'Data required to update a  table',
    type: UpdateTableDto,

  })
  @ApiResponse({ description: "updated succesfully", type: TableEntity, status: 200 })
  async update(@Param('id') id: string, @Body() updateTableDto: Prisma.TableCreateInput) {
    return await this.tableService.update(+id, updateTableDto);
  }

  @Delete(':id')
  @ApiResponse({ description: 'Deleted Succesfully', type: TableEntity, status: 200 })
  async remove(@Param('id') id: string) {
    return await this.tableService.remove(+id);
  }
}
