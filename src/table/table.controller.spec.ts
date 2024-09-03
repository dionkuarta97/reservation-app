import { Test, TestingModule } from '@nestjs/testing';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { Table } from '@prisma/client';

describe('TableController', () => {
  let controller: TableController;
  const mockTableRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableController],
      providers: [{
        provide: TableService,
        useValue: mockTableRepository,
      }],
    }).compile();

    controller = module.get<TableController>(TableController);
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
      jest.spyOn(controller, 'create').mockReturnValue(Promise.resolve(table));

      const result = await controller.create(createTableDto);

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
      jest.spyOn(controller, 'findAll').mockReturnValue(Promise.resolve(tables));

      const result = await controller.findAll();

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
      jest.spyOn(controller, 'findOne').mockReturnValue(Promise.resolve(table));

      const result = await controller.findOne(id);

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
      jest.spyOn(controller, 'update').mockReturnValue(Promise.resolve(table));

      const result = await controller.update(id, updateTableDto);
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
      jest.spyOn(controller, 'remove').mockReturnValue(Promise.resolve(table));

      const result = await controller.remove(id);

      expect(result).toEqual(table);
    });
  });

});
