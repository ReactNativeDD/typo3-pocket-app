'use strict';

import GeoLocation from 'react-native-geolocation-service';
import { GEO_LOCATION_CONFIGURATION, URL_STATICS } from '../statics';
import { sendRequestForJson } from './ApiHandler';

/**
 * @param url
 * @param path
 * @param callback
 * @returns {Promise<void>}
 */
export const determineCurrentLocation = async (
  successCallback,
  errorCallback
) => {
  GeoLocation.getCurrentPosition(
    position => {
      successCallback(position);
    },
    error => {
      errorCallback(error);
    },
    GEO_LOCATION_CONFIGURATION
  );
};

export const determineLocationBySearch = async (searchWord, callback) => {
  sendRequestForJson(
    'https://nominatim.openstreetmap.org/',
    '/search/' + searchWord + '?format=json&limit=1&countrycodes=de',
    callback
  );
};
