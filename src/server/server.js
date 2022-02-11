import { withAuthRedirect } from './authRedirect'

export const fetchForm = withAuthRedirect(async (link, info) => {
  try {
    const response = await fetch(link, {
      method: 'POST',
      headers: {
        // 'Access-Control-Request-Headers': 'authorization',
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        Origin: `${process.env.REACT_APP_BASE_URL}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })

    return response
  } catch (error) {
    console.log('Query error', error)
  }
})

export const fetchAuth = async ({
  username,
  password,
  dispatch,
  catchError
}) => {
  const baseURL = process.env.REACT_APP_BASE_URL
  const apiURL = process.env.REACT_APP_API_URL
  try {
    const response = await fetch(`${apiURL}/api/user/login`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Access-Control-Request-Headers': 'authorization',
        'Content-Type': 'application/json',
        // Origin: `http://localhost`
      },
      body: JSON.stringify({
        username,
        password
      })
    })

    if (!response.ok) {
      catchError()
      return response.statusText
    }

    response.json().then((resJSON) => {
      localStorage.setItem('auth_token', resJSON.access_token)
      localStorage.setItem('id', resJSON.id)
      localStorage.setItem(
        'access_token_expired_at',
        resJSON.access_token_expired_at
      )
      dispatch(resJSON)
    })
  } catch (error) {
    console.error('Error occured: ', error)
  }
}

export const fetchReportList = withAuthRedirect(async (link) => {
  try {
    const response = await fetch(
      `https://guild.loc/api/reports/index?user_id=26&fromDate=2021-10-18`,
      // link,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      }
    )
    let data = await response.json()

    return data
  } catch (error) {
    console.log('Query error', error)
  }
})

export const fetchGet = withAuthRedirect(async (link) => {
  try {
    const response = await fetch(link, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
    })
    let data = await response.json()

    return data
  } catch (error) {
    console.log('Query error', error)
  }
})

export const fetchPost = withAuthRedirect(async (link, body) => {
  console.log('i',body)
  try {
    const response = await fetch(link, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        'Content-Type': 'application/json',
        Origin: `http://localhost`
      },
      body: JSON.stringify(body)
    })

    return response
  } catch (error) {
    console.log('Query error', error)
  }
})
