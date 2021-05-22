export const JWT_COOKIE = 'token';
export const METAMASK_ADDRESS_COOKIE = 'metamask_address';
export const USER_ID_COOKIE = 'id';

export const readCookie = (name: string): string | null => {
  if (!name) return null;
  const nameEQ = name + '=';
  const cookies = document.cookie.split(';');
  for (let c of cookies) {
    c = c.trim();
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
};

export const createCookie = (name: string, value: string, days: number): void => {
  let expires = '';
  const dayInMs = 24 * 60 * 60 * 1000;
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * dayInMs);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + value + expires + '; path=/';
};

export const eraseCookie = (name: string): void => {
  createCookie(name, '', -1);
};

export const isInLoginAsMode = (): boolean => !!readCookie(JWT_COOKIE);

export const eraseAllCookies = (): void => {
  eraseCookie(JWT_COOKIE);
  eraseCookie(METAMASK_ADDRESS_COOKIE);
  eraseCookie(USER_ID_COOKIE);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createLoginAsCookies = (user: any): void => {
  createCookie(JWT_COOKIE, user.token, 1);
  createCookie(METAMASK_ADDRESS_COOKIE, user.metamask_address, 1);
  createCookie(USER_ID_COOKIE, user.id, 1);
};

export const eraseLoginAsCookies = (): void => {
  eraseCookie(JWT_COOKIE);
  eraseCookie(METAMASK_ADDRESS_COOKIE);
  eraseCookie(USER_ID_COOKIE);
};
