// PM2 configuration for Marketing Pro
module.exports = {
  apps: [
    {
      name: 'marketing-pro',
      script: 'npx',
      args: 'wrangler pages dev dist --d1=marketing-pro-production --local --ip 0.0.0.0 --port 3000',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false, // Disable PM2 file monitoring
      instances: 1, // Development mode uses only one instance
      exec_mode: 'fork'
    }
  ]
}