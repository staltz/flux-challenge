jest.dontMock('../JediActions');
var JediActions = require('../JediActions');

describe('Actions: JediActions', () => {

  describe('JediActions.newJedi', () => {
    it('Should return an Action of type NEW_JEDI', () => {
      var scrollUpAction = JediActions.newJedi();
      expect(scrollUpAction.type).toEqual('NEW_JEDI');
    });
  });

});
