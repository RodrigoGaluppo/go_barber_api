import { Router } from 'express'
import appointmentsRoutes from "@modules/appointments/infra/http/routes/appointments.routes"
import userRouter from "@modules/users/infra/http/routes/user.routes"
import sessionRouter from "@modules/users/infra/http/routes/sessions.routes"
import passwordRouter from "@modules/users/infra/http/routes/password.routes"
import profileRouter from "@modules/users/infra/http/routes/profile.routes"
import providersRouter from "@modules/appointments/infra/http/routes/Providers.routes"

const routes = Router()

// arquivo principal de rotas que importa todas as rotas do app

routes.use("/appointments", appointmentsRoutes)
routes.use("/providers", providersRouter)
routes.use("/users",userRouter)
routes.use("/sessions",sessionRouter)
routes.use("/password",passwordRouter)
routes.use("/profile",profileRouter)

export default routes
