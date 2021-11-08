## This is the Artur project 

### Step by step guide to get app up and running

#### Requirements
- docker
- docker-compose
- node (at least 14) + npm and yarn


#### Dev steps
1. Install server dependencies go to server root 
   (`cd /server`) and run `yarn`

2. Create .env file for server by running `cp .env.schema .env`
  from server root
   
3. Install frontend dependencies go to frontend root 
   (`cd /frontend`) and run `npm i`
4. Start the app by running `docker-compose up`, in root of project.


#### Prod steps
1. Create .env file for server by running `cp .env.schema .env`
   from server root
2. Start the app by running `docker-compose up`, in root of project.
