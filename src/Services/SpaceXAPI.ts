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
    pagination: false,
    populate: [
      'rocket',
      'launchpad',
    ]
  },
};

function getAllLaunches(): Promise<{ docs: Launch[] }> {
  return fetchRequest('', {
    ...CONFIG,
    body: JSON.stringify(OPTIONS)
  });
}

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

function getLaunches(filter: string): Promise<{ docs: Launch[] }> {
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

export { getAllLaunches, getLaunch, getLaunches };