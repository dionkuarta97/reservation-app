import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { Reservation } from '@prisma/client';

describe('ReservationService', () => {
  let service: ReservationService;

  const mockReservationRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: ReservationService,
        useValue: mockReservationRepository,
      }],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
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
      jest.spyOn(service, 'create').mockReturnValue(Promise.resolve(reservation));

      const result = await service.create(createResercationDto);
      expect(mockReservationRepository.create).toHaveBeenCalled();
      expect(mockReservationRepository.create).toHaveBeenCalledWith(createResercationDto);

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
      jest.spyOn(service, 'findAll').mockReturnValue(Promise.resolve(reservations));

      const result = await service.findAll();
      expect(mockReservationRepository.findAll).toHaveBeenCalled();

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
      jest.spyOn(service, 'findOne').mockReturnValue(Promise.resolve(reservation));

      const result = await service.findOne(+id);
      expect(mockReservationRepository.findOne).toHaveBeenCalled();

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
      jest.spyOn(service, 'update').mockReturnValue(Promise.resolve(reservation));

      const result = await service.update(+id, updateReservationDto);
      expect(mockReservationRepository.update).toHaveBeenCalled();
      expect(mockReservationRepository.update).toHaveBeenCalledWith(+id, updateReservationDto);

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
      jest.spyOn(service, 'remove').mockReturnValue(Promise.resolve(reservation));

      const result = await service.remove(+id);
      expect(mockReservationRepository.remove).toHaveBeenCalled();
      expect(result).toEqual(reservation);
    });
  });
});
