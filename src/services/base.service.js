/* eslint-disable eqeqeq */
export const baseService = {
    logout,
    handleResponse,
    geturl,
}

function handleResponse (response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout()
                location.reload(true)
            }

            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }

        return data
    })
}

function logout () {
    // remove user from local storage to log user out
    localStorage.removeItem('user')
}

function geturl () {
    if (process.env.NODE_ENV != 'production') {
        return 'http://20.238.101.170'
    } else {
        return ''
    }
}
