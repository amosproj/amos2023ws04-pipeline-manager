## Backend

### Database setup
For manually setting up the mongoDB. Please follow the official documentation. (https://www.mongodb.com)

Or use an adjusted docker-compose.yml without the app.
```
version: '3.8'
services:
  db:
    image: mongo:latest
    hostname: amos_mongodb
    environment:
      - MONGO_INITDB_DATABASE=dpms_db
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=pass
    volumes:
       - ./tmpDatabase:/docker-databases
    ports:
      - 27017:27017
```


### Installing dependencies with pipenv

Navigate to the backend directory. Run pipenv install to install dependencies. To add dependencies, simply type

```pipenv install -r requirements.txt```

This will update the Pipfile and Pipfile.lock automatically.

### Environment variables

Copy the template into an .env file
```cp .env.template .env```

You need the following environment variables in a .env file and adjust them to the right parameters.

<ol>
  <li>AWS_ACCESS_KEY -  you can generate a keypair in the aws console</li>
  <li>AWS_SECRET_KEY - you can generate a keypair in the aws console</li>
  <li>REGION - aws region that the bucket is in</li>
  <li>BUCKET_NAME - name of the s3 bucket</li>
  <li>AIRFLOW_SERVER_URL - url of the airflow server</li>
  <li>AIRFLOW_USERNAME</li>
  <li>AIRFLOW_PASSWORD</li>
  <li>OIDC_SECRET_KEY - oidc secret if you enable kecloak</li>
  <li>ENABLE_KEYCLOAK - True/False</li>
</ol>

### Running the Backend App

Navigate to the src directory. In your terminal, type:

```
python -u app.py
```

## Dependencies

See the [requirements.txt](requirements.txt) for the dependencies.


