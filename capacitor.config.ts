import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'id.web.saka.fountation',
  appName: 'fountation',
  webDir: 'dist',
  android: {
    minWebViewVersion: 60,
  },
  plugins: {
    "StatusBar": {
      "style": "DEFAULT",
      "overlaysWebView": false
    }
  }
};

export default config;

