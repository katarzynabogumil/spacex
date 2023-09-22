import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as SpaceXAPI from '../../Services/spaceXAPI';
import { dateFormatter } from '../../Services/dateFormatter';
import { Launch } from '../../Interfaces/Launch';

import './style.css';
import Spinner from "../Spinner";

/**
 * Component with detailed information about each launch.
 * Seperate App Route.
 */

function LaunchDetails () {
  let { id } = useParams();
  const [launch, setLaunch] = useState<Launch[]>([])
  const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

  useEffect(() => {
    SpaceXAPI.getLaunch(id || '')
      .then((data: {docs: Launch[]}) => {
        if (data) setLaunch(data.docs);
      })
      .then(() => setLoading(false));
  }, [id]);

  const image = launch[0]?.links.flickr.original.length > 0 ? <img
    className="launch_photo"
    alt="launch photograph"
    src={
      launch[0].links.flickr.original[0]
    }
  /> : <></>;

  return (
    <div className="launch-details-container">
      {!loading ? 
        (
          Object.keys(launch[0]).length > 0 &&
          (<div>
            <h2>              
              <span className="material-symbols-outlined arrow-back" onClick={() => navigate(-1)}>
                arrow_back
              </span>
              {launch[0].name}
            </h2>
            {image}
            <div className="launch-details">
              {launch[0].upcoming ? 
                (<>
                  <b>Upcoming: </b> Yes 
                </>) :
                (<>
                  <b>Launch date: </b> {dateFormatter(launch[0].date_local)}
                  <b>Success: </b> {launch[0].success ? 'Successful' : (<>
                    Not successful
                  <b>Details: </b> {launch[0].details} 
                  </>)}
                </>)
              }
              <b>Launchpad: </b> {launch[0].launchpad.name}
              <b>Region: </b> {launch[0].launchpad.region}
              <b>Rocket: </b> {launch[0].rocket.name}
              <b>Rocket decription: </b> {launch[0].rocket.description}
              {launch[0].crew.length > 0 ? <>
                <b>Crew: </b> {launch[0].crew.map(c => c.crew).join(', ')}
              </> : ''}
            </div>
          </div>
          )
        )
      : (
        <Spinner />
      )}
    </div>
  );
};

export default LaunchDetails;