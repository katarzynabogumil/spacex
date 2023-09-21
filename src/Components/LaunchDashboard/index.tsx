import { useState, useEffect, ChangeEvent, ChangeEventHandler } from 'react';

// import Navbar from './Components/Navbar';
import LaunchList from '../LaunchList';
import Spinner from '../Spinner';
import searchicon from '../../Assets/searchicon.svg';

import * as SpaceXAPI from '../../Services/SpaceXAPI';
import { Launch } from '../../Interfaces/Launch';

import './style.css';

function LaunchDashboard() {
  const [loading, setLoading] = useState(true);
  const [launches, setLaunches] = useState<Launch[]>([]);

  const OPTIONS = ['all', 'upcoming', 'successful', 'failed'];
  const [filter, setFilter] = useState(OPTIONS[0]);
  const [searchphrase, setSearchphrase] = useState('');

  useEffect(() => {
    SpaceXAPI.getAllLaunches()
      .then((data: {docs: Launch[]}) => setLaunches(data.docs))
      .then(() => setLoading(false));
  }, []);

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearchphrase(event?.target?.value || '');
    // handle search
  }

  function handleFilter(event: ChangeEvent<HTMLSelectElement>) {
    let chosen = event?.target?.value || '';
    setFilter(chosen);

    setLoading(true);
    SpaceXAPI.getLaunches(chosen)
      .then((data: {docs: Launch[]}) => setLaunches(data.docs))
      .then(() => setLoading(false));
  }

  return (
    <>
      <div className="navbar">
        <img className="search-icon" src={searchicon} alt="search icon" data-testid="navbar_search_icon"/>
        <input 
          className="search-bar input" 
          type='text' 
          name='title' 
          value={searchphrase} 
          onChange={handleSearch}
        />
        <select className="select-bar input" onChange={handleFilter}>
          {OPTIONS.map(opt => <option value={opt}>{opt[0].toUpperCase()+opt.substring(1)}</option>)}
        </select>
      </div>
      <div className="launch-dashboard">
          {!loading ? 
              <LaunchList launches={launches} />
            : (
              <Spinner />
          )}
      </div>
    </>
  );
};

export default LaunchDashboard;
