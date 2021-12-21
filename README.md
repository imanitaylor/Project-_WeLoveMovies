## Project Overview

Created database and back-end application for an API which returns information about movies, theaters, reviews and critics. 

### Built with:
- PostgreSQL
- Node.js
- Express.js
- Knex.js


### In this project, I did the following:

- Installed and used common middleware packages.
- Built application that receives requests through routes and accesses relevant information through route and query parameters.
- Ran tests from the command line.
- Created an error handler for the case where a route does not exist.
- Built an API following RESTful design principles.
- Created and customize a knexfile.js file.
- Created a connection to the database with knex.
- Wrote database queries to complete CRUD routes in an Express server.
- Returned joined and nested data with Knex.
- Wrote database migrations using Knex's migration tools.
- Deployed back end server to a cloud service.

### Routes
The following routes and methods are available:

**Movies**

&emsp; */movies* </br>
&emsp; &emsp; GET returns all columns for each movie in the database

&emsp; */movies?is_showing=true* </br>
&emsp; &emsp; GET returns all columns for each movie in database that is currently showing

&emsp; */movies/:movieId* </br>
&emsp; &emsp; GET returns all columns for requested movie

&emsp; */movies/:movieId/theaters* </br>
&emsp; &emsp; GET returns all columns for theater where the requested movie is playing

&emsp; */movies/:movieId/reviews* </br>
&emsp; &emsp; GET returns all columns, including detailed critic data, for each review of the requested movie

**Reviews**

&emsp; */reviews/:reviewId* </br>
&emsp; &emsp; PUT updates data for requested review and returns all columns for that review including updated and detailed critic data </br>
&emsp; &emsp; DELETE deletes requested review from database

**Theaters**

&emsp; */theaters* </br>
&emsp; &emsp; GET returns all columns for each theater in the database with detailed movie data for each movie showing at that theater
