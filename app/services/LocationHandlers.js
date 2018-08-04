'use strict';

import GeoLocation from 'react-native-geolocation-service';

const GEO_LOCATION_CONFIGURATION = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 10000
};

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
