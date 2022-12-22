const userSeeds = require("./user-seeds");
const commentSeeds = require("./comment-seeds");
const postSeeds = require("./post-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await userSeeds();
  console.log("\n----- SEEDED USERS -----\n");

  await commentSeeds();
  console.log("\n----- SEEDED COMMENTS -----\n");

  await postSeeds();
  console.log("\n----- SEEDED POSTS -----\n");

  process.exit(0);
};

seedAll();
