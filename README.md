# Bregg

Overview:
Bregg - Easy way to connect with friends, add them to your group, get recommendations from Google and vote on a destination. 

DEPLOYMENT LOGIN WITH FRIENDS AND GROUPS ALREADY. Username: P4, Password: 12345

Django Backend STARTUP
To get this running locally you must have both the backend and the front end server running. Python 3 will be needed and you should be able to install all the python libarires needed through the requirements.txt
Once all libraries have installed, you may not need to makemigrations and migrate. After doing that, you should be able to python manage.py runserver. 

FRONT END START UP 
To get the front end server running, you will need npm and also nodejs installed. The latest version for both of them should be fine. YARN will not be available to use, so you must have npm and nodejs. After both these latest versions have been created, we need to then install all the dependencies and libraries needed for the front end. NPM install inside the directory of the front (bregg_frontend). If npm can’t be installed you might need to update your npm or nodejs. If this still doesnt work, then you might need to do some node modules eject. If this is the case then you may need to contact stack overflow. After all libarires have been installed, then run npm start inside bregg_frontend. The bregg_frontend should spin up a server. In another tab, you also need the ./manage.py runserver running. Once both are running, remember that you must go on localhost:8000 instead of localhost:3000. 

Jest test cases can be a bit tricky to run. Sometimes when you do npm install which does the installation for all the packages, Jest will not install properly. Also there are cases where the envrionmental variables are not setup correctly for the Jest unit test cases. However assuming that these work, then you should be able in the root directory of bregg_frontend run npm run jest. These will then run through the test cases for the Jest unit tests. 

The deployed version hosted publicly at: http://52.64.163.163,. Getting this running is a lot easier. 
The backend is run automatically at reboot at port 8001, nginx automatically runs and splits user traffic to the React frontend, react’s queries to the backend are passed through nginx to port 8081 where the backend processes them.







