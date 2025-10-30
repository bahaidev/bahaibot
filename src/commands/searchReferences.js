// These should map to keywords in `searchEngines.js`.
// Note that because the search value matches are greedy, a longer
//   match like `Aqdas par` must come before `Aqdas` or otherwise,
//   the latter will always be matched.

export const searchReferences = [
  {
    reference: 'Aqdas par',
    keyword: 'kap'
  },
  {
    reference: 'Aqdas',
    keyword: 'ka'
  }
];
