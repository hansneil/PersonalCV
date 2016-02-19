/**
 * Created by hansneil on 19/2/16.
 */
var photos = {};

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
    if (!photos[id]) {
        var o = {
            likes: 1
        };
        photos[id] = o;
    } else {
        photos[id].likes += 1;
    }
    console.log(photos);
    res.send(200, {likes: photos[id].likes});
}