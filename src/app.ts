import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import userRouter from '../src/app/modules/users/users.route'
const app: Application = express()
app.use(cors())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes
app.use('/api/v1/users/', userRouter)

// class ApiError extends Error {
//   statusCode: number

//   constructor(statusCode: number, message: string | undefined, stack = '') {
//     super(message)
//     this.statusCode = statusCode
//     if (stack) {
//       this.stack = stack
//     } else {
//       Error.captureStackTrace(this, this.constructor)
//     }
//   }
// }
//testing
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  // throw new ApiError(300,'ore baba error')
  next('ore baba error')
  res.send('Hello World!')
})

//global error handler
app.use((err: any, req: Request, res: Response /* next: NextFunction */) => {
  if (err instanceof Error) {
    res.status(400).json({ error: err })
  } else {
    res.status(500).json({ error: 'Something went wrong' })
  }
})

export default app
