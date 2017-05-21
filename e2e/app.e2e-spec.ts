import { XgModuleLibsPage } from './app.po';

describe('xg-module-libs App', () => {
  let page: XgModuleLibsPage;

  beforeEach(() => {
    page = new XgModuleLibsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
