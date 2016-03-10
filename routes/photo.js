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
    //console.log(req.cookies);
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    if (!req.cookies.hasVisited) {
        res.cookie('hasVisited', '1', {
            maxAge: 60*60*1000*24*365,
            httpOnly: true,
            path: '/photo'
        });
    }
    Photo.findOne({ip: ip})
        .exec(function(err, userIp){
            if (!userIp) {
                console.log('aaa');
                var album = new Album({id: id, active: false});
                var userIp = new Photo({ip: ip, visit: true, likes: [album]});
                console.log(album.id);
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
                            like.save(function(err){
                                res.send(200, {likes: 0, active: false});
                            });
                        } else {
                            var active = false;
                            //res.send(200, {likes: like.likes, active: userIp.likes});
                            for (var i = 0; i < userIp.likes.length; i++) {
                                if (userIp.likes[i].id == id) {
                                    active = userIp.likes[i].active;
                                }
                            }

                            res.send(200, {likes: like.likes, active: active});

                        }
                    })
            }
        });
};
exports.addLikes = function(req, res) {
    var id = 'p' + req.param('id');
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    console.log('post start');
    console.log(req.headers);

    Photo.findOne({ip: ip})
        .exec(function(err, userIp){
            if (!userIp) {
                console.log("Can't be error");
            } else {
                Like.findOne({id: id})
                    .exec(function(err, like){
                        if (!like) {
                            console.log('no like');
                            /*var like = new Like({id: id, likes: 0});
                            res.send(200, {likes: 0, active: false});*/
                        } else {
                            //res.send(200, {likes: like.likes, active: userIp.likes});
                            for (var i = 0; i < userIp.likes.length; i++) {
                                console.log(userIp.likes);
                                if (userIp.likes[i].id == id) {
                                    if (userIp.likes[i].active == false || userIp.likes[i].id == 'p15') {
                                        var album = new Album({id: id, active: true});
                                        //var likes = like.likes + 1;
                                        var likes = 11;
                                        userIp.likes.push(album);
                                        like.set('likes', likes);
                                        userIp.likes[i].active = true;
                                        album.save(function (err) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                like.save(function (err) {
                                                    if (err) {
                                                        console.log('err');
                                                    } else {
                                                        userIp.save(function () {
                                                            res.send(200, {likes: likes, active: true});
                                                        })
                                                    }
                                                });
                                            }
                                        });
                                    } else {
                                        res.send(200, {likes: like.likes, active: userIp.likes[i].active});
                                    }
                                    break;
                                }
                            }
                            if (i >= userIp.likes.length) {
                                var album = new Album({id: id, active: true});
                                var likes = like.likes + 1;
                                userIp.likes.push(album);
                                like.set('likes', likes);
                                album.save(function (err) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        like.save(function (err) {
                                            if (err) {
                                                console.log('err');
                                            } else {
                                                userIp.save(function () {
                                                    res.send(200, {likes: likes, active: true});
                                                })
                                            }
                                        });
                                    }
                                });
                            }

                        }
                    })
            }
        });
}
