# Spring Users

## Getting Started
To getting started you must have the following requirements
- Java 17: openjdk 17.0.10 2024-01-16
- MySQL: Latest
- Node: v21.6.2

After meeting these requirements, you need to run the utilities first to run in development mode.

### Development mode

First, you must install the dependencies of the utilities and start the utilities.

```bash
cd utils
yarn install
yarn start
```
After this, you must run the Spring Boot API with the following command to enable hot reload:

```bash
cd api
 ./gradlew bootRun --continuous
```