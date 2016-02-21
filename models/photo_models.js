/**
 * Created by hansneil on 21/2/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var AlbumSchema = new Schema({
    id: String,
    active: Boolean
});
var PhotoSchema = new Schema({
    ip: String,
    visit: Boolean,
    likes: [AlbumSchema]
});
mongoose.model('Album', AlbumSchema);
mongoose.model('Photo', PhotoSchema);