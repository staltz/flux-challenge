export const DOWN = 'DOWN';
export const OBI_WAN_MOVED = 'OBI_WAN_MOVED';
export const SITH_LOADED = 'SITH_LOADED';
export const UP = 'UP';

export const actionCreators = {
  onScrollDown: () => ({ type: DOWN }),
  onObiWanMoved: obi => ({ type: OBI_WAN_MOVED, payload: { obi } }),
  onSithLoaded: (sith, direction) =>
    ({ type: SITH_LOADED, payload: { sith, direction } }),
  onScrollUp: () => ({ type: UP }),
};
