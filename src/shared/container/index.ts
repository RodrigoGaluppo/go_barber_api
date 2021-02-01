import { container } from "tsyringe"
import "@modules/users/providers"
import "./providers"

// exporta e registra os containers para injecao de dependencis

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentRepository"
import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentRepository"

import IUsersRepository from "@modules/users/repositories/IUsersRepository"
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository"

import IUserTokenRepository from "@modules/users/repositories/IUsersTokenRepositoy"
import UserTokenRepository from "@modules/users/infra/typeorm/repositories/UserTokenRepository"

import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository"
import NotifictionsRepository from "@modules/notifications/infra/typeorm/repositories/NotificationRepository"


container.registerSingleton<IAppointmentsRepository>("AppointmentsRepository",AppointmentsRepository)
container.registerSingleton<IUsersRepository>("UsersRepository",UsersRepository)
container.registerSingleton<IUserTokenRepository>("UserTokenRepository",UserTokenRepository)
container.registerSingleton<INotificationsRepository>("NotificationsRepository",NotifictionsRepository)