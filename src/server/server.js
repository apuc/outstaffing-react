export const fetchProfile = async (link, index) => {
  try {
    const response = await fetch(`${link}${index}`)
    let data = await response.json()

    return data
  } catch (error) {}
}

export const fetchSkills = async (link) => {
  try {
    const response = await fetch(link)
    let data = await response.json()

    return data
  } catch (error) {}
}

export const fetchItemsForId = async (link, id) => {
  try {
    const response = await fetch(`${link}${id}`)
    let data = await response.json()

    return data
  } catch (error) {}
}

export const fetchForm = async (link, info) => {
  try {
    const response = await fetch(link, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: info
    })

    return response
  } catch (error) {}
}

export const fetchAuth = async ({ username, password, dispatch }) => {
  try {
    const response = await fetch(
      'https://guild.craft-group.xyz/api/user/login',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
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
