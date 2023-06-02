import { Request, Response, NextFunction } from 'express'
import { IGenericErrorMessage } from '../../interfaces/error'
import config from '../../config'

const globalErorrHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500
  const message = 'something went wrong'
  const errorMessages: IGenericErrorMessage[] = []

  if (err?.name === 'validationError') {
    // const simplifiedError = handleValidationError(err)
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
  next()
}

export default globalErorrHandler
