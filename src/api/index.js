import axios from 'axios';

export async function getLinks() {
  try {
    const { data: { links } } = await axios.get('/api/links');
    return links;
  } catch (error) {
    throw error;
  }
}

export async function getTags() {
  try {
    const { data: { tags } } = await axios.get('/api/tags');
    return tags;
  } catch (error) {
    throw error;
  }
}

export const createLink = async (linkurl) => {
  try {
    await axios.post('/api/links/create', {
      linkurl,
    });
    return true;
  } catch (e) {
    console.error(e);

    return false;
  }
}

export const getLinkById = async (linkId) => {
  try {
    const { data } = await axios.get(`/api/links/${linkId}`);
    return data;
  } catch (e) {
    console.error(e);

    return false;
  }
}