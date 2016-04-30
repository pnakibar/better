rm service/public/*
cd app
webpack -p
cd ..
cp app/build/* service/public
git add .
git commit -m 'publish'
git subtree push --prefix service origin publish
