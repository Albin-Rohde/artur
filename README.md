## This is the Artur project 

### Step by step guide to get app up and running

### Requirements
- docker
- docker-compose
- node (at least 14) + npm


### Dev steps
1. Create global .env file for docker-compose by running 
   ```bash
   cp .env.schema .env
   ```
1. Install server dependencies run
   ```bash
   cd ./server && npm i && cd ..
   ```
3. Install frontend dependencies run
   ```bash
   cd ./frontend && npm i && cd ..
   ```
4. Start the app by running `docker-compose up`, in root of project.
