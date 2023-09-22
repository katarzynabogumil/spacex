import LaunchItem from '../LaunchItem';
import { Launch } from '../../Interfaces/Launch';

import './style.css';

interface Launches {
  /** List of all launches (filtered) to display. */
  launches: Launch[]
}

/**
 * Presentational component for the launches list.
 */

function LaunchList ({ launches }: Launches) {
  return (
    <div className="launch_list_container" data-testid="launch_list_container">
      {launches && (
        launches.map((launch: Launch) => (
          <LaunchItem key={launch.id} launch={launch}/>
        ))
      )}
    </div>
  );
};

export default LaunchList;
