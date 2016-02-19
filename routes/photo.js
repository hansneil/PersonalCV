/**
 * Created by hansneil on 19/2/16.
 */
var photos = {};
var ips = {};

exports.getLikes = function(req, res) {
    var id = 'p' + req.param('id');
    if (!photos[id]) {
        var o = {
            likes: 0
        };
        photos[id] = o;
    }
    res.send(200, {likes: photos[id].likes});
};
exports.addLikes = function(req, res) {
    var id = 'p' + req.param('id');
    //console.log(req.client._readableState.highWaterMark);
    console.log(req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress);

    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    if (!photos[id]) {
        var o = {
            likes: 1
        };
        photos[id] = o;
    }

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
        console.log(i);
        console.log(tmp.likes.length);
        if (i >= tmp.likes.length) {
            ips[ip].likes.push(id);
            photos[id].likes += 1;
        }
    }

    console.log(photos);
    res.send(200, {likes: photos[id].likes});
}