export function createMarkup(text) {
  return { __html: text.split("</p>").join("</p>") };
}

// export function transformHtml(text) {
//   let startHtml = {
//     __html: text.split("<h3> || <h2>").join("<br><h2>").split("<br>"),
//   };
//   startHtml = startHtml.__html.filter(
//     (el) => (el !== null && el !== "") || el === 0
//   );
//   const finalHtml = startHtml.map(
//     (item) =>
//       `<div class='experience__block'>
//         <div class="summary__sections__head">
//             <h3>Описание опыта работы</h3>
//             <button>Редактировать раздел</button>
//         </div>
//         <div class="experience__content">${item.split("<h3>")[0]}</div>
//        </div>`
//   );
//   return { __html: finalHtml.join("") };
// }
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
  const tParam = `Bearer ${localStorage.getItem("auth_token")}`;

  return tParam ? { Authorization: tParam } : {};
};

export const urlHasParams = (url) =>
  url.indexOf("?") > 0
    ? `${url}&${window.location.search.substr(1)}`
    : `${url}${window.location.search}`;

export const urlForLocal = (url) =>
  process.env.NODE_ENV === "development" ? `https://itguild.info${url}` : url;

export const backendImg = (url) => `https://back.itguild.info${url}`;

export function scrollToForm() {
  window.scrollTo({
    top: 850,
    behavior: "smooth",
  });
}

export function getCorrectRequestDate(date) {
  const yyyy = String(date.getUTCFullYear());
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const hh = String(date.getUTCHours());
  const min = String(date.getUTCMinutes());
  const sec = String(date.getUTCSeconds());
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec}`;
}

export function getCorrectYYMMDD(date) {
  const yyyy = String(date.getUTCFullYear());
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function caseOfNum(number, type) {
  const allTypes = {
    comments: ["коментарий", "комментария", " коментариев"],
    files: ["файл", "файла", "файлов"],
    persons: ["участник", "участника", "участников"],
    tasks: ["задача", "задачи", "задач"],
    projects: ["проект", "проекта", "проектов"],
  };
  const cases = [2, 0, 1, 1, 1, 2];
  return allTypes[type][
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
}

export function copyProjectLink(projectId) {
  navigator.clipboard.writeText(
    `https://itguild.info/tracker/project/${projectId}`
  );
}
