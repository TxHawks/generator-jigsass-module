#!/bin/sh
# Generate documentation and deploy it to GitHub pages
# http://<%= githubAccount %>.github.io/<%= moduleName %>/
gulp sass:doc
gulp sass:sg
git add ./docs/.
git commit -m "Compile documentation"
git subtree push --prefix docs origin gh-pages
