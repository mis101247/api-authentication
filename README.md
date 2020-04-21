# api-authentication

## 執行

-  mongoDB
```
docker-composer up
```

-  node.js Server
```
# 先install
yarn install
# or npm install

# 若無先tsc第一次跑會看到一下下 error 但沒事兒
yarn tsc

yarn dev
# or npm run dev
```

## access_token 取得

- [Google](https://developers.google.com/oauthplayground/)
  - 選擇 Google OAuth2 API v2
    -  勾選 `https://www.googleapis.com/auth/userinfo.email`

- [Facebook](https://developers.facebook.com/tools/explorer/)
  - 選擇 email
  
## Request / Response

### Request

`POST /thing/`

    curl -i -H 'Accept: application/json' -d 'name=Foo&status=new' http://localhost:7000/thing

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

    {"id":1,"name":"Foo","status":"new"}

## Get a specific Thing

### Request

`GET /thing/id`

    curl -i -H 'Accept: application/json' http://localhost:7000/thing/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 36

    {"id":1,"name":"Foo","status":"new"}

## Get a non-existent Thing


### Email註冊

#### Request

```HTTP
POST /auth/signup HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
"name":"keyo",
"email": "814007@gmail.com",
"password": "12345678",
"repassword": "12345678"
}
```

#### Response

```
{
    "token": "A JWT TOKEN"
}
```
error
```
{
    "error": [
        {
            "msg": "使用者名稱不得為空",
            "param": "name",
            "location": "body"
        },
        {
            "msg": "Email 不得為空",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "Email 格式錯誤",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "密碼不得為空",
            "param": "password",
            "location": "body"
        },
        {
            "msg": "密碼少於8個字",
            "param": "password",
            "location": "body"
        },
        {
            "msg": "請再次輸入密碼確認",
            "param": "repassword",
            "location": "body"
        }
    ]
}
```

### Google註冊

#### Request

```HTTP
POST /auth/google HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
    "access_token": "access_token from google"
}
```

#### Response

```
{
    "token": "A JWT TOKEN"
}
```
error
```
{
    "error": "InternalOAuthError"
}
```

### Facebook註冊

#### Request

```HTTP
POST /auth/facebook HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
    "access_token": "access_token from facebook"
}
```

#### Response

```
{
    "token": "A JWT TOKEN"
}
```
error
```
{
    "error": "InternalOAuthError"
}
```

  

## 架構圖

```
/src
  controllers/
  middleware/
  models/
  requests/
  routes/
  services/
  typings/ 
  passport.ts
  app.ts
  router.ts
```

## fork

- [mis101247/express-skeleton](https://github.com/mis101247/express-skeleton)

  - [kusakawazeusu/express-typescript-skeleton](https://github.com/kusakawazeusu/express-typescript-skeleton)

## Acknowledgements

- [API Authentication with Node Youtube](https://www.youtube.com/watch?v=zx6jnaLuB9Q&list=PLSpJkDDmpFZ7GowbJE-mvX09zY9zfYatI)

- [把玩 express-validator 在伺服器端做表單驗證](https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-%E6%8A%8A%E7%8E%A9-express-validator-%E5%9C%A8%E4%BC%BA%E6%9C%8D%E5%99%A8%E7%AB%AF%E5%81%9A%E8%A1%A8%E5%96%AE%E9%A9%97%E8%AD%89-797342aab2d3)

- [用 TypeScript 寫 express — Route 與 Controller 篇](https://medium.com/@kusakawazeusu/%E7%94%A8-typescript-%E5%AF%AB-express-route-%E8%88%87-controller-%E7%AF%87-40db4850a8f2)

## Solution

- [Express Passport (node.js) error handling](https://stackoverflow.com/questions/15711127/express-passport-node-js-error-handling/43824037#43824037)
