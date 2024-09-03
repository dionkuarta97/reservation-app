import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client'
import { CustomerRepository } from './customer.repository';


@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) { }
  async create(createCustomerDto: Prisma.CustomerCreateInput) {
    try {
      return await this.customerRepository.create(createCustomerDto);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        const errorMessage = error.message;
        let newError = errorMessage
        if (errorMessage.includes('Argument `email` is missing') ||
          errorMessage.includes('Argument `email` must not be null')) {
          newError = "email is required"
        }
        if (errorMessage.includes('Argument `name` is missing') ||
          errorMessage.includes('Argument `name` must not be null')) {
          newError = "name is required"
        }
        throw new BadRequestException('Validation error: ' + newError);
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('customer with this email already exists');
        }
      }
      throw error;
    }

  }
  async findAll() {
    const customers = await this.customerRepository.findAll()
    if (customers.length === 0) throw new NotFoundException('data not found')
    return customers
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOne(id)
    if (!customer) throw new NotFoundException('data not found')
    return customer
  }

  async update(id: number, updateCustomerDto: Prisma.CustomerCreateInput) {
    const customer = await this.customerRepository.findOne(id)
    if (!customer) throw new NotFoundException('data not found')
    return await this.customerRepository.update(id, updateCustomerDto)
  }

  async remove(id: number) {
    const customer = await this.customerRepository.findOne(id)
    if (!customer) throw new NotFoundException('data not found')
    return await this.customerRepository.remove(id)
  }
}
