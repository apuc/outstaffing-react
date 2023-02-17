export function createMarkup(text) {
  return {__html: text.split('</p>').join('</p>')}
}

export function transformHtml(text) {
  let startHtml = {__html: text.split('<h4> || <h3> || <h2> || <h1>').join('<br><h2>').split('<br>')};
  startHtml = startHtml.__html.filter((el) =>
      el !== null && el !== "" || el === 0
  );
  const finalHtml = startHtml.map((item) =>
      `<div class='experience__block'>
        <div class="summary__sections__head">
            <h3>Описание опыта работы</h3>
            <button>Редактировать раздел</button>
        </div>
        <div class="experience__content">${item.split('<h3>')[0]}</div>
       </div>`
  );
  return {__html: finalHtml.join('')}
}
//
// export const setToken = () => {
//   const url = new URL(window.location.href);
//   const urlT = url.searchParams.get("token");
//   urlT ? sessionStorage.setItem('token', 'Bearer ' + urlT) : '';
//   const tParam = urlT || sessionStorage.getItem('token');
//   return tParam ? {"Authorization": tParam} : false
//
// };

export const getToken = () => {
  const tParam =  `Bearer ${localStorage.getItem('auth_token')}`

  return tParam ? {Authorization: tParam} : {};
};

export const urlHasParams = (url) => url.indexOf('?') > 0 ? `${url}&${window.location.search.substr(1)}` : `${url}${window.location.search}`;


export const urlForLocal = (url) => process.env.NODE_ENV === 'development' ? `https://itguild.info${url}` : url;
