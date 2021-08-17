export const withAuthRedirect = actionCall => (link, index) => {
    return actionCall(link, index)
        .then(res => {
            if(res.status && res.status == 401) {
                localStorage.clear();
            }

            return res;
        })
        .catch(err => localStorage.clear())
}