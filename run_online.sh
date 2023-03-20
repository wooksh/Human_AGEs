echo "[$(date)] Starting up database..."
./Neo4j_4.0/bin/neo4j restart
echo "[$(date)] Waiting 15s for Neo4j to start..."
sleep 15
echo "[$(date)] Pasting into modules directory modified versions of plugins..."
cp -fr edited_modules/* node_modules/
echo "[$(date)] Starting up server..."
npm run start-prod
