import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import logger from './shared/logger'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('database connected succesfully')
    app.listen(config.port, () => {
      logger.info(`application app listening on port ${config.port}`)
    })
  } catch (error) {
    logger.error('failed to connect', error)
  }
}

main()
