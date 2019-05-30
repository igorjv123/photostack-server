# Запуск
```
- npm install
- (sudo) mongod
- npm start
```
# Start page
- GET `/` початкова сторінка
# Users 
- GET `api/users` - повертає всіх користувачів
- GET `api/users/:id` - повертає користувача з даним id
- DELETE `api/users/:id` - видаляє користувача з даним id
- POST `api/users` - додає користувача. Приклад body:
```
    {
        "name": "Duke",
        "email": "duke@crud.com",
        "phone": "2222-320"
    }
  ```
- PUT `api/users/:id` - оновлює користувача з даним id. Приклад body:
```
   {
        "name": "Robin",
        "email": "robin@crud.com",
        "phone": "2222-320"
    }
```

# Messages 
- GET `api/messages` - повертає всі повідомлення
- GET `api/messages/:id` - повертає повідомлення з даним id
- DELETE `api/messages/:id` - видаляє повідомлення з даним id
- POST `api/messages` - додає повідомлення. Приклад body:
```
    {
        "senderId": "5b48b2f6a414dc7d56656b6a",
        "receiverId": "5b48c417c0a3430733d24974",
        "text": "Hello, how are you?"
    }
```
- PUT `api/messages/:id` - оновлює повідомлення з даним id. Приклад body:
```
   {
        "senderId": "5b48b2f6a414dc7d56656b6a",
        "receiverId": "5b48c417c0a3430733d24974",
        "text": "Hi, how are you?"
    }
 ```
