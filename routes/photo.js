/**
 * Created by hansneil on 19/2/16.
 */
/*var photos = {};
var ips = {};*/
var mongoose = require('mongoose'),
    Photo = mongoose.model('Photo'),
    Album = mongoose.model('Album'),
    Like = mongoose.model('Like');

exports.getLikes = function(req, res) {
    var id = 'p' + req.param('id');
    var active = false;
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    Photo.findOne({ip: ip})
        .exec(function(err, userIp){
            if (!userIp) {
                console.log('aaa');
                var album = new Album({id: id, active: false});
                var userIp = new Photo({ip: ip, visit: true, likes: [album]});
                album.save(function (err) {
                    if (err) {
                        console.log('err');
                    } else {
                        userIp.save(function(err) {
                            Like.findOne({id: id})
                                .exec(function(err, like){
                                    if (!like) {
                                        var like = new Like({id: id, likes: 0});
                                        like.save(function(err){
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                res.send(200, {likes: 0, active: false});
                                            }
                                        });
                                    } else {
                                        res.send(200, {likes: like.likes, active: false});
                                    }
                                })
                        });
                    }
                });
            } else {
                Like.findOne({id: id})
                    .exec(function(err, like){
                        if (!like) {
                            var like = new Like({id: id, likes: 0});
                            like.save();
                            res.send(200, {likes: 0, active: false});
                        } else {
                            //res.send(200, {likes: like.likes, active: userIp.likes});
                            Album.findOne({id: id})
                                .exec(function(err, album){
                                    if (!album) {
                                        res.send(200, {likes: like.likes, active: false});
                                    } else {
                                        console.log('aaaaaaaaaaaa');
                                        res.send(200, {likes: like.likes, active: album.active});
                                    }
                                })
                        }
                    })
            }
        });


    /*if (ips[ip]) {
        console.log('aaa');
        for (var i = 0; i < ips[ip].likes.length; i++) {
            if (ips[ip].likes[i].id == id) {
                active = ips[ip].likes[i].active;
            }
        }
    }*/

    //res.send(200, {likes: photos[id].likes, active: active});
};
exports.addLikes = function(req, res) {
    var id = 'p' + req.param('id');
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    Photo.findOne({ip: ip})
        .exec(function(err, userIp){
            if (!userIp) {
                console.log("Can't be error");
            } else {
                Like.findOne({id: id})
                    .exec(function(err, like){
                        if (!like) {
                            /*var like = new Like({id: id, likes: 0});
                            res.send(200, {likes: 0, active: false});*/
                        } else {
                            //res.send(200, {likes: like.likes, active: userIp.likes});
                            Album.findOne({id: id})
                                .exec(function(err, album){
                                    if (!album) {
                                        console.log('post');
                                        var album = new Album({id: id, active: true});
                                        var likes = like.likes + 1;
                                        like.set('likes', likes);
                                        album.save(function(err){
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                like.save(function(err){
                                                    if (err) {
                                                        console.log('err');
                                                    } else {
                                                        res.send(200, {likes: likes, active: true});
                                                    }
                                                });
                                            }
                                        });
                                    } else {
                                        console.log('bbbbbbbbbb');
                                        var likes = like.likes + 1;
                                        like.set('likes', likes);
                                        album.set('active', true);
                                        album.save(function(err){
                                            like.save(function(err){
                                                res.send(200, {likes: likes, active: true});
                                            })
                                        })

                                    }
                                })
                        }
                    })
            }
        });

/*    if (!ips[ip]) {
        ips[ip] = {
            visit: true,
            likes: [{id: id, active: true}]
        };
        photos[id].likes += 1;
    } else {
        var tmp = ips[ip];
        for (var i = 0; i < tmp.likes.length; i++) {
            if (tmp.likes[i].id == id) {
                break;
            }
        }
        if (i >= tmp.likes.length) {
            ips[ip].likes.push({id: id, active: true});
            photos[id].likes += 1;
        }
    }*/
    //res.send(200, {likes: photos[id].likes});
}