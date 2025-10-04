'use client';

// Static admin credentials
const ADMIN_CREDENTIALS = {
  email: 'touta@ieee.org',
  password: 'Touta2025'
};

export const validateAdminCredentials = (email: string, password: string): boolean => {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
};

export const setAdminSession = (): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('isAdminAuthenticated', 'true');
    sessionStorage.setItem('adminEmail', ADMIN_CREDENTIALS.email);
    sessionStorage.setItem('adminLoginTime', Date.now().toString());
  }
};

export const clearAdminSession = (): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('isAdminAuthenticated');
    sessionStorage.removeItem('adminEmail');
    sessionStorage.removeItem('adminLoginTime');
  }
};

export const isAdminAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
  const loginTime = sessionStorage.getItem('adminLoginTime');
  
  if (!isAuthenticated || !loginTime) return false;
  
  // Session expires after 8 hours
  const EIGHT_HOURS = 8 * 60 * 60 * 1000;
  const now = Date.now();
  const sessionAge = now - parseInt(loginTime);
  
  if (sessionAge > EIGHT_HOURS) {
    clearAdminSession();
    return false;
  }
  
  return isAuthenticated === 'true';
};

export const getAdminEmail = (): string | null => {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('adminEmail');
};