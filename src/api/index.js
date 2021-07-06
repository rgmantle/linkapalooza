import axios from 'axios';

export async function getLinks() {
  try {
    const { data: { links } } = await axios.get('/api/links');
    return links;
  } catch (error) {
    throw error;
  }
}