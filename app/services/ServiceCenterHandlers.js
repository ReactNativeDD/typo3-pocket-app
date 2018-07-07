'use strict';

import { sendRequestForJson } from './ApiHandler';
import { getDistance } from './GeoDistanceHandlers';
import { URL_STATICS } from '../statics';

const sortByDistanceAsc = array => {
  return array.sort(function(a, b) {
    return b.distance > a.distance ? -1 : b.distance < a.distance ? 1 : 0;
  });
};

/**
 * @param callback
 * @returns {Promise<void>}
 */
export const getAllServiceCenter = async (successCallback, errorCallback) => {
  sendRequestForJson(
    URL_STATICS.serviceCenter.url,
    URL_STATICS.serviceCenter.path,
    successCallback,
    errorCallback
  );
};

export const filterByLocation = (allServiceCenters, location, callback) => {
  let filteredServiceCenters = allServiceCenters.filter(servicecenter => {
    if (getDistance(servicecenter.location, location) < 100) {
      servicecenter.distance = Number.parseInt(
        getDistance(servicecenter.location, location)
      );

      return servicecenter;
    }

    return null;
  });

  callback(sortByDistanceAsc(filteredServiceCenters));
};
