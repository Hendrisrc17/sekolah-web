import { getIdToken, logoutAdmin } from './auth.js';

export async function api(path, options = {}) {
  const token = await getIdToken();
  const response = await fetch(`/api${path}`, { headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) }, ...options });
  const body = await response.json().catch(() => ({}));
  if (response.status === 401) { await logoutAdmin(); window.location.assign('/admin/login'); }
  if (!response.ok || body.success === false) throw new Error(body.error?.message || 'Permintaan gagal.');
  return body.data;
}
