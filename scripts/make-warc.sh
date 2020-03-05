

npm link parametric-components parametric-styles
cd node_modules/parametric-components/
git checkout local-static
npm run build
cd ../parametric-styles
git checkout local-static
cd ../..
cp node_modules/parametric-styles/issue-02-layout.css ./static/
cp node_modules/parametric-styles/issue-02-theme.css ./static/
idyll build --template _local.html
rm build.warc.gz
warcit https://parametric.press/issue-02/tk-article-slug/ build/
