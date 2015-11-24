import { $AppState } from './state'
import * as M from './model'

export function up (n: number) {
  $AppState.swap(M.up, n);
}

export function down (n: number) {
  $AppState.swap(M.down, n);
}

export function completeSithRequest (id: number, sith: M.LocalSith) {
  $AppState.swap(M.newLocalSith, id, sith);
}

export function changeWorld (world: M.Homeworld) {
  $AppState.swap(M.newWorld, world);
}
