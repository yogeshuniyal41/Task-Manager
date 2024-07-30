// tokenUtils.js
export function setAccessToken(accessToken) {
   return localStorage.setItem('accessToken', accessToken);
    
}
export function setRefreshToken( refreshToken) {
    
    return localStorage.setItem('refreshToken', refreshToken);
}
export function setUser( user) {
    
    return localStorage.setItem('user', user);
}
export function setName( name) {
    
    return localStorage.setItem('name', name);
}


export function getAccessToken() {
    return localStorage.getItem('accessToken');
}

export function getRefreshToken() {
    return localStorage.getItem('refreshToken');
}

export function getUser() {
    
    return localStorage.getItem('user');
}

export function getName() {
    
    return localStorage.getItem('name');
}

export function removeTokens() {
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('name');
}
