import { UiMaterializePage } from './app.po';

describe('ui-materialize App', function() {
  let page: UiMaterializePage;

  beforeEach(() => {
    page = new UiMaterializePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
