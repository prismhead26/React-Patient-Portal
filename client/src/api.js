const API_URL = 'http://localhost:3001';

export const fetchPhysicians = async () => {
  const response = await fetch(`${API_URL}/physicians`);
  return response.json();
};

export const fetchPatients = async (token) => {
  const response = await fetch(`${API_URL}/mypatients`, {
    headers: { 'Authorization': token }
  });
  return response.json();
};

export const createUser = async (user, endpoint) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  return response.json();
};
