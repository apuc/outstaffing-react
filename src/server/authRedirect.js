export const withAuthRedirect = actionCall => ({link, index, history, role}) => {
    return actionCall(link, index)
        .then(res => {
            if(res.status && res.status == 401) {
                localStorage.clear();
                history.push(role === 'ROLE_DEV' ? '/authdev' : '/auth') 
            }

            return res;
        })
        .catch(err => { 
            localStorage.clear(); 
            history.push(role === 'ROLE_DEV' ? '/authdev' : '/auth');
        })
}