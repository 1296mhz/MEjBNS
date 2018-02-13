/**
 * Created by cshlovjah on 17.01.18.
 */
var leftMenuItems = require('../../../config/frontend-spa/leftMenuItems.json')

var getLeftMenuItems = function (req, res, next){


    res.json(leftMenuItems.items);

}

module.exports = getLeftMenuItems