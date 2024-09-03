import { Prisma } from '@prisma/client';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { TableRepository } from './table.repository';

@Injectable()
export class TableService {
  constructor(private readonly tableRepository: TableRepository) { }

  async create(createTableDto: Prisma.TableCreateInput) {
    try {
      return await this.tableRepository.create(createTableDto)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        const errorMessage = error.message;
        let newError = errorMessage
        if (errorMessage.includes('Argument `table_number` is missing')) {
          newError = "table number is required"
        }
        throw new BadRequestException('Validation error: ' + newError);
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('table with this number already exists');
        }
      }
      throw error;
    }

  }

  async findAll() {
    const tables = await this.tableRepository.findAll()
    if (tables.length === 0) throw new NotFoundException('data not found')
    return tables
  }

  async findOne(id: number) {
    const table = await this.tableRepository.findOne(id)
    if (!table) throw new NotFoundException('data not found')
    return table
  }

  async update(id: number, updateTableDto: Prisma.TableCreateInput) {
    const table = await this.tableRepository.findOne(id)
    if (!table) throw new NotFoundException('data not found')
    return await this.tableRepository.update(id, updateTableDto)
  }

  async remove(id: number) {
    const customer = await this.tableRepository.findOne(id)
    if (!customer) throw new NotFoundException('data not found')
    return await this.tableRepository.remove(id)
  }
}
