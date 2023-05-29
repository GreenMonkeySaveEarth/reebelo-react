let _csrfToken = null;

const getCsrfToken = async () => {
  if (_csrfToken === null) {
    const response = await fetch(`/csrf`, {
      credentials: 'include',
    });
    const data = await response.json();
    _csrfToken = data.csrfToken;
  }
  return _csrfToken;
}

function getHeader(CSRF_TOKEN) {
    return {headers:{ 
        'X-CSRFToken': CSRF_TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }}
}

export { getCsrfToken, getHeader}