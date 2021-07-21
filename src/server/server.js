export const fetchProfile = async (link, index) => {
  try {
    const response = await fetch(`${link}${index}`);
    let data = await response.json();

    return data;
  } catch (error) {}
};

export const fetchSkills = async (link) => {
  try {
    const response = await fetch(link);
    let data = await response.json();

    return data;
  } catch (error) {}
};

export const fetchItemsForId = async (link, id) => {
  try {
    const response = await fetch(`${link}${id}`);
    let data = await response.json();

    return data;
  } catch (error) {}
};

export const fetchForm = async (link, info) => {
  try {
    const response = await fetch(link, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: info,
    });

    return response;
  } catch (error) {}
};
