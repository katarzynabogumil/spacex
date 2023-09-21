import { Link } from 'react-router-dom';
import { Launch } from '../../Interfaces/Launch';

import './style.css';

interface LaunchProps {
  launch: Launch
}

function LaunchItem ({ launch }: LaunchProps) {
  return (
    <div 
      className="launch_container"
      data-testid="launch_container"
    >
      <Link to={"/launch/"+launch.id}>
          {launch.links.patch.small ? <img
            className="launch_img"
            alt="launch patch"
            src={
              launch.links.patch.small 
            }
          /> : <div className="background"></div>}
          <div className="launch_name">
            <h3>{launch.name}</h3>
          </div>
      </Link>
    </div>
  );
};

export default LaunchItem;
