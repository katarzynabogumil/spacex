import LaunchItem from '../LaunchItem';
import { Launch } from '../../Interfaces/Launch';

import './style.css';

interface Launches {
  launches: Launch[]
}

function LaunchList ({ launches }: Launches) {
  return (
    <div className="launch_list_container" data-testid="launch_list_container">
      {launches && (
        launches.map((launch: Launch) => (
          <LaunchItem key={launch.id} launch={launch} />
        ))
      )}
    </div>
  );
};

export default LaunchList;
