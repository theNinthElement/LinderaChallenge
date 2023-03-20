# Lindera API 

```
cd backend-challenge-main 
npm i 
```

 
To run the program : 
~~~
 npm run start 
~~~

* Here we have an user data service. The service creates a user with name, birthdate, zip code, and phone number. 
  * To add user :

    apiendpoint: 
    ```
    localhost:3000/users/create 
    ```

    message Body : 
    ```
    {"name":"Bruce Wayne", 
    "birthdate": "02.02.1988", 
    "zipCode":"12312", 
    "phoneNumber":"0123456789"}
    ```

* The api provides a Login service to create a authenticator for an valid user. 

    apiendpoint: /users/login 

    message Body : 
    ```
    {"name":"Bruce Wayne", 
    "birthdate": "02.02.1988", 
    "zipCode":"12312", 
    "phoneNumber":"0123456789"}
    ```

    returns an Autheticator token

* The Api has a retrieve service per user level.

    ```
    /users/:userId 
    ```

* The API has an update option where an user can update their details 

* The API has an option to delete user if required. 

* The Api can also be called to retrieve all the users with Pagination and sorting. 
    ```
    example = /users?sortBy=updatedAt:desc&page=1&limit=5
    ```

* The API is also on a cloud server and can be accessed through 
    ```
    https://lindera-ch-api.herokuapp.com/
    ```
