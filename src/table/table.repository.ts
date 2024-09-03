import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, Table } from "@prisma/client"

@Injectable()
export class TableRepository {
  constructor(private readonly dataBaseService: DatabaseService) { }

  async create(createTableDto: Prisma.TableCreateInput): Promise<Table> {
    return await this.dataBaseService.table.create({ data: createTableDto })
  }

  async findAll(): Promise<Table[]> {
    return await this.dataBaseService.table.findMany({ orderBy: { table_number: "asc" } })
  }

  async findOne(id: number): Promise<Table> {
    return await this.dataBaseService.table.findUnique({ where: { id } })
  }

  async update(id: number, updateTableDto: Prisma.TableCreateInput): Promise<Table> {
    return await this.dataBaseService.table.update({ where: { id }, data: updateTableDto })
  }

  async remove(id: number): Promise<Table> {
    return await this.dataBaseService.table.delete({ where: { id } })
  }
}
