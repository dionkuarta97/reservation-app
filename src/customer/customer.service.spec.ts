import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { Customer } from '@prisma/client'

describe('CustomerService', () => {
  let service: CustomerService;

  const mockCustomerRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

      providers: [{
        provide: CustomerService,
        useValue: mockCustomerRepository,
      }],

    }).compile();

    service = module.get<CustomerService>(CustomerService);


  });

  describe('create', () => {
    it('should create a new customer by a given data', async () => {
      const createUserDto = {
        name: 'Chadwick',
        email: 'chadwickboseman@email.com',
      };
      const customer: Customer = {
        id: 1,
        name: 'Chadwick',
        email: 'chadwickboseman@email.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      jest.spyOn(service, 'create').mockReturnValue(Promise.resolve(customer));

      const result = await service.create(createUserDto);
      expect(mockCustomerRepository.create).toHaveBeenCalled();
      expect(mockCustomerRepository.create).toHaveBeenCalledWith(createUserDto);

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
      jest.spyOn(service, 'findAll').mockReturnValue(Promise.resolve(customers));

      const result = await service.findAll();
      expect(mockCustomerRepository.findAll).toHaveBeenCalled();

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
      jest.spyOn(service, 'findOne').mockReturnValue(Promise.resolve(customer));

      const result = await service.findOne(+id);
      expect(mockCustomerRepository.findOne).toHaveBeenCalled();

      expect(result).toEqual(customer);
    });
  });

  describe('update', () => {
    it('should find a customer by a given id and update its data', async () => {
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
      jest.spyOn(service, 'update').mockReturnValue(Promise.resolve(customer));

      const result = await service.update(+id, updateCustomerDto);
      expect(mockCustomerRepository.update).toHaveBeenCalled();
      expect(mockCustomerRepository.update).toHaveBeenCalledWith(+id, updateCustomerDto);

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
      jest.spyOn(service, 'remove').mockReturnValue(Promise.resolve(customer));

      const result = await service.remove(+id);
      expect(mockCustomerRepository.remove).toHaveBeenCalled();
      expect(result).toEqual(customer);
    });
  });
});
