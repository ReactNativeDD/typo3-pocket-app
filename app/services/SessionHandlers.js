'use strict';

/**
 * @param key
 * @param value
 */
export const setValueByKey = (key, value) => {
  if (typeof global.sessionValues === 'undefined') {
    global.sessionValues = [];
  }

  global.sessionValues[key] = value;
};

/**
 * @param key
 * @returns {*}
 */
export const getValueByKey = key => {
  if (typeof global.sessionValues === 'undefined') {
    return null;
  }

  return global.sessionValues[key];
};
