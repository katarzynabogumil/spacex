import Fuse from 'fuse.js'
import { Launch } from '../Interfaces/Launch';

/**
 * Helper search function, accommodation fuzzy search using Fuse.js library. 
 */

function fuseSearch(searchphrase: string, list: Launch[]): Launch[] {
  const fuseOptions = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: [
      "name",
      "rocket.name",
      "launchpad.name",
      "crew.crew.name",
    ]
  };

  const fuse = new Fuse(list, fuseOptions);
  return fuse.search(searchphrase)
    .map(res => res.item);
}

export { fuseSearch };