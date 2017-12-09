[![NPM version][npm-badge-url]][npm-url] 
[![code style: prettier][prettier-badge-url]][prettier-url]

# gulp-url-loader 
> A gulp plugin to inline image imports inside script files as DataURL (base64 encoded file with mime type). Supports img, png and gif file formats.

## Install 
```shell
$ npm install --save-dev gulp-url-loader
```

## Usage
This plugin works as [webpack url-loader](https://github.com/webpack-contrib/url-loader) plugin for images. It was created out of need to use SSR for react web apps, where end result was single html file with all assets inlined, which was passed to pdf generation script.

Add it to your `gulpfile.js`:
```js
var gulp = require('gulp')
const { urlLoader } = require('gulp-url-loader')

gulp.task('default', () => gulp
  .src('src/**/*')
  .pipe(urlLoader())
  .pipe(gulp.dest('dist')))
```

Import image inside some script file as is you were using webpack:
```js
import imageVariableName from '../some/relative/path/image.png'
```
or
```ts
import * as imageVariableName from '../some/relative/path/image.png'
```



[npm-url]: https://www.npmjs.com/package/gulp-url-loader
[npm-badge-url]: https://badge.fury.io/js/gulp-url-loader.svg 
[prettier-url]: https://github.com/prettier/prettier
[prettier-badge-url]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square

