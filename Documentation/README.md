Build, user, and technical documentation
Software architecture description


#Start with docker-compose
docker-compose build
docker-compose up -d

#Start build backend with docker
docker build -t flask-app:latest src/backend
docker run -p 5000 flask-app:latest

In this case you have to start a mongo database yourself


#Start backend 
pip install -r src/backend/requirements.txt
python src/backend/app.py

