import { withAuthRedirect } from './authRedirect'


export const fetchGet = withAuthRedirect(async (link) => {
  try {
    const response = await fetch(link, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    let data = await response.json();

    return data
  } catch (error) {
    console.log('Query error', error)
  }
});
