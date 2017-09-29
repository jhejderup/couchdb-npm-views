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
  var desc = doc.description || l.description || ''
  var d = l.dependencies
  if (!d) return
  for (var dep in d) {
    emit([dep, doc._id, desc], 1)
  }
}
