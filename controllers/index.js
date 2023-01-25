const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
// const dashboardRoutes = require('./dashboard-routes');
// const apiRoutes = require('./api');

console.log(homeRoutes)

router.use('/', homeRoutes);
// router.use('/api', apiRoutes);
// router.use('/dashboard', dashboardRoutes);

module.exports = router;
