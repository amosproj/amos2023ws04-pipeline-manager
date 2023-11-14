FROM python:3.12-bullseye

WORKDIR /backend

COPY requirements.txt requirements.txt
COPY .env .env

RUN pip install -r requirements.txt

RUN pip install python-dotenv

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
