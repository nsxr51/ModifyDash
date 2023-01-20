/* eslint-disable eqeqeq */
import authHeader from '../helpers/auth-header'

import { baseService } from './base.service'

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
}

const BASE_URL = baseService.geturl()
function login (username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    }

    return fetch(BASE_URL + '/api/Auth/login', requestOptions)
        .then(result => baseService.handleResponse(result))
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user))
            }

            return user
        })
}

function logout () {
    baseService.logout()
}

function register (user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    }

    return fetch(BASE_URL + '/users/register', requestOptions).then(baseService.handleResponse())
}

function getAll () {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    }

    return fetch(BASE_URL + '/users', requestOptions).then(baseService.handleResponse())
}

function getById (id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    }

    return fetch(BASE_URL + `/users/${id}`, requestOptions).then(baseService.handleResponse())
}

function update (user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    }

    return fetch(BASE_URL + `/users/${user.id}`, requestOptions).then(baseService.handleResponse())
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete (id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    }

    return fetch(BASE_URL + `/users/${id}`, requestOptions).then(baseService.handleResponse())
}
