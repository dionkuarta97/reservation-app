
import { DatabaseService } from 'src/database/database.service';
import { Prisma, Customer } from '@prisma/client'
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerRepository {

  constructor(private readonly dataBaseService: DatabaseService) { }

  async create(createCustomerDto: Prisma.CustomerCreateInput): Promise<Customer> {
    return await this.dataBaseService.customer.create({ data: createCustomerDto });
  }

  async findAll(): Promise<Customer[]> {
    return await this.dataBaseService.customer.findMany({
      orderBy: {
        id: "desc"
      }
    })
  }

  async findOne(id: number): Promise<Customer | null> {
    return await this.dataBaseService.customer.findUnique({
      where: { id }
    })
  }

  async update(id: number, updateCustomerDto: Prisma.CustomerCreateInput): Promise<Customer> {
    return await this.dataBaseService.customer.update({
      where: {
        id
      },
      data: updateCustomerDto,
    })
  }

  async remove(id: number): Promise<Customer> {
    return await this.dataBaseService.customer.delete({
      where: {
        id
      },
    })
  }
}
