/**
 * Created by hansneil on 21/2/16.
 */
var type = '',
    id = 0;
exports.getComments = function(req, res){
    console.log(req.params);
    var regExp = /([a-zA-z]+)(\d+)/;
    id = Number(req.params.id.match(regExp)[2]);
    type = req.params.id.match(regExp)[1];
    res.render('comment');
};
exports.newComment = function(req, res){
    console.log('hehhehehe');
    res.send(200, {type: type, id: id});
};