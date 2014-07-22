# settle

Express/Connect middleware that serves local or remote static files. 

## Install

```
npm install settle --save
```

## Usage

Serve static files

```js
var express = require('express');
var settle = require('settle');

var app = express();

app.use(settle({
  root: '/public'
}));

app.listen(3000, function () {

});
```

Proxy remote files

```js
var express = require('express');
var settle = require('settle');

var app = express();

app.use(settle({
  root: 'http://proxyserver.com'
}));

app.listen(3000, function () {

});
```

## Run Tests

```
npm install
npm test
```
