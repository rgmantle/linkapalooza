// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'linkerator'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods

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

const getAllLinks = async() => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM links`)

  return rows
  } catch (error) {
    throw error;
  }
}

const getLinkById = async() => {
  try {
    const { links } = await client.query(`
      SELECT * FROM links WHERE id=$1l;
      `, [id]);
    return link;
  } catch (error) {
    throw error;
  }
}

const destroyLink = async(id) => {
  try {
    await client.query(`
      DELETE FROM links
      WHERE id = $1;
      `, [id]);
  } catch (error) {
    throw error
  }
}

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

const getLinksBytag = async(tag) => {
  const {id} = tag
  try {
      const {rows} = await client.query(`
          SELECT l.id, l.linkurl, l.date, l.clicks, t.id as "tagId", t.tag
          FROM link_tags AS lt
          JOIN tags AS t ON lt."tagId"       = t.id
          JOIN links AS l ON lt."linkId"     = l.id
          WHERE t.id = $1;
      `,[id]);
      rows.forEach((row)=>{
          row.tags = [{id: row.tagId, tag: row.tag}]
          delete row.tagId;
          delete row.tag
      });
      
      return rows;
  } catch (error) {
      console.error(error)
      throw error
  }
}


const getAllTags = async() => {
  const { rows } = await client.query(`
    SELECT * FROM tags`)

  return rows
}

const getTagById = async(id) => {
  try {
      const {rows: [tag]} = await client.query(`
      SELECT * FROM tags WHERE id=$1;
      `, [id]);
      return tag;
  } catch (error) {
      console.error(error)
      throw error
  }
}

const getTagsBylink = async(linkId)=> {
  try {
      const {rows} = await client.query( `
      SELECT l.id, l.linkurl, t.id as "tagId", t.tag
      FROM link_tags AS lt
      JOIN tags AS t ON lt."tagId" = t.id
      JOIN links AS l ON lt."linkId" = l.id
      WHERE l.id = $1;
      `,[linkId])
      console.log(rows)
      return rows;
  } catch (error) {
      console.error(error)
      throw error
  }
}

const addTagToLink = async({linkId, tagId}) => {
  console.log(linkId, tagId);
  try {
      const {rows} = await client.query(`
          INSERT INTO link_tags ("linkId", "tagId")
          VALUES($1, $2)
          ON CONFLICT ("linkId","tagId") DO NOTHING
          RETURNING *;
      `,[linkId,tagId])
      return rows;
  } catch (error) {
      console.error(error)
      throw error
  }
}

const getLinkTagsByLink = async(id)=> {
  try {
      const { rows} = await client.query(`
          SELECT * FROM link_tags WHERE "linkId" = $1;
      `,[id])
      return rows;
  } catch (error) {
      console.error(error)
      throw error
  }
}

const getLinkTagsById = async(id)=>{
  try {
      const{rows:[link_tags]} = await client.query(`
          SELECT lt.id, lt."tagId", lt."linkId", l.linkurl, l.date, 
          l.comment, l.clicks, t.tag
          FROM link_tags lt
          JOIN tags AS t ON lt."tagId" = t.id
          JOIN links AS l ON lt."linkId" = l.id
          WHERE lt.id=$1`,[id]);
          return link_tags;
  } catch (error) {
      console.error(error);
      return false;
  }
}

const destroyLinkTag = async(id) =>{
  try {
      const {rows} = await client.query(`
      DELETE FROM link_tags
      WHERE id = $1
      RETURNING *;
      `,[id])
      return rows;
  } catch (error) {
      console.error(error)
      throw error
  }
}

// export
module.exports = {
  client,
  createLinks,
  createTags,
  createLinkTags,
  getAllTags,
  getTagById,
  getLinkById,
  getLinksBytag,
  getTagsBylink,
  destroyLink,
  destroyLinkTag,
  getLinksWithTags,
  getAllLinks,
  getLinkTagsByLink,
  addTagToLink,
  getLinkTagsById,
  // db methods
}