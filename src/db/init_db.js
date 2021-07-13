// code to build and initialize DB goes here
const { createLink } = require('../api');
const {
  client,
  createLinks,
  createTags,
  insertLinkTags,
  createLinkTags,
  getAllLinks
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
        clicks INT DEFAULT 0,
        comment TEXT,
        date DATE DEFAULT CURRENT_TIMESTAMP,
      ); 
      CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        tag varchar(255) UNIQUE NOT NULL
      );
      CREATE TABLE link_tags (
        id SERIAL PRIMARY KEY,
        "linkId" INTEGER REFERENCES links(id) ON DELETE CASCADE NOT NULL,
        "tagId" INTEGER REFERENCES tags(id) ON DELETE CASCADE NOT NULL,
        UNIQUE(tags_id, links_id)
        );
    `);

      console.log("Tables built!")
    

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  const linksArray=[
    {linkurl: 'https://www.espn.com/', comment: 'Worldwide Leader in Sports'},
    {linkurl: 'https://github.com/', comment: 'Github Repositories'},
    {linkurl: 'https://www.nhl.com/', comment: 'National Hockey League'},
    {linkurl: 'https://www.chase.com/', comment: 'For all your banking needs'},
    {linkurl: 'https://www.si.com/', comment: 'Sports Illustrated Homepage'},
    {linkurl: 'https://www.mlb.com/', comment: 'Major League Baseball'},
  ]

  linksArray.forEach(link=>createLinks(link));

  await updateLink(1, {comments: 'Not as good as they Used to be', clicks: 52});

  const tags = await createTags(['Sports, Coding', 'Banking']);
  console.log('created Tags:', tags);

  linksArray.forEach((link, index)=>addTagsToLink(index+1,tags));

  const newTag = await createLink({linkurl: 'https://www.bankofamerica.com/', comment: 'not as good as Chase', tags: 'Banking'});

  await deleteLink(1);

  await getAllLinks();
}

async function seed() {
  try {
    console.log('starting db...');
    client.connect();
    console.log('db connected');
    await buildTables();
    await populateInitialData();
  } catch (error) {
    throw error
  }
}

seed()
  .catch(console.error)
  .finally(() => client.end());