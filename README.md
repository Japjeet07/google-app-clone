# Shoppin - React + Capacitor App

Shoppin is a React + Capacitor app built with Vite, Ionic, and Tailwind CSS. This app supports both web and mobile platforms (Android/iOS) and includes features like Google Login, Camera functionality, and more.



## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or later)  
  Download and install from [Node.js](https://nodejs.org/)

- **npm** (comes with Node.js)  
  Verify installation:
  ```bash
  node -v
  npm -v

- **Capacitor CLI** (v4 or later)  
  Install globally:
  ```bash
  npm install -g @capacitor/cli

- **Android Studio** (for Android development)
Download and install from Android Studio.


- **Java Development Kit** (JDK)
Install JDK 11 or later. Verify installation:




## Getting Started

Follow these steps to set up the project:



### 2. Install Dependencies
Install the required npm packages:
npm install


### 3. Configure Capacitor

Update the `capacitor.config.ts` file with your app's configuration:

```typescript
const config: CapacitorConfig = {
  appId: 'com.google.app', // Replace with your app's unique ID
  appName: 'shoppin',
  webDir: 'dist',
  plugins: {
    SocialLogin: {
      google: {
        webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID', // Replace with your Google Web Client ID
      },
    },
  },
};

export default config;
```

### 4. Add Android Platform
Add the Android platform to your project:
```bash
npx cap add android
```



## Setting Up Google Login
Modify MainActivity.java
To enable Google Login, you must modify the MainActivity.java file. Follow these steps:

Open the file located at:
MainActivity.java

Replace the contents of the file with the following code:
package com.google.app;

```bash
import ee.forgr.capacitor.social.login.GoogleProvider;
import ee.forgr.capacitor.social.login.SocialLoginPlugin;
import ee.forgr.capacitor.social.login.ModifiedMainActivityForSocialLoginPlugin;
import com.getcapacitor.PluginHandle;
import com.getcapacitor.Plugin;
import android.content.Intent;
import android.util.Log;
import com.getcapacitor.BridgeActivity;

// ModifiedMainActivityForSocialLoginPlugin is VERY VERY important !!!!!!    
public class MainActivity extends BridgeActivity implements ModifiedMainActivityForSocialLoginPlugin {

      @Override
      public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode >= GoogleProvider.REQUEST_AUTHORIZE_GOOGLE_MIN && requestCode < GoogleProvider.REQUEST_AUTHORIZE_GOOGLE_MAX) {
          PluginHandle pluginHandle = getBridge().getPlugin("SocialLogin");
          if (pluginHandle == null) {
            Log.i("Google Activity Result", "SocialLogin login handle is null");
            return;
          }
          Plugin plugin = pluginHandle.getInstance();
          if (!(plugin instanceof SocialLoginPlugin)) {
            Log.i("Google Activity Result", "SocialLogin plugin instance is not SocialLoginPlugin");
            return;
          }
          ((SocialLoginPlugin) plugin).handleGoogleLoginIntent(requestCode, data);
        }
      }

      // This function will never be called, leave it empty
      @Override
      public void IHaveModifiedTheMainActivityForTheUseWithSocialLoginPlugin() {}
}
```



## Running the App
### For Web:
```bash
Start the development server:
npm run dev
Open the app in your browser at http://localhost:5173.
```

### For Android:
Build the web assets:
```bash
npm run build
Copy the assets to the Android project:
npx cap open android
```

Build and run the app on an emulator or physical device.