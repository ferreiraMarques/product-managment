
# Product Managment

Product Managment Test



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET`: jwt secret for the firm

`DB_URL`: url to the database


## Deployment

To deploy this project run

```bash
  git add .
  git commit -m "commit"
  git push origin dev
  create pull request to master
  deploy to docker hub
```


## Installation

Install product-management with npm

```bash
  cd product-management
  npm i
  npm run start
```
    
## API Reference

### Authentication
#### Login
Description: this endpoint is used to authenticate with the system via email and password, it will return the access token and username.


```http
  POST {{baseUrl}}/auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. email user |
| `password ` | `string` | **Required**. password user|


### Products


#### Create Product
Description: this end point is used to create a new product and add to store.


```http
  POST {{baseUrl}}/products
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. name product |
| `price`      | `decimal` | **Required**. price product |
| `description`      | `string` | **Required**. description product |
| `storeId`      | `integer` | **Required**. Id store |
| `stock`      | `integer` | **Required**. stock of product |


#### Get Products
Description: this endpoint is used to obtain all registered products.


```http
  GET {{baseUrl}}/products 
```

#### Get Product
Description: this endpoint is used to obtain a single product if it is registered.


```http
  GET {{baseUrl}}/products/{{productId}}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `productId` | `integer` | **Required**. id product |


#### Update Product
Description: this endpoint is used to update the data of a product.


```http
  PUT {{baseUrl}}/products/{{productId}} 
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `productId` | `integer` | **Required**. id product |
| `name`      | `string` | **Required**. name product |
| `price`      | `decimal` | **Required**. price product |
| `description`      | `string` | **Required**. description product |
| `storeId`      | `integer` | **Required**. Id store |
| `stock`      | `integer` | **Required**. stock of product |


#### Delete Product
Description: this end point is used to eliminate a product.


```http
  DELETE {{baseUrl}}/products/{{productId}}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `productId` | `integer` | **Required**. id product |



### Stores


#### Create Store
Description: this endpoint is used to create a new locale.


```http
  POST {{baseUrl}}/stores 
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. name store |
| `address`      | `string` | **Required**. address store |
| `phone`      | `integer` | **Required**.phone store example: +5601235678908 |


#### Get Stores
Description: this endpoint is used to get all registered stores.



```http
  GET {{baseUrl}}/stores 
```

#### Get Store
Description: this endpoint is used to obtain a store if it is registered.


```http
  GET {{baseUrl}}/stores/{{storeId}} 
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `storeId` | `integer` | **Required**. id store |


#### Update Store
Description: this endpoint is used to update the data of a store.


```http
  PUT {{baseUrl}}/stores/{{storeId}}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `storeId`      | `integer` | **Required**. id store |
| `name`      | `string` | **Required**. name store |
| `address`      | `string` | **Required**. address store |
| `phone`      | `integer` | **Required**.phone store example: +5601235678908 |


#### Delete Store
Description: this end point is used to eliminate a store.


```http
  DELETE {{baseUrl}}/stores/{{storeId}} 
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `storeId` | `integer` | **Required**. id store |

