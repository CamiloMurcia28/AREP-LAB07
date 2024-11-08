# TALLER 8: MICROSERVICIOS

## Descripción de la aplicación 📖

Una aplicación web construida con [quarkus](https://quarkus.io/) que permite a los usuarios autenticarse, por medio de [JWT](https://jwt.io/) para acceder a una página que contienen publicaciones al estilo de twitter. Los usuarios pueden realizar publicaciones, las cuales se almacenan en una base de datos no relacional [MongoDB](https://www.mongodb.com/). La aplicación se despliega en [AWS](https://aws.amazon.com/) y se utiliza [Amazon Cognito](https://aws.amazon.com/cognito/) para la autenticación de los usuarios. Además, se utilizan funciones [AWS Lambda](https://aws.amazon.com/lambda/) para almacenar y obtener los datos de la base de datos. El [Amazon API Gateway](https://aws.amazon.com/api-gateway/) se encarga de enrutar las solicitudes de los usuarios a los componentes adecuados de la aplicación. Ver la arquitectura de la aplicación [aquí](#arquitecura-de-la-aplicación-).

## Comenzando 

Las siguientes instrucciones permitirán obtener una copia del proyecto en su máquina local para fines de prueba.

### Requisitos 📋

- [Git](https://git-scm.com/) - Control de versiones
- [Maven](https://maven.apache.org/) - Gestor de dependencias
- [Java](https://www.oracle.com/java/technologies/downloads/#java17) - Lenguaje de programación
- [Docker](https://www.docker.com/) - Motor de contenedores

> Es necesario tener instalado Git, Maven, Docker y Java 17 para poder ejecutar el proyecto.

### Instalación 

Realice los siguientes pasos para clonar el proyecto.

```bash
git clone https://github.com/CamiloMurcia28/AREP-LAB07.git
```

## Ejecución

Para crear un monolito para realizar pruebas locales, ejecute el siguiente comando en la raíz del proyecto.

```bash
mvn clean package
docker-compose up -d
```

El anterior comando limpiará las construcciones previas, compilará y luego ejecutará en distintos contenedores los servicios de la aplicación.

Diríjase a su navegador de preferencia y vaya a la siguiente dirección: [http://localhost:8080](http://localhost:8080) para ver la aplicación en funcionamiento. Podrá usar las credenciales de la siguiente tabla para ingresar a la aplicación.

| Usuario    | Contraseña      |
|------------|-----------------|
| Camilo     | CamiloMurcia28  |
| Daniel     | Knight072       |

## Arquitectura de la aplicación 

Los componentes principales de la arquitectura son los siguientes:

**Amazon API Gateway**: La API Gateway es un servicio de AWS que enruta las solicitudes de los usuarios a los componentes adecuados de la aplicación.

**AWS Lambda**: Lambda es un servicio de AWS que permite ejecutar código sin aprovisionar o administrar servidores. En este caso, Lambda se utiliza para ejecutar las funciones sin servidor de la aplicación.

**Amazon S3**: S3 es un servicio de almacenamiento de objetos de AWS que se utiliza para almacenar los datos de la aplicación.

**MongoDB**: MongoDB es una base de datos de documentos no relacionales que se utiliza para almacenar los datos de la aplicación.

**Amazon Cognito**: Cognito es un servicio de administración de identidad y acceso de AWS que se utiliza para autenticar a los usuarios de la aplicación.

Las funciones sin servidor de la aplicación se activan cuando los usuarios realizan solicitudes a la API Gateway.

![arquitectura-taller-8](https://github.com/ELS4NTA/AREP/assets/99996670/a8ecac8c-321e-4619-a093-653b804bf028)


## Versionado

  ![AREP LAB 08](https://img.shields.io/badge/AREP_LAB_08-v1.0.0-blue)\
  [![Static Badge](https://img.shields.io/badge/AREP_LAB_08_DESPLIEGUE-v1.0.0-blue)](https://github.com/An6ie02/AREP-TALLER-08/tree/deploy)

## Autores 

- **Daniel Rojas**  - [Knight072](https://github.com/Knight072)
- **Camilo Murcia** - [CamiloMurcia28](https://github.com/CamiloMurcia28)

## Licencia 

[![License: CC BY-SA 4.0](https://licensebuttons.net/l/by-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-sa/4.0/deed.es)

Este proyecto está bajo la licencia de Creative Commons Atribución-CompartirIgual 4.0 Internacional (CC BY-SA 4.0) - Ver el archivo [LICENSE](LICENSE) para más detalles.
