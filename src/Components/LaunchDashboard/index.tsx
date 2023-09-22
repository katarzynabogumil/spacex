import { useState, useEffect, ChangeEvent } from 'react';

import LaunchList from '../LaunchList';
import Spinner from '../Spinner';
import searchicon from '../../Assets/searchicon.svg';

import * as SpaceXAPI from '../../Services/spaceXAPI';
import { fuseSearch } from '../../Services/fuseSearch';
import { Launch } from '../../Interfaces/Launch';

import './style.css';

/**
 * Container Component for the launches list and the search/ filter functionality.
 * Main App Route.
 */

function LaunchDashboard() {
  const [loading, setLoading] = useState(true);
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [searchedLaunches, setSearchedLaunches] = useState<Launch[]>([]);

  const OPTIONS = ['all', 'upcoming', 'successful', 'failed'];
  const [filter, setFilter] = useState(OPTIONS[0]); // eslint-disable-line 
  const [searchphrase, setSearchphrase] = useState('');

  useEffect(() => {
    SpaceXAPI.getAllLaunches()
      .then((data: {docs: Launch[]}) => {
        if (data) setLaunches(data.docs);
      })
      .then(() => setLoading(false));
  }, []);

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    let phrase = event?.target?.value || '';
    setSearchphrase(phrase);
    setSearchedLaunches(fuseSearch(phrase, launches));
  }

  function handleFilter(event: ChangeEvent<HTMLSelectElement>) {
    let chosen = event?.target?.value || '';
    setFilter(chosen);
    setSearchphrase('');

    setLoading(true);
    SpaceXAPI.getFilteredLaunches(chosen)
      .then((data: {docs: Launch[]}) => {
        if (data) setLaunches(data.docs);
      })
      .then(() => setLoading(false));
  }

  return (
    <>
      <div className="navbar">
        <img className="search-icon" src={searchicon} alt="search icon"/>
        <input 
          className="search-bar input" 
          type='text' 
          name='title' 
          value={searchphrase} 
          onChange={handleSearch}
          data-testid="search-bar"
        />
        <select className="select-bar input" onChange={handleFilter} data-testid="filter-bar">
          {OPTIONS.map(opt => <option value={opt} key={opt}>{opt[0].toUpperCase()+opt.substring(1)}</option>)}
        </select>
      </div>
      <div className="launch-dashboard" data-testid="launch-dashboard">
          {!loading ? 
              <LaunchList launches={searchedLaunches.length ? searchedLaunches : launches} />
            : (
              <Spinner />
          )}
      </div>
    </>
  );
};

export default LaunchDashboard;
