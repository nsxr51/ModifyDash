export default function authHeader () {
    // return authorization header with jwt token
    const user = JSON.parse(localStorage.getItem('user'))

    if (user && user.data.token) {
        return {
            Authorization: 'Bearer ' + user.data.token,
            'Content-Type': 'application/json',
            accept: 'text/plain,application/json',
}
    } else {
        return {}
    }
}
