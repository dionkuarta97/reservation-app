
import { DatabaseService } from 'src/database/database.service';
import { Prisma, Reservation, Table, Customer, Restaurant } from '@prisma/client'
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationRepository {

  constructor(private readonly dataBaseService: DatabaseService) { }

  async findTableByNumber(table_number: number): Promise<Table | null> {
    return await this.dataBaseService.table.findUnique({ where: { table_number } })
  }

  async findCustomerByEmail(email: string, name: string): Promise<Customer | null> {
    return await this.dataBaseService.customer.upsert({ where: { email }, update: {}, create: { email, name } })
  }

  async createReservation(createReservetaionDto: Prisma.ReservationUncheckedCreateInput): Promise<Reservation> {
    return await this.dataBaseService.reservation.create({
      data: createReservetaionDto, include: {
        customer: true,
        table: true
      }
    })
  }

  async checkReservationReady({ date, hours, table_id }: { date?: string, hours?: string, table_id?: number }): Promise<Reservation[]> {

    return await this.dataBaseService.reservation.findMany({
      where: {
        table_id: table_id,
        booked_timestamp: {
          lte: new Date(`${date} ${hours}:00`),
          gte: new Date(new Date(date).setHours(new Date(`${date} ${hours}:00`).getHours() - 1))
        }
      },
      include: {
        customer: true,
        table: true
      }
    })
  }

  async findAllReservation(): Promise<Reservation[]> {

    return await this.dataBaseService.reservation.findMany({
      orderBy: {
        booked_timestamp: 'asc'
      },
      include: {
        customer: true,
        table: true
      }
    })
  }

  async openCloseHours(): Promise<Restaurant[]> {
    return await this.dataBaseService.restaurant.findMany()
  }
  async updateTableBooked(table_number: number): Promise<Table> {
    return await this.dataBaseService.table.update({
      where: { table_number },
      data: { is_booked: true }
    })
  }

  async findOne(id: number): Promise<Reservation> {
    return await this.dataBaseService.reservation.findUnique({
      where: { id },
      include: {
        customer: true,
        table: true
      }
    })
  }

  async update(id: number, updateReservationDto: Prisma.ReservationUncheckedCreateInput): Promise<Reservation> {
    return this.dataBaseService.reservation.update({
      where: { id },
      data: updateReservationDto,
      include: { customer: true, table: true }
    })
  }

  async remove(id: number): Promise<Reservation> {
    return this.dataBaseService.reservation.delete({
      where: { id },
      include: { customer: true, table: true }
    })
  }
} 
