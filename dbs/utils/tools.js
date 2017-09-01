exports.toData = function(m) {
    m = m.toObject()
    m.id = m._id.toString()
    delete m._id
    return m
}

exports.toDatas = function(models) {
    return models.map(m => exports.toData(m))
}