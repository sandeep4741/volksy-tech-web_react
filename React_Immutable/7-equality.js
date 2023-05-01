import immutable from 'immutable';

export default function areMapsEqual(map1, map2) {
  return immutable.is(map1, map2);
}
