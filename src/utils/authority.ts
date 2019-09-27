// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem('antd-pro-authority');
}

export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', authority);
}

function remeberUserName(autoLogin, username) {
  if (autoLogin) localStorage.setItem('suposUserName', username);
  else localStorage.removeItem('suposUserName');
}

export function loginActions(loginDetails, loginRes) {
  remeberUserName(loginDetails.autoLogin, loginDetails.username);
  localStorage.setItem('ticket', loginRes.ticket);

  if (loginRes.status === 'firstLogin') {
    localStorage.setItem('isFirstLogin', 'yes');
  }
}

export function isAdmin(loginRes) {
  if (loginRes) {
    return loginRes.userId === 1 ? 'admin' : 'user';
  } else {
    return 'guest';
  }
}
