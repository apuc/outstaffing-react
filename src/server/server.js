export const fetchProfile = async (link, index) => {
  const response = await fetch(`${link}${index}`);
  let data = await response.json();

  return data;
};

export const fetchSkills = async (link) => {
  const response = await fetch(link);
  let data = await response.json();

  return data;
};

export const fetchItemsForId = async (link, id) => {
  const response = await fetch(`${link}${id}`);
  let data = await response.json();

  return data;
};

export const fetchForm = async (link, info) => {
  const response = await fetch(link, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  });

  return response;
};
