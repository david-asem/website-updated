echo "Switching to branch Kbollins"
git checkout Kbollins

echo "Deploying to server"
scp -r ./* david@35.202.222.250:/var/www/website-staging/

echo "done"