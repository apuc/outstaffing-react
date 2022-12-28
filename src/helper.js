export function createMarkup(text) {
    return {__html: text.split('</p>').join('</p>')}
}

export function transformHtml(text) {
    let startHtml = {__html: text.split('<h2>').join('<br><h2>').split('<br>')}
    startHtml = startHtml.__html.filter((el)=> {
        return (el != null && el != "" || el === 0)
    })
    const finalHtml = startHtml.map((item) => {
        return `<div class='experience__block'><div class="profile__sections__head"><h3>Описание опыта работы</h3><button>Редактировать раздел</button></div><div class="experience__content">${item.split('<h3>')[0]}</div></div>`
    })
    return {__html: finalHtml.join('')}
}
