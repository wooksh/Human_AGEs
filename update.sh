echo "[$(date)] Pasting into modules directory modified versions of plugins..."
cp -fr edited_modules/* node_modules/
echo "[$(date)] Starting up server..."
npm run start-prod
