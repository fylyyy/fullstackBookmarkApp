import { redirect } from "react-router-dom";

export function getAccessToken() {
    const token = localStorage.getItem('access_token');
    if (!token || token === 'undefined') {
        return null;
    }
    return token;
}

export function getRefreshToken() {
    const token = localStorage.getItem('refresh_token');
    if (!token || token === 'undefined') {
        return null;
    }
    return token;
}

export function tokenLoader() {
    return getAccessToken()
}

export function checkAuthLoader() {
    const token = getAccessToken();
    
    if (!token) {
      return redirect('/auth');
    }
   
    return null;
}