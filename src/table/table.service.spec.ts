import { Test, TestingModule } from '@nestjs/testing';
import { TableService } from './table.service';
import { Table } from '@prisma/client';

describe('TableService', () => {
  let service: TableService;

  const mockTableRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

      providers: [{
        provide: TableService,
        useValue: mockTableRepository,
      }],
    }).compile();

    service = module.get<TableService>(TableService);
  });
  describe('create', () => {
    it('should create a new table by a given data', async () => {
      const createTableDto = {
        table_number: 1
      };
      const table: Table = {
        "id": 1,
        "table_number": 1,
        "is_booked": false,
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
      jest.spyOn(service, 'create').mockReturnValue(Promise.resolve(table));

      const result = await service.create(createTableDto);
      expect(mockTableRepository.create).toHaveBeenCalled();
      expect(mockTableRepository.create).toHaveBeenCalledWith(createTableDto);

      expect(result).toEqual(table);
    });
  });
  describe('findAll', () => {
    it('should return an array of table', async () => {

      const table: Table = {
        "id": 1,
        "table_number": 1,
        "is_booked": false,
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
      const tables = [table]
      jest.spyOn(service, 'findAll').mockReturnValue(Promise.resolve(tables));

      const result = await service.findAll();
      expect(mockTableRepository.findAll).toHaveBeenCalled();

      expect(result).toEqual(tables);
    });
  });
  describe('findOne', () => {
    it('should find a table by a given id and return its data', async () => {
      const id = '1'
      const table: Table = {
        "id": 1,
        "table_number": 1,
        "is_booked": false,
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
      jest.spyOn(service, 'findOne').mockReturnValue(Promise.resolve(table));

      const result = await service.findOne(+id);
      expect(mockTableRepository.findOne).toHaveBeenCalled();

      expect(result).toEqual(table);
    });
  });
  describe('update', () => {
    it('should find a table by a given id and update its data', async () => {
      const id = '1'
      const updateTableDto = {
        table_number: 2,
        is_booked: false
      };
      const table: Table = {
        "id": 1,
        "table_number": 1,
        "is_booked": false,
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
      jest.spyOn(service, 'update').mockReturnValue(Promise.resolve(table));

      const result = await service.update(+id, updateTableDto);
      expect(mockTableRepository.update).toHaveBeenCalled();
      expect(mockTableRepository.update).toHaveBeenCalledWith(+id, updateTableDto);
      expect(result).toEqual(table);
    });
  });
  describe('remove', () => {
    it('should find a remove by a given id, remove and return this data', async () => {
      const id = '1'
      const table: Table = {
        "id": 1,
        "table_number": 1,
        "is_booked": false,
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
      jest.spyOn(service, 'remove').mockReturnValue(Promise.resolve(table));

      const result = await service.remove(+id);
      expect(mockTableRepository.remove).toHaveBeenCalled();

      expect(result).toEqual(table);
    });
  });

});
