# FitCheck Express Server

## Set Up

```sh
cd FitCheck/express-server
npm install
node index
```

## Endpoints (all endpoints are POST)

### Posts

| Endpoint     | Description                              | Required Content                                         | Optional Content | Return JSON Properties                                                                        |
|--------------|------------------------------------------|----------------------------------------------------------|------------------|-----------------------------------------------------------------------------------------------|
| ```/post/new```    | Create a new post                        | **image_url** (string), **description** (string), **title** (string), **user_id** (string), **tags** (string) | **clothes** (Object) | **id** - post id, **successful** - Whether or not the post was made correctly                          |
| ```/post/delete``` | Delete an existing post                  | **id** (string)                                              | **N/A**            | **successful** - Whether or not the post was deleted correctly                                    |
| ```/post/get```    | Retrieve data regarding an existing post | **id** (string)                                              |**N/A**            | **successful** - Whether or not the post was successfully retrieved, **content** - data regarding post |
| ```/post/like```    | like a post | **user_id** (string), **post_id** (string)                                              |**N/A**            | **successful** - Whether or not the post was successfully liked |
| ```/post/unlike```    | unlike a post | **user_id** (string), **post_id** (string)                                              |**N/A**            | **successful** - Whether or not the post was successfully unliked |


### Users

| Endpoint         | Description                                               | Required Content                     | Optional Content                                                                                | Return JSON Properties                                                           |
|------------------|-----------------------------------------------------------|--------------------------------------|-------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| ```/users/get ```       | Retrieve data regarding a user                            | **id** (string)                          | **N/A**                                                                                             | **User Data**                                                                  |
| ``` /users/update```     | Update data regarding a user.                             | **id** (string)                          | **profile_pic_url** (string), **profile_banner_url** (string), **display_name** (string), **username** (string) | **successful** - Whether or not the userdata was successfully updated                |
| ```/users/follow```     | Have one user follow another                              | **follower** (string), **followed** (string) | **N/A**                                                                                             | **successful** - Whether or not the user successfully followed the other user.       |
| ```/users/unfollow```   | Have one user unfollow another                            | **followed** (string), **followed (string)** | **N/A**                                                                                             | **successful** - Whether or not the user successfully unfollowed the other user      |
| ```/users/followers```  | Retrieve a list of a users following and/or follower list | **id** (string)                          | **followers** (boolean), ****following**** (boolean)                                                        | Depends on optional content, can provide either **both** lists, _or_ **just** one of them. |