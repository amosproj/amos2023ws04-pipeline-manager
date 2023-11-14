Build, user, and technical documentation
Software architecture description


#Start build backend with docker
docker build -t flask-app:latest src/backend

docker run -p 5000 flask-app:latest

#Start backend 
pip install -r src/backend/requirements.txt
python src/backend/app.py