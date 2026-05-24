let csrfToken = sessionStorage.getItem('portfolio.csrf') || '';

export const getCsrfToken = () => csrfToken || sessionStorage.getItem('portfolio.csrf') || '';

export const setCsrfToken = (value = '') => {
  csrfToken = value;

  if (value) {
    sessionStorage.setItem('portfolio.csrf', value);
    return;
  }

  sessionStorage.removeItem('portfolio.csrf');
};

export const clearCsrfToken = () => setCsrfToken('');