// apiUtils.js
import { getAccessToken, getRefreshToken, setAccessToken , setRefreshToken } from './utils';

// Function to make an API request with the access token in the header
export async function apiRequest(url, options = {}) {
    const accessToken = getAccessToken();
    
    // Add the access token to the headers
    const headers = options.headers || {};
    headers['Authorization'] = `Bearer ${accessToken}`;
    options.headers = headers;
    
    // Make the API request
    const response = await fetch(url, options);
    
    // If the response status is 401 (unauthorized), attempt to refresh the access token
    if (response.status === 401) {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
            // Try to refresh the access token using the refresh token
            const newTokens = await refreshAccessToken(refreshToken);
            
            if (newTokens) {
                // Store the new access token and retry the original request
                setAccessToken(newTokens.accessToken)
                setRefreshToken(newTokens.refreshToken)
                headers['Authorization'] = `Bearer ${newTokens.accessToken}`;
                return fetch(url, options);
            }
        }
    }
    
    return response;
}

// Function to refresh the access token using the refresh token
async function refreshAccessToken(refreshToken) {
    const response = await fetch('http://localhost:3000/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( {token:refreshToken} ),
    });
   
    if (response.ok) {
        const data = await response.json();
        return data
    } else {
        console.error('Failed to refresh access token');
        return null;
    }
}
