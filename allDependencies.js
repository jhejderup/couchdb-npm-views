Array.prototype.unique = function(){
    var i,obj,ret;
    ret = [];
    obj = {};
    for (i=0;i<this.length;i++){
        if (!obj.hasOwnProperty(this[i])){
            ret.push(this[i]);
            obj[this[i]] = i;
        }
    }
    return ret;
}

function (doc) {
  if (!doc || doc.deprecated) return
  if (doc._id.match(/^npm-test-.+$/) &&
      doc.maintainers &&
      doc.maintainers[0].name === 'isaacs')
    return

  var l = doc['dist-tags'] && doc['dist-tags'].latest
  if (!l) return
  l = doc.versions && doc.versions[l]
  if (!l || l.deprecated) return
  var d = l.dependencies
  if (!d) return

  var versionsWithDep = Object.keys(doc.versions).map(function(k){ 
                 return doc.versions[k];
              }).filter(function(ver){
                 return ver.hasOwnProperty('dependencies')
              })

  var deps = versionsWithDep.map(function(ver){
                 return Object.keys(ver.dependencies)
              }).reduce(function(prev, curr){
                return prev.concat(curr)
              }, []).unique()

  deps.map(function(dep){
  var value = versionsWithDep.map(function(ver){
                 var obj = {}
                 obj[ver.version] = ver.dependencies[dep] || null
                 return obj
              })
    emit([dep, doc._id, doc['dist-tags'].latest], value)
  })
}
