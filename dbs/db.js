const mongoose = require("mongoose");
const tools = require('./utils/tools');
// ----设置Promise-------------------------------------------
mongoose.Promise = global.Promise;
// ----数据模型------------------------------------------------
exports.User = require('./models/user');
exports.toData = tools.toData;
exports.toDatas = tools.toDatas;
// unipue 的属性对应的数据重复 即唯一性的东西错误 如用户名 邮箱 关键词
exports.isDuplicateIndexError = function(err) {
    return err.name && err.name == 'MongoError' && err.code == 11000
}