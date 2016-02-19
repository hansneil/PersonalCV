/**
 * Created by hansneil on 19/2/16.
 */
var password = '123';

exports.authen = function(req, res) {
    if (req.body.password == password) {
        res.send(200, {user: "neil"});
    }
}