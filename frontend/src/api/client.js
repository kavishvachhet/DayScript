const API_BASE = '';

function getToken() {
  return localStorage.getItem('scholar_bites_token');
}

async function request(url, options = {}) {
  const token = getToken();
  const headers = {
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return { ok: true, status: 204, data: null };
  }

  const contentType = response.headers.get('content-type');
  let data;

  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem('scholar_bites_token');
      window.location.href = '/login';
    }
    const error = new Error(typeof data === 'string' ? data : 'Request failed');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return { ok: true, status: response.status, data };
}

// ─── Public ────────────────────────────────────────────
export function login(username, password) {
  return request('/public/login', {
    method: 'POST',
    body: { username, password },
  });
}

export function register(user) {
  return request('/public/create-user', {
    method: 'POST',
    body: user,
  });
}

// ─── Journal ───────────────────────────────────────────
export function getJournalEntries() {
  return request('/journal');
}

export function getJournalEntry(id) {
  return request(`/journal/id/${id}`);
}

export function createJournalEntry(entry) {
  return request('/journal', {
    method: 'POST',
    body: entry,
  });
}

export function updateJournalEntry(id, entry) {
  return request(`/journal/id/${id}`, {
    method: 'PUT',
    body: entry,
  });
}

export function deleteJournalEntry(id) {
  return request(`/journal/id/${id}`, {
    method: 'DELETE',
  });
}

// ─── User ──────────────────────────────────────────────
export function getUserInfo() {
  return request('/user');
}

export function updateUser(user) {
  return request('/user', {
    method: 'PUT',
    body: user,
  });
}

export function deleteUser() {
  return request('/user', {
    method: 'DELETE',
  });
}

export function getWeatherGreeting() {
  return request('/user/external-api');
}

// ─── Admin ─────────────────────────────────────────────
export function getAllUsers() {
  return request('/admin/all-users');
}

export function createAdminUser(user) {
  return request('/admin/create-admin-user', {
    method: 'POST',
    body: user,
  });
}

export function clearCache() {
  return request('/admin/clear-cache');
}
