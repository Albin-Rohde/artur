## This is the Artur project

### Step by step guide to get app up and running

### Requirements

- docker
- docker-compose
- node (at least 14) + npm

#### Prerequisites

- github account
- ssh key linked to the account
- invite to the project

#### Set up project for unix

Easiest way to setup project if you are running a unix system (linux/mac)

run following in your terminal where you want the project to be. The script will create a `./artur` folder for you.

```bash
curl https://raw.githubusercontent.com/albinr99salt/artur/master/setup.sh | sudo sh
```

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
