// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    console.log("Dropping tables...");
    await client.connect();

    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS link_tags;
      DROP TABLE IF EXISTS tags;
      DROP TABLE IF EXISTS links;
      
      CREATE TABLE links (
        id SERIAL PRIMARY KEY,
        linkurl varchar(255) UNIQUE NOT NULL,
        clicks INT NOT NULL,
        comment varchar(255) NOT NULL,
        date DATE
      );
      CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        tag varchar(255) NOT NULL
      );
      CREATE TABLE link_tags (
        "linkId" INTEGER REFERENCES links(id) ON DELETE CASCADE NOT NULL,
        "tagId" INTEGER REFERENCES tags(id) ON DELETE CASCADE NOT NULL,
        UNIQUE("linkId", "tagId")
      );
    `);

      console.log("Tables built!")
    

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    await client.query(`
      INSERT INTO links (linkurl, clicks, comment) VALUES ('espn.com', 0, 'Worldwide Leader in Sports');
      INSERT INTO tags (tag) VALUES ('sports');
      INSERT INTO link_tags ("linkId", "tagId") VALUES (
        (SELECT id FROM links WHERE linkurl = 'espn.com' LIMIT 1),
        (SELECT id FROM tags WHERE tag = 'sports' LIMIT 1)
      );
      `);
      

    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());