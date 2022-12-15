# CMS škola back

## Osnovne informacije

 - port: 8081
 - [Swagger](http://localhost:8081/api/swagger-ui/index.html#/)
 - Super user: username=superadmin, password=superadmin

## Pokretanje aplikacije

### Potrebno

 - [Java barem vezija 17](https://www.oracle.com/java/technologies/downloads/)
 - [Maven](https://maven.apache.org/download.cgi)
 - [Dodati maven i Javu u PATH varijablu](https://maven.apache.org/install.html)
 - ili IDE recimo Intellij, Eclipse ili [VS Code sa ekstenzijama](https://code.visualstudio.com/docs/java/java-spring-boot)
 - za lokalnu emulaciju [Postgre server](https://www.postgresql.org/download/)

Potrebno je imati usera admin s lozinkom admin na bazi te cmsschool databazu

`CREATE USER ADMIN WITH PASSWORD 'admin' SUPERUSER`  
`CREATE DATABASE cmsschool`

### Pokretanje preko komandne linije
 
 Ukoliko se aplikacija pokreće kroz konzlu potrebno je premjestiti se u folder gdje se nalazi pom.xml  

 `mvn package -DskipTests`  
 `java -jar target/cmsskola-0.0.1-SNAPSHOT.jar`


 