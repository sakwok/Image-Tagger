const log4js = require('log4js')

const Logger = (logPath, isDebugger = false) => {
    const logConfig = {
        appenders: {
            app: {
                type: 'dateFile',
                filename: logPath,
                pattern: '-yyyy-MM-dd-hh.log',
            },
        },
        categories: {
            default: {
                appenders: ['app'],
                level: 'info',
            },
        },
        pm2: true,
        pm2InstanceVar: 'INSTANCE_ID',
    }

    let logger = null

    if (isDebugger || process.env.NO_ARROW_LOG_FILE === 'true') {
        logger = console
    } else {
        log4js.configure(logConfig)
        logger = log4js.getLogger()
    }
    return logger
}

export default Logger(process.env.LOG_DIR, process.env.NODE_ENV === 'development')
