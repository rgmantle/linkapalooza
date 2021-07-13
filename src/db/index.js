// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'linkerator'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods

async function createLink({
  linkurl,
  comment,
  date = null,
  tags =[]
}) {
  try {
    const { rows: [ newLink ] } = await client.query(`
      INSERT INTO links(linkurl, comment, date)
      VALUES($1, $2, $3)
      RETURNING *;
    `, 
      [linkurl, comment, date]
    );

    const { id } = newLink;

    if (tags.length) {
      const insertedTags = await createTags(tags);
      await addTagsToLink(id, insertedTags);
    }
    return newLink;
  } catch (error) {
    throw error;
  }
}

async function createQueryStrings(fields) {
  const setString = Object.keys(fields)
    .map((key, index) => {
      return `"${key}"=$${index + 1}`;
    })
    .join(",");

  const queryString = Object.values(fields);

  return { setString, queryString };
}

async function updateLink(linkId, fields = {}) {
  const { tags } = fields;
  delete fields.tags;

  const { setString, queryString } = await createQueryStrings(fields);

  try {
    if (setString.length > 0) {
      await client.query(`
        UPDATE links
        SET ${setString}
        WHERE id = ${linkId}
        RETURNING *
        `, queryString);
    }

    if (tags === undefined) {
      return await getLinkById(linkId);
    }
    console.log("attempting to update tags: ", tags);

    const tagList = await createTags(tags);
    const tagListIdString = tagList.map((tag) => `${tag.id}`).join(", ");
    console.log("Successfully updated tags:", tagList, 'tad ID string', tagListIdString);

    await client.query(`
      DELETE FROM link_tags
      WHERE "tagId"
      NOT IN (${tagListIdString})
      AND "linkId"=$1;
      `, [linkId]);

    await addTagsToLink(linkId, tagList);

    return await getLinkById(linkId);
  } catch (error) {
    throw error;
  } 
}

async function createTags(tagList) {
  if (tagList.length === 0) {
    return;
  }

  const insertValues = tagList.map((_, index) => `$${index + 1}`).join("), (");
  const selectValues = tagList.map((_, index) => `$${index + 1}`).join(", ");

  try {
    await client.query(`
      INSERT INTO tags(tag)
      VALUES(${insertValues})
      ON CONFLICT (tag) DO NOTHING
      RETURNING *;
    `, [tagList]);

    const { rows } = await client.query(`
      SELECT * FROM tags
      WHERE tag
      IN (${selectValues});
      `, tagList);
    
    return rows;

  } catch (error) {
    throw error;
  }
}

async function createLinkTags(linkId, tagId) {
  try {
    const { rows: tags } = await client.query(
      `
        INSERT INTO link_tags("linkId", "tagId")
        VALUES($1, $2)
        ON CONFLICT("linkId", "tagId") DO NOTHING
        RETURNING *;
        `,
      [tagId, linkId]
    );
  } catch (error) {
    throw error;
  }
}

async function addTagsToLink(linkId, tags) {
  try {
    const tagLinkPromises = tags.map((tag) => {
      return createLinkTags(linkId, tag.id);
    });

    await Promise.all(tagLinkPromises);

    return await getLinkById(linkId);
  } catch (error) {}
}

async function updateClickCount(linkId) {
  try {
    const { rows: link } = await client.query(
      `
        UPDATE links
        SET clicks = clicks + 1
        WHERE id = $1;
        `,
      [linkId]
    );
  } catch (error) {}
}

async function getLinkById(linkId) {
  const {
    rows: [links],
  } = await client.query(
    `
        SELECT * FROM links
        WHERE id=$1;
    `,
    [linkId]
  );

  if (!links) {
    throw {
      message: "No links with that id",
      error: "NoLinkIdError",
    };
  }

  const { rows: tags } = await client.query(
    `
    SELECT tags.* FROM tags
    JOIN link_tags ON tags.id = link_tags."tagId"
    WHERE link_tags."linkId" = $1;
    `,
    [linkId]
  );

  links.tags = tags;

  return links;
}

async function getAllLinks() {
  try {
    const { rows: linksIds } = await client.query(`
    SELECT id FROM links
    ORDER BY linkurl ASC;
    `);
  const links = await Promise.all(
    linksIds.map((link) => getLinkById(link.id))
  );

  return links
  } catch (error) {
    throw error;
  }
}

async function deleteLink(linkId) {

  console.log('Entered db DELETE LINKS with id: ', linkId);
  try {
    const { rows: linkTags } = await client.query(`
        DELETE FROM link_tags
        WHERE "linkId" = ${linkId}
        RETURNING *;
        `);

    const {
      rows: [link],
    } = await client.query(`
        DELETE FROM links
        WHERE id=${linkId}
        RETURNING *;
        `);

    return link;
  } catch (error) {
    throw error;
  }
}

async function getLinkByUrl(url) {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM links
    WHERE linkurl LIKE '%${url}%';
    `);

    return rows;
  } catch (e) {
    throw e;
  }
}

async function getLinkByTag(tag) {
  try {
    const {
      rows: [link],
    } = await client.query(`
        SELECT * FROM links
        JOIN link_tags
        ON links.id = link_tags."linkId"
        JOIN tags ON link_tags."tagId" = tags.id
        WHERE tags.tag LIKE '%${tag}%';
        `);

    return link;
  } catch (error) {
    throw error;
  }
}

async function searchAllLinks(searchTerm) {
  try {
    let searchResults = [];
    const promiseArray = [getLinkByTag(searchTerm), getLinkByUrl(searchTerm)];
    const results = await Promise.all(promiseArray);
  } catch (error) {
    throw error;
  }
}


// export
module.exports = {
  client,
  createLink,
  updateLink,
  createTags,
  createLinkTags,
  addTagsToLink,
  getAllLinks,
  deleteLink,
  getLinkByUrl,
  getLinkByTag,
  searchAllLinks,
  getLinkById,
  updateClickCount,
}