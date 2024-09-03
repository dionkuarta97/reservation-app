
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { MailerService } from 'src/mailer/mailer.service';

const validHHMMstring = (str: string) => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(str);
const isValidDate = (dateString: string) => {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false;
  var d = new Date(dateString);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false;
  return d.toISOString().slice(0, 10) === dateString;
}

@Injectable()
export class ReservationService {

  constructor(private readonly reservationRepository: ReservationRepository,
    private readonly databaseService: DatabaseService,
    private readonly mailerService: MailerService) { }


  async create(createReservationDto: CreateReservationDto) {
    try {
      let hours = createReservationDto.hours_booked
      let date = createReservationDto.date_booked

      if (!validHHMMstring(hours)) throw new BadRequestException('Time format must be hh:mm')
      if (!isValidDate(date)) throw new BadRequestException('Date format must be yyyy-mm-dd')
      if (new Date(`${date} ${hours}:00`) < new Date(Date.now() + 3 * (60 * 60 * 1000)))
        throw new BadRequestException('Minimum booking time 3 hours before')
      const openCloseHours = await this.reservationRepository.openCloseHours()
      if (openCloseHours[0].hours_open > Number(hours.slice(0, 2)) || openCloseHours[0].hours_close < Number(hours.slice(0, 2))) {
        throw new BadRequestException('only can book when the restaurant is open')
      }
      const table = await this.reservationRepository.findTableByNumber(createReservationDto.table_number)
      if (!table) throw new NotFoundException('table not found')

      const checkReservation = await this.reservationRepository.checkReservationReady({ date, hours, table_id: table.id })
      if (checkReservation.length > 0) throw new BadRequestException('table already booked')

      return this.databaseService.$transaction(async (prisma) => {
        const customer = await this.reservationRepository.findCustomerByEmail(createReservationDto.email, createReservationDto.name)
        const reservationInput: Prisma.ReservationUncheckedCreateInput = {
          table_id: table.id,
          customer_id: customer.id,
          hours_booked: hours,
          date_booked: date,
          booked_timestamp: new Date(`${date} ${hours}:00`)
        }
        const reservation = await this.reservationRepository.createReservation(reservationInput)
        this.mailerService.sendMail(customer.email, table.table_number, `${date} ${hours}:00`)
        return reservation
      })

    } catch (error) {
      throw error
    }
  }

  async findAll() {
    return await this.reservationRepository.findAllReservation()
  }

  async findOne(id: number) {
    const resev = await this.reservationRepository.findOne(id);
    if (!resev) throw new NotFoundException('data not found')
    return resev
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    try {

      const resev = await this.reservationRepository.findOne(id);
      let hours = updateReservationDto.hours_booked ?? resev.hours_booked
      let date = updateReservationDto.date_booked ?? resev.date_booked

      if (!resev) throw new NotFoundException('data not found')
      if (updateReservationDto.hours_booked) {
        if (!validHHMMstring(hours)) throw new BadRequestException('Time format must be hh:mm')
        const openCloseHours = await this.reservationRepository.openCloseHours()
        if (openCloseHours[0].hours_open > Number(hours.slice(0, 2)) || openCloseHours[0].hours_close < Number(hours.slice(0, 2))) {
          throw new BadRequestException('only can book when the restaurant is open')
        }
      }
      if (updateReservationDto.date_booked) {
        if (!isValidDate(date)) throw new BadRequestException('Date format must be yyyy-mm-dd')
      }



      const table = await this.reservationRepository.findTableByNumber(updateReservationDto.table_number)
      if (!table) throw new NotFoundException('table not found')

      if (updateReservationDto.hours_booked || updateReservationDto.date_booked) {
        const checkReservation = await this.reservationRepository.checkReservationReady({ date, hours, table_id: table.id })
        if (checkReservation.length > 0) throw new BadRequestException('table already booked')
      }

      const reservationInput: Prisma.ReservationUncheckedCreateInput = {
        table_id: table.id,
        customer_id: resev.customer_id,
        hours_booked: hours,
        date_booked: date,
        booked_timestamp: new Date(`${date} ${hours}:00`)
      }
      const reservation = await this.reservationRepository.update(id, reservationInput)

      return reservation

    } catch (error) {
      throw error
    }
  }

  async remove(id: number) {
    const resev = await this.reservationRepository.remove(id);
    if (!resev) throw new NotFoundException('data not found')
    return resev
  }
}
