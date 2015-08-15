/**
 * Created by AlexRob on 16/08/15.
 */


module.exports = function (req, query) {
    return query.skip((req.query.page || 0) * 10).limit(10);
};