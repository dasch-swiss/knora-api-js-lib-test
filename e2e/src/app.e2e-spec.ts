import {AppPage} from './app.po';
import {browser, logging} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome to knora-api-js-lib-test!');
  });

  it('request the knora-api system ontology', () => {

    page.navigateTo();

    const button = page.getEle('div section#ontology button.knora-api');

    button.click();

    const size = page.getEle('div section#ontology span.ontology');

    expect(size.getText()).toEqual('1');

  });

  it('request the anything ontology', () => {

    page.navigateTo();

    const button = page.getEle('div section#ontology button.anything');

    button.click();

    const size = page.getEle('div section#ontology span.ontology');

    expect(size.getText()).toEqual('2');

  });

  it('request the something ontology', () => {

    page.navigateTo();

    const button = page.getEle('div section#ontology button.something');

    button.click();

    const size = page.getEle('div section#ontology span.ontology');

    expect(size.getText()).toEqual('3');

  });

  it('request a resource', () => {

    page.navigateTo();

    const button = page.getEle('div section#resource button');

    button.click();

    const label = page.getEle('div section#resource span.label');

    expect(label.getText()).toEqual('testding');

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});
