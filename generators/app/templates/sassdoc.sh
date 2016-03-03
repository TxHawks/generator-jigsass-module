#!/bin/sh
# Generate documentation and deploy it to GitHub pages
# http://<%= githubAccount %>.github.io/<%= moduleName %>/
gulp sass:doc
git add ./sassdoc
git commit -m "Compile SassDoc"
git subtree push --prefix sassdoc origin gh-pages
