function thereIsAMatch(state) {
  return !state.list.every(s => s === null || !s.matched)
}

function firstSithHasMaster(state) {
  const valids = state.list.filter(s => s !== null)
  const firstValid = valids[0]
  return firstValid && firstValid.master.id !== null
}

function lastSithHasApprentice(state) {
  const valids = state.list.filter(s => s !== null)
  const lastValid = valids.slice().reverse()[0]
  return lastValid && lastValid.apprentice.id !== null
}

export default {thereIsAMatch, firstSithHasMaster, lastSithHasApprentice}
