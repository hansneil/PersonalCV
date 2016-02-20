/**
 * Created by hansneil on 19/2/16.
 */
var photos = {};
var ips = {};
var active = false;

exports.getLikes = function(req, res) {
    var id = 'p' + req.param('id');
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    if (!photos[id]) {
        var o = {
            likes: 0
        };
        photos[id] = o;
    }

    if (ips[ip]) {
        console.log('aaa');
        for (var i = 0; i < ips[ip].likes.length; i++) {
            if (ips[ip].likes[i] == id) {
                active = true;
            }
        }
    }

    res.send(200, {likes: photos[id].likes, active: active});
};
exports.addLikes = function(req, res) {
    var id = 'p' + req.param('id');
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    if (!ips[ip]) {
        ips[ip] = {
            visit: true,
            likes: [id]
        };
        photos[id].likes += 1;
    } else {
        var tmp = ips[ip];
        for (var i = 0; i < tmp.likes.length; i++) {
            if (tmp.likes[i] == id) {
                break;
            }
        }
        if (i >= tmp.likes.length) {
            ips[ip].likes.push(id);
            photos[id].likes += 1;
        }
    }
    res.send(200, {likes: photos[id].likes});
}