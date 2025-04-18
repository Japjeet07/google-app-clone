import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.google.app',
  appName: 'shoppin',
  webDir: 'dist',
  plugins: {
    SocialLogin: {
      google: {
        webClientId: '1009269075164-s6ef943j0si1edmoo08ti8ohao8iddoo.apps.googleusercontent.com', // Replace with your Web Client ID
      },
    },
  },
  server: {
    url: 'https://vxqj79ww-5173.inc1.devtunnels.ms/', // Replace <your-computer-ip> with your local IP address
    cleartext: true,
    androidScheme: 'https', // Ensures routing works on Android
  },
};

export default config;
