import wd from 'wd';
import server from '../__config__/server';
import capabilities from '../__config__/capabilities';
import { fixtures } from '../__config__/fixtures';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5 * 60 * 1000;

const driver = wd.promiseChainRemote(server.url, server.port);

describe('App', () => {
  beforeAll(async () => {
    try {
      await driver.init(capabilities);
      await driver.sleep(2 * 1000); // wait for app to load
    }
    catch(error) {
      console.error(error);
    }
  });

  afterAll(async () => {
    try {
      await driver.quit();
    }
    catch(error) {
      console.error(error);
    }
  });

  it('login with correct data is successful', async () => {
    expect(await driver.hasElementByAccessibilityId('inputUsername')).toBe(true);
    expect(await driver.hasElementByAccessibilityId('inputPassword')).toBe(true);


    await driver.elementById('inputUsername').click().sendKeys(fixtures.correctUserName);
    await driver.elementById('inputPassword').click().sendKeys(fixtures.correctPassword);
    await driver.elementById('buttonLogin').click();

    expect(await driver.hasElementByAccessibilityId('dashboardView')).toBe(true);
  });

  it('login with incorrect data is not successful', async () => {
    await driver.resetApp();
    expect(await driver.hasElementByAccessibilityId('inputUsername')).toBe(true);
    expect(await driver.hasElementByAccessibilityId('inputPassword')).toBe(true);

    await driver.elementById('inputUsername').click().sendKeys(fixtures.incorrectUsername);
    await driver.elementById('inputPassword').click().sendKeys(fixtures.incorrectPassword);
    await driver.elementById('buttonLogin').click();

    expect(await driver.hasElementByAccessibilityId('dashboardView')).toBe(false);
    expect(await driver.hasElementByAccessibilityId('inputUsername')).toBe(true);
    expect(await driver.hasElementByAccessibilityId('inputPassword')).toBe(true);
  });
});
