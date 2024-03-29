# Data Pipeline and Storage Manager (AMOS WS 2023/2024)
<p align="center">
<img src="Deliverables%2Fsprint-01%2FDPSM%20Team%20Logo.jpg"  width="30%" height="30%">
</p>

## Project description

The goal of this project is to develop a cloud-native pipelining (CNP) service that facilitates the analysis and management of project data. A project can request a data pipeline and storage, and then load the data into the pipeline. The loaded raw data is stored in a storage bucket, the insights gained from the raw data are stored in a database. The end user is provided with a frontend to upload the data, and to access and analyse the stored data.

## Getting started

### pre-requisite

- Docker installed and configured
    - `docker —version` ~ Docker version 24.0.6
    - `docker compose version` ~ Docker Compose version v2.23.0-desktop.1
- Amazon S3 Bucket (https://aws.amazon.com/en/s3/)
  - create and setup an S3 Bucket for file storage
- Keycloak
  - https/SSL is required for keycloak to work. [README.md](src%2Fkeycloak%2FREADME.md)
  


## Clone the repo

Clone the repo: 

```bash
git clone https://github.com/amosproj/amos2023ws04-pipeline-manager.git
```

Navigate to the main root folder using:

```bash
cd amos2023ws04-pipeline-manager
```

As we have secrets in the backend app, we need to copy the template env to an .env
```bash
cp src/backend/.env.template src/backend/.env
cp src/backend/client_secrets.template.json src/backend/client_secrets.json

```
And then configure the environment variables to connect to your ASW and Apache Airflow connections.

To build the images:
```bash
docker compose build
```
And then in order to get the system up and running, execute the following:

```bash
docker compose up -d # in detached mode
```

<aside>
ℹ️ For first time it could take a while to download images and configure it , but the consecutive builds will be faster.

</aside>

## Software Components and Functionality

**Deployment Pipeline Functionality**
1. An IT staff member can roll out an instance of a CNP at the request of a project.
2. The deployment pipeline provides the entire infrastructure consisting of frontend, backend, data pipeline, storage, and database so that a project member can then work with the CNP.
3. The deployed frontend is accessible from the internet.

**Frontend Functionality**
1. A user can upload his data through the provisioned CNP and select a data pipeline suitable for that purpose.
2. A user can search and retrieve relevant information from his CNP project and associated data.
3. A user can check and control the status of the CNP project.

**Backend Functionality**

The backend takes care of the orchestration of the described software components, with the following rough process flow:
1. Access control to the project and project data using an appropriate IAM system
2. Receiving the data provided via the frontend
3. Forwarding the data to the data pipeline
4. Transfer of the prepared data and raw data to the storage system and database
<hr>

### SD Issue creation Guidelines
Please take a look at the SD wiki for creating personal tickets/Issues for the project. 

[Issue creation Guidlines for SD's](Documentation/SD_Issue_Guidelines.md)

<hr>

### Documentations

- [Frontend Documentation](src/frontend/README.md)
- [Backend Documentation](src/backend/README.md)
- [Data pipeline Documentation ](src/datapipeline/README.md)



### contributers

* @keldami
* @krutarth4
* @bhanuPrakashMa
* @sravanthidatla78
* @ingunnaf
* @CAgcoder
* @elementator
* @lalitha2395


<hr>
