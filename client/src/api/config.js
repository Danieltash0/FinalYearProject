// Uses the CRA proxy in development (see "proxy" in package.json)
export const API_BASE = process.env.REACT_APP_API_URL || '/api';

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });

  let data = null;
  try {
    data = await response.json();
  } catch (e) {
    /* empty body */
  }

  if (!response.ok) {
    // Expired or invalid token: clear the session so the user is sent to login
    if (response.status === 401 && localStorage.getItem('token')) {
      localStorage.removeItem('token');
      localStorage.removeItem('dairydan_user');
      window.dispatchEvent(new Event('auth:expired'));
    }
    throw new Error((data && data.error) || `Request failed (${response.status})`);
  }
  return data;
};
