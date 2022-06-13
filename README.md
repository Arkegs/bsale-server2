# BSale challenge (Server)
Single server app that serves JSON data through RESTful API, created with Node.js, MySQL and Express.js. 

___

## Table of contents
* [Project info](#project-info)
* [Endpoints](#endpoints)
* [Responses](#responses)
* [Technologies](#technologies)
* [Setup](#setup)

## Project info
This project is a simple server app that serves data through RESTful API. It fetches data from a connected MySQL database which can be configured
through Environment variables: 'DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', and optionally 'CLIENT_URL' in case it is necessary to set up CORS for a client app. This server app has the following endpoints:

## Endpoints

| Endpoint                                          | Description                                                                                 |
| ------------------------------------------------- |---------------------------------------------------------------------------------------------|
| `GET`/products                   | Endpoint to get all products. Can be filtered through certain optional query parameters.    |
| `GET`/products/{product_id}      | Endpoint to get a single product through its ID.                                            |
| `GET`/categories                 | Endpoint to get all the available categories on DB.                                              |
___

### `official client only`/products

| Key           | Value                                                                                       |
| ------------- |---------------------------------------------------------------------------------------------------------------------------------|
| ?search `string`       | (optional) The string that will be used as search term. If present, the server will send only the values that contain the given search term. This key can not be combined with "category" key.       |
| ?category `integer`      | (optional) The ID of the category that will filter the results. If present, the server will only send the values that belong to the given category. This key can not be combined with "search" key.                                           |
| ?&sort `string`          | (optional) If present, all results will be sorted depending on the given value, which only can be: 'price_asc', 'price_desc', 'name_asc' and 'name_desc'.                                               |
| ?&page `integer`          | (optional) The number of page to be retrieved. A page consists of 8 entries from a SQL query.                                      |

### `official client only`/products/{product_id}

| Key           | Value                                                                                       |
| ------------- |---------------------------------------------------------------------------------------------------------------------------------|
| {product_id} `integer`       | (Mandatory) The ID of the product to be retrieved      |      

### Examples

```
GET /products?search=Item&sort=price_asc
GET /products?category=1&page=2
GET /produtcs?sort=price_asc&page=4
GET /products/123
GET /categories
```

## Responses

Every endpoint will return a JSON object with three possible values:
* status: String that reveals if the API call was successful, failed or had an error. Possible values: 'success', 'fail', 'error'
* data: Array that contains the retrieved entries if the API was successful. This array is empty if the request failed or had an error.
* message: String that contains any problem information only if the request failed or had an error.

### Example

```
{
    status: "success",
    data: [
        {
            id: 1, 
            name: dummy, 
            category: 1
        },
        {
            id: 2,
            name: dummy2,
            category: 2,
            price: 2
        }
    ],
    message: ""
}
```
	
## Technologies
Project is created with:
* Express ^4.18.1
* Node.js ^14.18.1
* MySQL (Node module) ^2.18.1
* CORS ^2.8.5

## Setup
To run this project, dependencies must be first installed. After that, the project is run by executing through node the index.js file:

```
$ cd ../server2
$ npm install
$ node index.js
```


