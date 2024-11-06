# AREP-LAB05
LAB 05 - AREP

# Property Management CRUD System

## Introduction

This workshop emphasizes key software development skills such as client-server communication, REST API design, database persistence with JPA/Hibernate, and handling errors. Optional enhancements like pagination, search functionality, and user feedback are encouraged to further improve the application.


## Application description

The developed application is a manager for a property list. It allows users to add property to a list along with a detailed description to facilitate organization and tracking during shopping. The application demonstrates how the web server can handle requests to add property, list existing property, and serve static content such as HTML, using Spring Boot frameworks.

## Starting

The following instructions will allow you to get a working copy of the project on your local machine for development and testing purposes.

### Build with:
    
* [Git](https://git-scm.com) - Version Control System
* [Maven](https://maven.apache.org/download.cgi) -  Dependency Management
* [java](https://www.oracle.com/java/technologies/downloads/#java22) - Programming Language

### Requirements:

#### ⚠️ Important

You need to have installed Git, Maven 3.9.9 and Java 17 to be able to execute the proyect

## Project Summary

This Property Management System is a web-based application that allows users to:

* Add new property listings
* View a complete list of properties along with detailed information for each
* Modify existing property details
* Remove property listings
* The application features a frontend built with HTML and JavaScript, a backend REST API implemented using Spring Boot, and a MySQL database for storing and managing data.


## System Architecture

The system is designed with a three-tier architecture and is deployed on AWS:

* Frontend: HTML + JavaScript
    * Runs in the user's browser
    * Communicates with the backend API via AJAX or Fetch API

* Backend: Spring Boot REST API

    * Deployed on EC2 instance 1
    * Provides RESTful endpoints for CRUD operations
    *  Manages business logic and data validation
    *  Interacts with the database using JPA/Hibernate

* Database: MySQL

    * Hosted on EC2 instance 2
    * Stores property information in the properties table

#### System Interaction
The interaction between the system components follows a clear flow:

1. Frontend (HTML + JavaScript): The user interacts with the web interface to create, view, update, or delete property listings. These actions trigger AJAX or Fetch API calls to the backend.

2. Backend (Spring Boot REST API): The backend receives the requests from the frontend, processes them (business logic, data validation), and interacts with the database via JPA/Hibernate to either retrieve or modify data. It then returns the response (e.g., success/failure, data) back to the frontend.

3. Database (MySQL): The backend communicates with the MySQL database hosted on EC2 instance 2, where all property data is stored. CRUD operations are performed on the properties table, and the results are sent back to the backend, which in turn responds to the frontend, updating the user interface as necessary.

### Architecture Diagram
```mermaid
graph TD
    Client_Browser[Client Browser HTML/JS] -->|HTTP/HTTPS| EC2_Instance_1[EC2 Instance 1]
    EC2_Instance_1 --> Spring_Boot_API[Spring Boot API]
    Spring_Boot_API --> Property_Controller[Property Controller]
    Property_Controller --> Service_Layer[Service Layer]
    Service_Layer --> Property_Service[Property Service]
    Property_Service --> Data_Access[Data Access]
    Data_Access --> Property_Repository[Property Repository]
    Property_Repository --> JPA[ JPA / Hibernate]
    JPA --> EC2_Instance_2[EC2 Instance 2]
    EC2_Instance_2 --> MySQL[MySQL Database]
    MySQL -->|Data Storage| MySQL_DB[(MySQL)]
```


## Class Design

Key classes in the system include:

* Property: Represents a real estate property with attributes such as ID, address, price, size, and description.
* PropertyService: Handles business logic for property management.
* AllControlller: Handles HTTP requests directed at the root URL ("/").
* RealStateController: Exposes REST endpoints for property operations.
* PropertyRepository: Interfaces with the database for data persistence.


## Deployment Instructions

### Installation and Execution

To install and run this application locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/CamiloMurcia28/AREP-LAB05.git
cd AREP-LAB05
```

2. Build and run:

```bash
mvn clean install
docker-compose up -d
mvn spring-boot:run
```

3. Open the application in a web browser:

Navigate to http://localhost:8080/index.html to interact with the application.

### Deployment

To deploy the system on AWS:

1. Set up an EC2 instance (Instance 1) for the Spring Boot backend service
2. Set up another EC2 instance (Instance 2) for the MySQL database
3. Configure security groups to allow necessary traffic between the instances and from the internet to Instance 1
4. Deploy the frontend HTML/JS files to Instance 1 or serve them from a separate web server
5. Start the Spring Boot service on Instance 1
6. Ensure MySQL is running and properly configured on Instance 2

It's important to know that you must change the application.properties file to adapt it to aws mySQL database:

![Screenshot 2024-09-30 185517](https://github.com/user-attachments/assets/63101708-64e9-4e2b-9359-f12fa4cf1968)


 ## Deployment Video of the system running

 [VIDEO AWS EC2](https://youtu.be/qo7sLoDTja4)
   
## Running Tests

To execute the test: 

```bash
mvn test
```

![image](https://github.com/user-attachments/assets/aa106e3d-f528-4d15-953b-5118fcc92b3c)

getPropertyById_Found: Checks that an existing property can be retrieved by its ID.
getPropertyById_NotFound: Checks that "NOT_FOUND" is returned when searching for a non-existent property.
createProperty: Tests the creation of a new property.
updateProperty_Found: Checks the update of an existing property.
deleteProperty_Found: Checks the deletion of an existing property.
whenSaveProperty_thenReturnProperty: Tests that a property is successfully saved.
whenFindById_thenReturnProperty: Checks that a property can be found by its ID.
whenFindAll_thenReturnPropertyList: Checks that all properties can be retrieved.
whenDeleteById_thenPropertyShouldNotExist: Checks that a property is successfully deleted by its ID.

These tests cover basic CRUD operations (Create, Read, Update, Delete) for the project.

Create: 
![image](https://github.com/user-attachments/assets/7308c5cc-63d2-4193-bcd0-3071d606cebb)

Read: 
![image](https://github.com/user-attachments/assets/1ac8cbf3-644a-44c0-81d1-b7543d76fc8f)

Update: 
![image](https://github.com/user-attachments/assets/87437762-c1fe-4d15-b8a0-5c6fa6733a35)

Delete: 
![image](https://github.com/user-attachments/assets/55acaf4b-e7bc-4ddf-8978-37f41ee3a351)
![image](https://github.com/user-attachments/assets/6f360e5f-b51f-4fef-aa58-1624cedfe679)

#### Optional Enhancements (for extra credit):

![Recording 2024-10-01 150240](https://github.com/user-attachments/assets/3c8d32c1-a550-4ad0-82ed-dc55799e2ce7)

![image](https://github.com/user-attachments/assets/1df8655c-3f1f-411b-80f4-202398966394)

![image](https://github.com/user-attachments/assets/5ae3db08-594a-4fc9-9a82-4133cacd5b64)


## Built With
    * Spring Boot - The backend framework
    * React - The frontend library
    * MySQL - Database
    * Maven - Dependency Management
    * npm - Package Manager for JavaScript

## Versioning

![AREP LAB 05](https://img.shields.io/badge/AREP_LAB_05-v1.0.0-blue)

## Authors 

- Camilo Murcia Espinosa and Daniel Rojas

## License

[![License: CC BY-SA 4.0](https://licensebuttons.net/l/by-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-sa/4.0/deed.es)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) for details

## Acknowledgements

- To Professor [Luis Daniel Benavides Navarro](https://ldbn.is.escuelaing.edu.co) for sharing his knowledge.


