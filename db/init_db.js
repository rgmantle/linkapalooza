// code to build and initialize DB goes here
const {
  client,
  createLinks,
  createTags,
  insertLinkTags,
  createLinkTags
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
        clicks INT,
        comment varchar(255),
        date DATE
      );
      CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        tag varchar(255) UNIQUE NOT NULL
      );
      CREATE TABLE link_tags (
        id SERIAL PRIMARY KEY,
        "linkId" INTEGER REFERENCES links(id) ON DELETE CASCADE NOT NULL,
        "tagId" INTEGER REFERENCES tags(id) ON DELETE CASCADE NOT NULL
        );
    `);

      console.log("Tables built!")
    

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  let github;
  let codingTag;

  try {
    console.log("Starting to create links...")  

    await createLinks({
      linkurl: 'https://www.espn.com/',
      clicks: 0,
      comment: 'Worldwide Leader in Sports'
    });
    github = await createLinks({
      linkurl: 'https://github.com/',
      clicks: 0,
      comment: 'Github Repositories'
    });
    await createLinks({
      linkurl: 'https://www.nhl.com/',
      clicks: 0,
      comment: 'National Hockey League'
    });


    console.log("Finished creating links!");
  } catch (error) {
    console.error("Error creating links!");
    throw error;
  }
  try {
    console.log("Starting to create tags...")

    await createTags({
      tag: 'sports'
    });
    codingTag = await createTags({
      tag: 'coding'
    });

    console.log("Finished creating tags!");
  } catch (error) {
    console.error("Error creating tags!");
    throw error;

  }
  try {
    console.log("Associating Links and Tags");

    await createLinkTags(github.id, codingTag.id)

  } catch (error) {
    throw error
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());