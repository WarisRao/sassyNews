const path = require('path');
const modifyBuilder = require('razzle-plugin-pwa').default
 
  const pwaConfig = {
    swDest: 'sw.js',
    clientsClaim: true,
    skipWaiting: true,
    runtimeCaching: [{
        urlPattern: new RegExp('https://feed.sassydevs.com'),
        handler: 'networkFirst'
    }]
  }
 
  const manifestConfig = {
    filename: 'manifest.json',
    name: 'Sassy News',
    short_name: 'SassyNews',
    description: 'News app built with react and graphql on top of hacker news api',
    orientation: 'portrait',
    display: 'fullscreen',
    start_url: '/',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    related_applications: [],
    icons: [
      {
          'src': require.resolve(path.join(__dirname, 'public', 'logo.png')),
          'sizes': '512x512',
          'type': 'image/png'
      },
      {
        'src': require.resolve(path.join(__dirname, 'public', 'favicon.ico')),
        'sizes': '55x61',
      }
    ]
  }
 
  const modify = modifyBuilder({ pwaConfig, manifestConfig })
 
  module.exports = {
    plugins: [{ func: modify }]
  }