const capabilities = {
  local_ios: {
    platformName: 'iOS',
    deviceName: 'iPhone X',
    automationName: 'XCUITest',
    autoAcceptAlerts: true,
    nativeWebTap: true,
    showIOSLog: true,
    app: '/Users/janmannig/Repositories/Private/Typo3Pocket/ios/build/Build/Products/Release-iphonesimulator/Typo3Pocket.app.zip',
  },
  local_android: {
    platformName: 'Android',
    deviceName: 'Android Emulator',
    app: '/Users/jmrodriguez/dev/medium/react_native_appium/android/app/build/outputs/apk/app-release.apk'
  },
  remote_ios: {
    platformName: 'iOS',
    platformVersion: '11.0',
    deviceName: 'iPhone X',
    automationName: 'XCUITest',
    app: 'sauce-storage:app-release.app.zip',
  },
  remote_android: {
    platformName: 'Android',
    platformVersion: '7.1',
    deviceName: 'Android GoogleAPI Emulator',
    app: 'sauce-storage:app-release.apk',
  },
};

if (!process.env.TEST_CONFIG) {
  throw new Error('TEST_CONFIG environment variable is not defined');
}

if (!capabilities[process.env.TEST_CONFIG]) {
  throw new Error(`Capabilities not found for TEST_CONFIG environment ${process.env.TEST_CONFIG}`);
}

export default capabilities[process.env.TEST_CONFIG];
