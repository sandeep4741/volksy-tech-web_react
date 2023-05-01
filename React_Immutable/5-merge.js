import immutable from 'immutable';

export const concatElements = (page1, page2) => immutable.List(page1).concat(immutable.List(page2));
export const mergeElements = (page1, page2) => immutable.Map(page1).merge(immutable.Map(page2));
