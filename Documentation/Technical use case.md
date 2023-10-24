# Notes

- [ ]  write email for AWS access

The tool is to help intern methods of looking and searching through data of cars or automotive vehicles. 

### Requirement:

- minimal working example (MVP)
    - Doesn’t need to focus on the UI/UX.
- An It officer can create a new instance for the particular project. Using CLI tools in our case terraform.
- User: They should be able to upload document (.CSV) and see the data with any pipeline operation(like word count)
    - UI is not main focus
    - Need to have a filter search bar, where the processed data can be filtered and searched. Furthermore can also be seen in the frontend
    - Access management: A simple login is enough (Auth0), and different users need not to have different level of access. Once a user is registered, the user has access to all the data in the database
- Backend:
    - Interacts with DB and calls the pipeline (Apache Airflow)
    - Apache Airflow:
        - takes in data
        - Does the processing like word count or any key, values operation
        - Sends the result back to backend
    - Backend saves result to a DB as a key value pair

<aside>
💡 The whole Infrastructure needs to be deployed using terraform in a EKS cluster

</aside>