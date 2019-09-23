import { AppPage } from './app.po';
import {browser, by, element, logging} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome to knora-api-js-lib-test!');
  });

  it('request a resource',   () => {

    page.navigateTo();

    const button = page.getEle('div section#resource button');

    button.click();

    const label = page.getEle('div section#resource span.label');

    expect(label.getText()).toEqual('testding');

    const uriValue = page.getEle('div section#resource span.uriValue');

    expect(uriValue.getText()).toEqual('http://www.google.ch');

    const numOfUriValues = page.getEle('div section#resource span.numOfUriValues');

    expect(numOfUriValues.getText()).toEqual('1');

    const numOfNonExistingValues = page.getEle('div section#resource span.numOfNonExistingValues');

    expect(numOfNonExistingValues.getText()).toEqual('0');

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});
