import { Rocket } from './Rocket';
import { Launchpad } from './Launchpad';
import { Crew } from './Crew';

export interface Launch {
  fairings: Fairings | null;
  links: Links;
  static_fire_date_utc: Date | null;
  static_fire_date_unix: number | null;
  net: boolean;
  window: number | null;
  rocket: Rocket;
  success: boolean | null;
  failures: Failure[];
  details: null | string;
  crew: CrewObj[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  launchpad: Launchpad;
  flight_number: number;
  name: string;
  date_utc: Date;
  date_unix: number;
  date_local: Date;
  date_precision: DatePrecision;
  upcoming: boolean;
  cores: Core[];
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: null | string;
  id: string;
}

export interface Core {
  core: null | string;
  flight: number | null;
  gridfins: boolean | null;
  legs: boolean | null;
  reused: boolean | null;
  landing_attempt: boolean | null;
  landing_success: boolean | null;
  landing_type: LandingType | null;
  landpad: Landpad | null;
}

export enum LandingType {
  Asds = "ASDS",
  Ocean = "Ocean",
  Rtls = "RTLS",
}

export enum Landpad {
  The5E9E3032383Ecb267A34E7C7 = "5e9e3032383ecb267a34e7c7",
  The5E9E3032383Ecb554034E7C9 = "5e9e3032383ecb554034e7c9",
  The5E9E3032383Ecb6Bb234E7CA = "5e9e3032383ecb6bb234e7ca",
  The5E9E3032383Ecb761634E7Cb = "5e9e3032383ecb761634e7cb",
  The5E9E3032383Ecb90A834E7C8 = "5e9e3032383ecb90a834e7c8",
  The5E9E3033383Ecb075134E7CD = "5e9e3033383ecb075134e7cd",
  The5E9E3033383Ecbb9E534E7Cc = "5e9e3033383ecbb9e534e7cc",
}

export interface CrewObj {
  crew: Crew;
  role: string;
}

export enum DatePrecision {
  Day = "day",
  Hour = "hour",
  Month = "month",
}

export interface Failure {
  time: number;
  altitude: number | null;
  reason: string;
}

export interface Fairings {
  reused: boolean | null;
  recovery_attempt: boolean | null;
  recovered: boolean | null;
  ships: string[];
}

export interface Links {
  patch: Patch;
  reddit: Reddit;
  flickr: Flickr;
  presskit: null | string;
  webcast: null | string;
  youtube_id: null | string;
  article: null | string;
  wikipedia: null | string;
}

export interface Flickr {
  small: any[];
  original: string[];
}

export interface Patch {
  small: null | string;
  large: null | string;
}

export interface Reddit {
  campaign: null | string;
  launch: null | string;
  media: null | string;
  recovery: null | string;
}