git clone git@github.com:albinr99salt/artur.git

cd artur

cp .env.schema .env

cd server && npm i && cd ../frontend && npm i && npm run firebase-fix && cd ../

docker-compose up

