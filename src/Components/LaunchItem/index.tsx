import { Link } from 'react-router-dom';
import { Launch } from '../../Interfaces/Launch';

import './style.css';

interface LaunchProps {
  /** Launch data to display. */
  launch: Launch
}

/**
 * Presentational component for a single launch.
 */

function LaunchItem ({ launch }: LaunchProps) {
  return (
    <div 
      className="launch-container"
      data-testid="launch-container"
    >
      <Link to={"/launch/"+launch.id}>
          {launch.links.patch.small ? <img
            className="launch-img"
            alt="launch patch"
            src={
              launch.links.patch.small 
            }
          /> : <div className="background" data-testid="img-fallback"></div>}
          <div className="launch-name">
            <h3>{launch.name}</h3>
          </div>
      </Link>
    </div>
  );
};

export default LaunchItem;
