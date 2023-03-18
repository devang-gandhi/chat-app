
# Create one application with socket chat

- Create user
- Login user
- Request to another user for chat
- If accepted request, two user can start chat
- Use JWT authentication
- Add validations

# How to start server

- First step would be to install all required packages so run npm install or npm i
- run command npm start 

    ```json
    configure .env file having variables
    PORT = '' DB_URL = '' TOKEN = ''
    ```

# API routes 

`request body will be attached below)`

- /register (to create user)
    ```json
    {
    "username" : "XYZ",
    "email" : "rst@email.com",
    "password" : "xyz-1234"
    }
    ```

- /login (to generate JWT token)
    ```json
    {
    "email" : "abc@email.com",
    "password" : "abc-1234"
    }
    ```
- /allusers/:id (to getAll users list but it is protected by middleware so not everyone can access it)

    ```json
    pass auth-token in header which we will be getting while logged in
    localhost:3000/allusers/64155635cdf476efcb0a6887
    ```

- /acceptRequest/:id/:req_user_id add all userids whose request is accepted by user

    ```json
    pass auth-token in header which we will be     getting while logged in
    localhost:3000/allusers/64155635cdf476efcb0a6887/641559b23f45e5f6dbf86085
    ```

- /chat/addmsg (save message in DB)

    `    pass auth-token in header which we will be getting while logged in`
    ```json
    {
    "from" : "64155635cdf476efcb0a6887",
    "to" : "641559b23f45e5f6dbf86085",
    "message" : "Hello buddy!"
    }
    ```

- /chat/getmsg (get all messages From DB in terms of fromUser and toUser)

    `pass auth-token in header which we will be getting while logged in`

    ```json
    {
    "from" : "64155635cdf476efcb0a6887",
    "to" : "641559b23f45e5f6dbf86085"
    }
    ```

# Socket events

- 'add-user' event will add all users users who is connected via socket in Map. (Online users)

- 'req-msg' event will send an json data which has user_id to send an request and simple message string

- 'send-msg' event will emit and event called recieve message based on user request approval and get all msg to display and also stores message in DB using APIs 

    ```json
    {
    "from" : "64155635cdf476efcb0a6887",
    "to" : "641559b23f45e5f6dbf86085",
    "message" : "Hello buddy!",
    "flag" : 1
    }
    ```

- Also mentioned frontEnd socket event which needs to be handled in order to run application. 
