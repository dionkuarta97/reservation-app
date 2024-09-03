import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Customer } from '@prisma/client';

describe('CustomerController', () => {
  let controller: CustomerController;

  const mockCustomerRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [{
        provide: CustomerService,
        useValue: mockCustomerRepository,
      }],

    }).compile();

    controller = module.get<CustomerController>(CustomerController);


  });

  describe('create', () => {
    it('should create a new customer by a given data', async () => {
      const createUserDto = {
        name: 'Chadwssick',
        email: 'chadwickboseman123@email.com',
      };
      const customer: Customer = {
        id: 1,
        name: 'Chadwssick',
        email: 'chadwickboseman123@email.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      jest.spyOn(controller, 'create').mockReturnValue(Promise.resolve(customer));

      const result = await controller.create(createUserDto);


      expect(result).toEqual(customer);
    });
  });
  describe('findAll', () => {
    it('should return an array of customer', async () => {

      const customer: Customer = {
        id: 1,
        name: 'Chadwick',
        email: 'chadwickboseman@email.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      const customers = [customer]
      jest.spyOn(controller, 'findAll').mockReturnValue(Promise.resolve(customers));

      const result = await controller.findAll();

      expect(result).toEqual(customers);
    });
  });
  describe('findOne', () => {
    it('should find a customer by a given id and return its data', async () => {
      const id = '1'
      const customer: Customer = {
        id: 1,
        name: 'Chadwick',
        email: 'chadwickboseman@email.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      jest.spyOn(controller, 'findOne').mockReturnValue(Promise.resolve(customer));

      const result = await controller.findOne(id);

      expect(result).toEqual(customer);
    });
  });

  describe('update', () => {
    it(' should find a customer by a given id and update its data', async () => {
      const id = '1';
      const updateCustomerDto = {
        name: 'Chadwick putra',
        email: 'chadwickboseman@email.com',
      };
      const customer: Customer = {
        id: 1,
        name: 'Chadwick',
        email: 'chadwickboseman@email.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      jest.spyOn(controller, 'update').mockReturnValue(Promise.resolve(customer));

      const result = await controller.update(id, updateCustomerDto);

      expect(result).toEqual(customer);
    });
  });
  describe('remove', () => {
    it('should find a customer by a given id, remove and return this data', async () => {
      const id = '1'
      const customer: Customer = {
        id: 1,
        name: 'Chadwick',
        email: 'chadwickboseman@email.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      jest.spyOn(controller, 'remove').mockReturnValue(Promise.resolve(customer));

      const result = await controller.remove(id);
      expect(result).toEqual(customer);
    });
  });
});
