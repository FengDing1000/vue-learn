const mongoose = require("mongoose");
// BCrypt算法将salt随机并混入最终加密后的密码,
// 验证时也无需单独提供之前的salt,从而无需单独处理salt问题。
const bcrypt = require("bcrypt");
//计算强度 其值越大，破解密码时间越长
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema
const UserSchema = new Schema({
    account: {
        unique: true,
        type: String
    },
    password: String,
    rememberPassword: {
        type: Boolean,
        default: false
    },
    meta: { // meta 更新或录入数据的时间记录
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

// UserSchema.pre 表示每次存储数据之前都先调用这个方法
UserSchema.pre('save', function(next) {
    console.log('注册的用户this===', this); //this指向当前的创建的UserSchema对象
    var user = this;
    if (this.isNew) { //最新创建的
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else { //更新
        this.meta.updateAt = Date.now();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        // if (err) return next(err);
        if (err) {
            console.log(err);
            return next(err);
        }
        // 加密密码
        bcrypt.hash(user.password, salt, function(err, hash) {
            // if (err) return next(err);
            if (err) {
                console.log(err);
                return next(err);
            }
            user.password = hash;
            next();
        })
    })
});
// UserSchema 模式的实例方法 实例化后的对象可以调用 如new
UserSchema.methods = {
    comparePassword: function(_password, cb) {
        // 解密和与当前用户信息密码比较
        bcrypt.compare(_password, this.password, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        })
    }
};
// UserSchema 模式的静态方法 模型可以调用这里的方法
UserSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({ _id: id })
            .exec(cb)
    }
};
// 导出UserSchema模式
module.exports = UserSchema;