echo "[$(date)] Installing node modules..."
npm install
npm audit fix
echo "[$(date)] Cleaning up conflicting dependencies in npm_modules..."
rm -fr node_modules/neo4j-graphql-js/node_modules/graphql
echo "[$(date)] Pasting into modules directory modified versions of plugins..."
cp -fr edited_modules/* node_modules/
echo "[$(date)] Building bundles..."
npm run build
