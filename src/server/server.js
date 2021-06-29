export const fetchProfile = async (link, index = '') => {
  const response = await fetch(`${link}/${index}`);
  let data = await response.json();

  return data;
};

export const fetchSkills = async (link) => {
  const response = await fetch(link);
  let data = await response.json();

  return data;
};
