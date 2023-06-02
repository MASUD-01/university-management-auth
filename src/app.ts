import express, { Application, Response, Request } from 'express'
import cors from 'cors'
import userRouter from '../src/app/modules/users/users.route'
import globalErorrHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()
app.use(cors())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes
app.use('/api/v1/users/', userRouter)

// //testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // throw new ApiError(300,'ore baba error')
//   next('ore baba error')
//   res.send('Hello World!')
// })
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
// app.post('/', (req: Request, res: Response) => {
//   console.log(req.body)
//   res.send('Hello World!')
// })

//global error handler
app.use(globalErorrHandler)
export default app
