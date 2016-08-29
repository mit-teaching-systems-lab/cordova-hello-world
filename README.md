# cordova-hello-world

Experimenting with Cordova for viewing and updating hard-coded contacts

This code was created by following [this Apache Cordova Tutorial](https://ccoenraets.github.io/cordova-tutorial/create-cordova-project.html)


## Setup and Installations

### Add support for the iOS or Android SDK
After cloning this repository, in the project root folder, run one of the following (depending on the platform you wish to develop for):

    cordova platforms add ios
    cordova platforms add android

### Add plugins

    cordova plugin add cordova-plugin-device  # Basic plugin
    cordova plugin add cordova-plugin-console  # Basic plugin
    cordova plugin add cordova-plugin-dialogs  # Native dialogs plugin
    cordova plugin add cordova-plugin-statusbar  # Status bar plugin
    cordova plugin add cordova-plugin-geolocation  # Geolocation plugin
    cordova plugin add cordova-plugin-contacts  # Contacts plugin
    cordova plugin add cordova-plugin-camera  # Camera plugin

## Building the Project
### Building for iOS
*You need the iOS SDK installed on your computer to build an iOS version of your application using the steps below.*

On the command line, make sure you are in the root directory and type:

    cordova build ios


The project is built in the `workshop/platforms/ios` folder. Double-click `Workshop.xcodeproj` to open the project in Xcode, and run it in the emulator or on your device.

You can also run the application in the iOS emulator directly from the command line. First install [ios-sim](https://github.com/phonegap/ios-sim):

    npm install -g ios-sim

or

    sudo npm install -g ios-sim

Then run the application in the iOS emulator:

    cordova emulate ios
    

### Building for Android
*You need the Android SDK installed on your computer to build an Android version of your application using the steps below.*

To build the project in the `workshop/platforms/android` folder and run it on an Android device connected to your computer using a USB cable, type:

    cordova run android

To build the project in the `workshop/platforms/android` folder and run it in the Android emulator, type:

    cordova emulate android

