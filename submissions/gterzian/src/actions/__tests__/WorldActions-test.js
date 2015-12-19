jest.dontMock('../WorldActions');
var WorldActions = require('../WorldActions');

describe('Actions: WorldActions', () => {

  describe('WorldActions.newWorld', () => {
    it('Should return an Action of type NEW_WORLD', () => {
      var newWorldAction = WorldActions.newWorld();
      expect(newWorldAction.type).toEqual('NEW_WORLD');
    });

    it('Should return an Action with the id of the new world', () => {
      var newWorldAction = WorldActions.newWorld('test_world');
      expect(newWorldAction.id).toEqual('test_world');
    });

    it('Should return an Action with the name of the new world', () => {
      var newWorldAction = WorldActions.newWorld('test_world', 'earth');
      expect(newWorldAction.name).toEqual('earth');
    });
  });
});
