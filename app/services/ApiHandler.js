'use strict';

import { create } from 'apisauce';

const APPLICATION_TYPE_JSON = 'application/json';
const APPLICATION_TYPE_HTML = 'text/html';

/**
 * @param url
 * @param contentType
 * @returns {*}
 */
const createApi = (url, contentType) => {
  return create({
    baseURL: url,
    headers: {
      Accept: contentType,
      'Content-Type': contentType
    }
  });
};

/**
 *
 * @param url
 * @param path
 * @param successCallback
 * @param errorCallback
 * @returns {Promise<void>}
 */
export const sendRequestForJson = async (
  url,
  path,
  successCallback,
  errorCallback
) => {
  let api = createApi(url, APPLICATION_TYPE_JSON);
  api.get(path).then(response => {
    if (response.ok === true) {
      successCallback(response.data);
    } else {
      errorCallback({
        code: response.problem,
        originalError: response.originalError
      });
    }
  });
};

export const sendRequestForHtml = async (
  url,
  path,
  successCallback,
  errorCallback
) => {
  let api = createApi(url, APPLICATION_TYPE_HTML);
  api.get(path).then(response => {
    console.log('RESPONSE: ', response);
    if (response.ok === true) {
      successCallback(response.data);
    } else {
      errorCallback({
        code: response.problem,
        originalError: response.originalError
      });
    }
  });
};
