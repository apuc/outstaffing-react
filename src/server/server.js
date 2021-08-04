export const fetchProfile = async (link, index) => {
  try {
    const response = await fetch(`${link}${index}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    })
    let data = await response.json()

    return data
  } catch (error) {}
}

export const fetchSkills = async (link) => {
  try {
    const response = await fetch(link, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    })
    let data = await response.json()

    return data
  } catch (error) {}
}

export const fetchItemsForId = async (link, id) => {
  try {
    const response = await fetch(`${link}${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    })
    let data = await response.json()

    return data
  } catch (error) {}
}

export const fetchForm = async (link, info) => {
  try {
    const response = await fetch(link, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        'Content-Type': 'multipart/form-data'
      },
      body: info
    })

    return response
  } catch (error) {}
}

export const fetchAuth = async ({ username, password, dispatch }) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const apiURL = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(
      `${apiURL}/api/user/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': `${baseURL}`,
        },
        body: JSON.stringify({
          username,
          password
        })
      }
    )

    if(!response.ok) {
      return response.statusText;
    }

    response
      .json()
      .then((resJSON) => {
        localStorage.setItem('auth_token', resJSON.access_token)
        localStorage.setItem('access_token_expired_at', resJSON.access_token_expired_at)
        dispatch();
      })
  } catch (error) {
    console.error('Error occured: ', error)
  }
}
