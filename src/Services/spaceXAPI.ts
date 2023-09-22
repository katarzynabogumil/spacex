import { Launch } from '../Interfaces/Launch';

type Query = {
  upcoming?: boolean,
  success?: boolean
}

const BASE_URL = 'https://api.spacexdata.com/v5/launches/query';

const CONFIG = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
};

const OPTIONS = {
  query: {},
  options: {
    sort: {
      name: 'asc',
    },
    pagination: false,
    populate: [
      'rocket',
      'launchpad',
      'crew.crew',
    ]
  },
};

/**
 * API call for all launched data, populated with additional data for rocket, launchpads and crew. 
 */

function getAllLaunches(): Promise<{ docs: Launch[] }> {
  return fetchRequest('', {
    ...CONFIG,
    body: JSON.stringify(OPTIONS)
  });
}

/**
 * API call for data for one launch based on its id. 
 */

function getLaunch(id: string): Promise<{ docs: Launch[] }> {
  return fetchRequest('', {
    ...CONFIG,
    body: JSON.stringify({
      ...OPTIONS,
      query: {
        _id: id
      }
    })
  });
}

/**
 * API call for filtered launch data in three categories: upcoming, successful and failed. 
 */

function getFilteredLaunches(filter: string): Promise<{ docs: Launch[] }> {
  let query: Query = {};
  switch (filter) {
    case ('upcoming'):
      query = { upcoming: true };
      break;
    case ('successful'):
      query = { success: true };
      break;
    case ('failed'):
      query = { success: false };
      break;
    default:
      query = {};
      break;
  }

  return fetchRequest('', {
    ...CONFIG,
    body: JSON.stringify({
      ...OPTIONS,
      query
    })
  });
}

/**
 * Helper fetching function with global error handler. 
 */

function fetchRequest<TResponse>(
  url: string,
  config: RequestInit
): Promise<TResponse> {
  return fetch(`${BASE_URL}/${url}`, config)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch((err) => {
      console.log(`${err.message} while fetching /${url}`)
    });
};

export { getAllLaunches, getLaunch, getFilteredLaunches };