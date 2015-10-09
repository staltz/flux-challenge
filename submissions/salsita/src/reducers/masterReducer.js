import * as Actions from '../constants/actions';
import * as ScrollingReducer from './scrollingReducer';
import * as SithLoadingReducer from './sithLoadingReducer';
import * as PlanetReducer from './planetReducer';
import * as Queries from './queries';

// Master reducer concept inspired by @Retolements
// http://www.code-experience.com/problems-with-flux/
export default (reduction, action) => {
  const type = action.type;
  const payload = action.payload;

  switch (type) {
    case Actions.APPLICATION_MOUNTING:
      return SithLoadingReducer.applicationMounting(reduction, payload);
    break;
    case Actions.SITH_LOADING_STARTED:
      return SithLoadingReducer.sithLoadingStarted(reduction, payload);
    break;
    case Actions.SITH_LOADED:
      return reduction.withMutations(mutableReduction => {
        mutableReduction.update(r => SithLoadingReducer.sithLoaded(r, payload));
        mutableReduction.update(r => PlanetReducer.checkObiwanSpottedSith(r));
        mutableReduction.update(r => SithLoadingReducer.triggerSithLoading(r));
        mutableReduction.update(r => SithLoadingReducer.cancelAnyRequestIfObiwanSpottedSith(r));
        mutableReduction.update(r => ScrollingReducer.enableOrDisableControlButtons(r));
      });
    break;
    case Actions.SCROLLED_UP:
      return reduction.withMutations(mutableReduction => {
        if (!mutableReduction.getIn(Queries.disabledUp)) {
          mutableReduction.update(r => SithLoadingReducer.cancelRequestsBeforeScrollUp(r));
          mutableReduction.update(r => ScrollingReducer.scrollUp(r));
          mutableReduction.update(r => PlanetReducer.checkObiwanSpottedSith(r));
          mutableReduction.update(r => SithLoadingReducer.triggerSithLoading(r));
          mutableReduction.update(r => SithLoadingReducer.cancelAnyRequestIfObiwanSpottedSith(r));
          mutableReduction.update(r => ScrollingReducer.enableOrDisableControlButtons(r));
        }
      });
    break;
    case Actions.SCROLLED_DOWN:
      return reduction.withMutations(mutableReduction => {
        if (!mutableReduction.getIn(Queries.disabledDown)) {
          mutableReduction.update(r => SithLoadingReducer.cancelRequestsBeforeScrollDown(r));
          mutableReduction.update(r => ScrollingReducer.scrollDown(r));
          mutableReduction.update(r => PlanetReducer.checkObiwanSpottedSith(r));
          mutableReduction.update(r => SithLoadingReducer.triggerSithLoading(r));
          mutableReduction.update(r => SithLoadingReducer.cancelAnyRequestIfObiwanSpottedSith(r));
          mutableReduction.update(r => ScrollingReducer.enableOrDisableControlButtons(r));
        }
      });
    break;
    case Actions.PLANET_CHANGED:
      return reduction.withMutations(mutableReduction => {
        mutableReduction.update(r => PlanetReducer.planetChanged(r, payload));
        mutableReduction.update(r => PlanetReducer.checkObiwanSpottedSith(r));
        mutableReduction.update(r => SithLoadingReducer.triggerSithLoading(r));
        mutableReduction.update(r => SithLoadingReducer.cancelAnyRequestIfObiwanSpottedSith(r));
        mutableReduction.update(r => ScrollingReducer.enableOrDisableControlButtons(r));
      });
    break;
    default:
      console.warn(`Unhandled action ${type}`);
      return reduction;
  }
};