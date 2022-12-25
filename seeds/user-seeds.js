const sequelize = require("../config/connection");
const { User } = require('../models/')

const userInfo = [
  {
    username: "spikespiegel",
    email: "spikespiegel26@bebop.com",
    password: "321letsjam",
  },
  {
    username: "fayevalentine94",
    email: "fayevalentine@bebop.com",
    password: "gamblingqueen1994",
  },
  {
    username: "jetblack03",
    email: "jetblack12@bebop.com",
    password: "flyingteacup",
  },
  {
    username: "radicaledward01",
    email: "edwhptiv@bebop.com",
    password: "mushroomhunting123",
  },
];

const seedUsers = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userInfo);
};
