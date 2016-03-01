# <%= moduleTitle %>
[![NPM version][npm-image]][npm-url] <% if (githubAccount){ %> <% if (includeTravis){ %>[![Build Status][travis-image]][travis-url] <% } %>[![Dependency Status][daviddm-image]][daviddm-url]<% } %>   

<% if (description) {  %> > <%= description %><% } %>

## Installation

Using npm:

```sh
npm i -S <%= moduleName %>
```

## Usage
`scss/index.scss` is <%= moduleTitle %>'s importable file.

`@import 'path/to/<%= moduleName %>';` should give you all you need.

Documentation covering the Sass functionality of `<%= moduleName %>` 
is located in The `sassdoc` directory. 

Documentation covering the css provided by `<%= moduleName %>` is located in
the `styleguide` directory.

**License:** <%= license %>



[npm-image]: https://badge.fury.io/js/<%= moduleName %>.svg
[npm-url]: https://npmjs.org/package/<%= moduleName %>
<% if (githubAccount) { %><% if (includeTravis) { %>
[travis-image]: https://travis-ci.org/<%= githubAccount %>/<%= moduleName %>.svg?branch=master
[travis-url]: https://travis-ci.org/<%= githubAccount %>/<%= moduleName %><% } %>
[daviddm-image]: https://david-dm.org/<%= githubAccount %>/<%= moduleName %>.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/<%= githubAccount %>/<%= moduleName %><% } %>
