'use strict';

import React from 'react';

export const getDistance = (from, to) => {
  let distanceX = 71.5 * (from.longitude - to.longitude);
  let distanceY = 111.3 * (from.latitude - to.latitude);
  let distanceInKm = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  let factor = Math.pow(10, 2);

  return Math.round(distanceInKm * factor) / factor;
};
