/**
 * Created by hansneil on 21/2/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var LikeSchema = new Schema({
    id: String,
    likes: Number
});
mongoose.model('Like', LikeSchema);