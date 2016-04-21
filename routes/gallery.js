/**
 * Created by hansneil on 21/4/16.
 */
var request = require('request');
var promise = require('q').Promise;

function Database(){

}
Database.prototype.get = function(page) {
    var that = this;
    return promise(function(resolve){
        request.get(that.getUrl(page), function(error, response){
            resolve(JSON.parse(response.body)[that.selectedField].map(that.fieldMap));
        })
    });
};
Database.prototype.selectedField = 'data';
Database.prototype.getUrl = function(page){
    return 'https://marketplace.500px.com/api/photos?sort=licensed_at&per_page=30&page=' + (page + 1);
};
Database.prototype.fieldMap = function(item) {
    return {
        name: item.name,
        description: item.description,
        width: item.width,
        height: item.height,
        url: {
            small: item.images[2].url,
            large: item.images[6].url
        }
    }
};

exports.getPhotos = function(req, res){
    var database = new Database();
    database.get(req.query.page || 0).then(function(data){
        res.set('Access-Control-Allow-Origin', '*');
        res.send(data);
    });
}