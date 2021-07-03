export const fetchProfile = async (link, index) => {
  const response = await fetch(`${link}${index}`);
  let data = await response.json();

  console.log('data ', data);

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
    body: JSON.stringify(info),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};
