var path = require('path');
var join = path.join;
var url = require('fast-url-parser');
var deliver = require('deliver');
var fileExists = require('file-exists');
var mime = require('mime-types');

var static = function (options) {
  options = options || {};
  
  var root = options.root || './';
  var indexFile = options.index || 'index.html';
  
  if (options.exists) fileExists = options.exists;
  
  return function (req, res, next) {
    var originalPathname = url.parse(req.url).pathname;
    var rootPathname = join(root, originalPathname);
    var pathname = (isDirectoryIndex(originalPathname, indexFile))
      ? join(rootPathname, indexFile)
      : localPath(rootPathname);
    
    if (!pathname) return next();
    
    // TODO: perhaps we pass and optional file list into
    // the deliver module so that we can abstract a lot of this logic away
    // or instead of passing in a custom "exists()" method
    
    deliver(req, {
      root: root,
      index: indexFile
    }).pipe(res);
  };
  
  function isDirectoryIndex (pathname, indexFile) {
    var p = join(root, pathname, indexFile);
    return fileExists(p);
  }
  
  function localPath (pathname) {
    return (fileExists(pathname)) ? pathname : undefined;
  }
};


module.exports = static;