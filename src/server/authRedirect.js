export const withAuthRedirect = actionCall => ({link, index, history, role, logout}) => {
    return actionCall(link, index)
        .then(res => {
            if(res.status && res.status == 401) {
                localStorage.clear();
                logout();
                history.push(role === 'ROLE_DEV' ? '/authdev' : '/auth') ;
            }

            return res;
        })
        .catch(err => { 
            localStorage.clear();
            logout();
            history.push(role === 'ROLE_DEV' ? '/authdev' : '/auth');
        })
}