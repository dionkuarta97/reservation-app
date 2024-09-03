import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { Reservation } from '@prisma/client';

describe('ReservationController', () => {
  let controller: ReservationController;
  const mockReservationRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [{
        provide: ReservationService,
        useValue: mockReservationRepository,
      }],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
  });


  describe('create', () => {
    it('should create a new reservation by a given data', async () => {
      const createResercationDto = {
        "hours_booked": "15:00",
        "date_booked": "2024-09-15",
        "table_number": 2,
        "email": "johndoe@mail.com",
        "name": "johndoe"
      }
      const reservation: Reservation = {
        "id": 1,
        "table_id": 2,
        "customer_id": 1,
        "hours_booked": "15:00",
        "date_booked": "2024-09-15",
        "booked_timestamp": new Date(),
        "createdAt": new Date(),
        "updatedAt": new Date(),

      }
      jest.spyOn(controller, 'create').mockReturnValue(Promise.resolve(reservation));

      const result = await controller.create(createResercationDto);

      expect(result).toEqual(reservation);
    });
  });
  describe('findAll', () => {
    it('should return an array of reservation', async () => {

      const reservation: Reservation = {
        "id": 1,
        "table_id": 2,
        "customer_id": 1,
        "hours_booked": "15:00",
        "date_booked": "2024-09-15",
        "booked_timestamp": new Date(),
        "createdAt": new Date(),
        "updatedAt": new Date(),
      }
      const reservations = [reservation]
      jest.spyOn(controller, 'findAll').mockReturnValue(Promise.resolve(reservations));

      const result = await controller.findAll();

      expect(result).toEqual(reservations);
    });
  });
  describe('findOne', () => {
    it('should find a reservation by a given id and return its data', async () => {
      const id = '1'
      const reservation: Reservation = {
        "id": 1,
        "table_id": 2,
        "customer_id": 1,
        "hours_booked": "15:00",
        "date_booked": "2024-09-15",
        "booked_timestamp": new Date(),
        "createdAt": new Date(),
        "updatedAt": new Date(),
      }
      jest.spyOn(controller, 'findOne').mockReturnValue(Promise.resolve(reservation));

      const result = await controller.findOne(id);

      expect(result).toEqual(reservation);
    });
  });

  describe('update', () => {
    it('should find a reservation by a given id and update its data', async () => {
      const id = '1';
      const updateReservationDto = {
        "hours_booked": "15:00",
        "date_booked": "2024-09-15",
        "table_number": 2,
        "email": "johndoe@mail.com",
        "name": "johndoe"
      };
      const reservation: Reservation = {
        "id": 1,
        "table_id": 2,
        "customer_id": 1,
        "hours_booked": "15:00",
        "date_booked": "2024-09-15",
        "booked_timestamp": new Date(),
        "createdAt": new Date(),
        "updatedAt": new Date(),
      }
      jest.spyOn(controller, 'update').mockReturnValue(Promise.resolve(reservation));

      const result = await controller.update(id, updateReservationDto);

      expect(result).toEqual(reservation);
    });
  });
  describe('remove', () => {
    it('should find a reservation by a given id, remove and return this data', async () => {
      const id = '1'
      const reservation: Reservation = {
        "id": 1,
        "table_id": 2,
        "customer_id": 1,
        "hours_booked": "15:00",
        "date_booked": "2024-09-15",
        "booked_timestamp": new Date(),
        "createdAt": new Date(),
        "updatedAt": new Date(),
      }
      jest.spyOn(controller, 'remove').mockReturnValue(Promise.resolve(reservation));

      const result = await controller.remove(id);
      expect(result).toEqual(reservation);
    });
  });
});
