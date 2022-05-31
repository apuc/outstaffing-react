export const withAuthRedirect =
  (actionCall) =>
  ({ link, params, history, role, logout, body }) => {
    const linkWithParams = params
      ? `${link}?${new URLSearchParams(params)}`
      : link
    return actionCall(linkWithParams, body)
      .then((res) => {
        if (res.status && res.status === 401) {
          localStorage.clear()
          logout && logout()
          history.push(role === 'ROLE_DEV' ? '/authdev' : '/auth')
        }

        return res
      })
      .catch((err) => {
        localStorage.clear()
        logout && logout()
        history.push(role === 'ROLE_DEV' ? '/authdev' : '/auth')
      })
  }
