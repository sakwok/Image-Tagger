const fs = require('fs')
const { join } = require('path')
const { name } = require('./package')
const env = fs.readFileSync(join(__dirname, 'env', 'production.env'))

const config = {
  apps : [{
    name: `${name}`,
    script: '.next/dist/index.js',
    watch: false,
    autorestart: true,
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    instances: 0,
    exec_mode: 'cluster',
    instance_var: 'INSTANCE_ID',
    node_args: '--nouse_idle_notification --max-old-space-size=2048',
    log_file: `logs/${name}/pm2/log/pm2.log`,
    out_file: `logs/${name}/pm2/out/out.log`,
    err_file: `logs/${name}/pm2/err/err.log`,
    env: {
      NODE_ENV: 'production',
      LOG_DIR: `logs/${name}/app/log.log`,
    }
  }]
}

module.exports = config
