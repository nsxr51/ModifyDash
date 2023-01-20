import authHeader from '../helpers/auth-header'
import { baseService } from './base.service'

export const dataService = {
    getPoints,
    getBoxData,
    GetDataPointChart,
    getZpnesByPoint,
    getTypesByPoint,
    GetMainRoutes,
}
const BASE_URL = baseService.geturl()

function getPoints () {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    }
    return fetch(BASE_URL + '/api/Points', requestOptions)
    .then(res => baseService.handleResponse(res))
    .then(data => {
        return data
    })
}
function getZpnesByPoint (pointName) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    }
    return fetch(BASE_URL + `/api/zones?boxName=${pointName}`, requestOptions)
    .then(res => baseService.handleResponse(res))
    .then(data => {
        return data
    })
}
function getTypesByPoint (pointName) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    }
    return fetch(BASE_URL + `/api/types?boxName=${pointName}`, requestOptions)
    .then(res => baseService.handleResponse(res))
    .then(data => {
        return data
    })
}

function getBoxData (boxName) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    }
    return fetch(BASE_URL + `/api/DataPoints?boxName=${boxName}`, requestOptions)
    .then(res => baseService.handleResponse(res))
    .then(data => {
        return data
    })
}

function GetDataPointChart (bodyparms) {
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(bodyparms),
        headers: authHeader(),
    }

    return fetch(BASE_URL + '/api/DataPointChart', requestOptions)
    .then(res => baseService.handleResponse(res))
    .then(data => {
        return data
    }).catch(() => { return [] })
}

function GetMainRoutes () {
    const requestOptions = {
      method: 'GET',
      headers: authHeader(),
  }
  return fetch(BASE_URL + '/api/mainRoutes', requestOptions)
  .then(res => baseService.handleResponse(res))
  .then(data => {
      return data
  }).catch(() => { return [] })
}
