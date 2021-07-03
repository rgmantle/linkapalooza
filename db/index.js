// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'linkerator'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods

// const createLinks = async(linkurl, clicks, comment) => {
//   const { rows } = await client.query(`
//     INSERT INTO links (linkurl, clicks, comment) VALUES ($1, $2, $3) RETURNING id;
//     `, [linkurl, clicks, comment]);

//   return rows[0].id;
// }
async function createLinks({
  linkurl,
  clicks,
  comment
}) {
  try {
    const { rows: [ link ] } = await client.query(`
      INSERT INTO links(linkurl, clicks, comment)
      VALUES($1, $2, $3)
      ON CONFLICT (linkurl) DO NOTHING
      RETURNING *;
    `, [linkurl, clicks, comment]);

    return link;
  } catch (error) {
    throw error;
  }
}

// const createTags = async(tag) => {
//   const { rows } = await client.query(`
//     INSERT INTO tags (tag) VALUES ($1) RETURNING id`
//     , [tag]);
//   return rows[0].id;
// }

async function createTags({
  tag,
}) {
  try {
    const { rows: [ tagname ] } = await client.query(`
      INSERT INTO tags(tag)
      VALUES($1)
      ON CONFLICT (tag) DO NOTHING
      RETURNING *;
    `, [tag]);

    return tagname;
  } catch (error) {
    throw error;
  }
}

// const insertLinkTags = async () => {
//   const { rows } = await client.query(`
//     INSERT INTO link_tags ("linkId", "tagId")
//     VALUES ($1, $2);
//     `, []);
// }

async function createLinkTags(linkId, tagId) {
  try {
    await client.query(`
      INSERT INTO link_tags("linkId", "tagId")
      VALUES ($1, $2)
      `, [linkId, tagId]);
  } catch (error) {
    throw error;
  }
}

const getLinksWithTags = async () => {
  const { rows } = await client.query(`
    SELECT l.linkurl as "linkName", l.comment as "description", t.tag as "tag"
    FROM link_tags AS lt
    JOIN tags AS t ON lt."tagId"=t.id 
    JOIN links AS l ON l.id=lt."linkId";
    `);
  
  return rows;
}

const getAllLinks = async() => {
  const { rows } = await client.query(`
    SELECT * FROM links`)

  return rows
}

// export
module.exports = {
  client,
  createLinks,
  createTags,
  createLinkTags,
  // insertLinkTags,
  getLinksWithTags,
  getAllLinks
  // db methods
}