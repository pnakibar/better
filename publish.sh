rm service/public/*
cd app
webpack -p
cd ..
cp app/build/* service/public
git subtree push --prefix service origin publish
