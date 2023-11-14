FROM python:3.12-bullseye
ADD . /app
WORKDIR /app
RUN pip install -r requirements.txt

RUN pip install python-dotenv

COPY . .

EXPOSE 8000

CMD ["python", "app.py"]
