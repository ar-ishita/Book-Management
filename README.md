# Book-Management

# Objective
<ul><li>Manage a database of books, including their titles, authors, ISBNs, publication dates, prices, and stock levels. Allow administrators to add, update, and delete books.</li></ul>

# Key Feature
<ul>
  <li>User Friendly UI.</li>
  <li>CRUD Operations.</li>
  <li>Used MongoDB for data persistance.</li>
  <li>The code includes a mapping for the root ("/") URL that redirects to the Swagger UI page. This is a useful feature for documenting and testing the API.</li>
  <li>Implemented Aggregation for the search result in MongoDB</li>
</ul>
  
# Tech Stack
<ul>
  <li>Java</li>
  <li>Spring Boot</li>
  <li>MongoDB (Database)</li>
  <li>React</li>
</ul>

# Benefits
<ul>
  <li> It exposes a RESTful API, making it easy to integrate with various clients, including web applications, mobile apps, and other services.</li>
  <li>By using the @CrossOrigin annotation, the controller allows cross-origin requests from "http://localhost:3000."</li>
  <li>The controller includes error handling to ensure that exceptions are properly caught and handled. It returns error responses with meaningful status codes and messages.</li>
</ul>

