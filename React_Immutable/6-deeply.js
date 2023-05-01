import immutable from 'immutable';

export default function mergeDeeplyElements(page1, page2) {
  return immutable.Map(page1).mergeDeep(immutable.Map(page2));
}
