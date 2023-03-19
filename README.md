
# Node.js JWT-Session Örneği

Bu örnek, Node.js ve JSON Web Token (JWT) ve Express-session kullanarak basit bir kimlik doğrulama uygulamasıdır.

## Gereksinimler
- Node.js (v12 veya üstü)  
- Npm veya Yarn

## Kurulum
1) Depoyu bilgisayarınıza klonlayın:

`git clone https://github.com/Burakkepuc/Express-Authentication-Example.git`

2) Gerekli bağımlılıkları yükleyin:  
`npm install`  

3) .env dosyası oluşturun ve JWT anahtarınızı burada belirtin:  
`touch .env`  
`echo "TOKEN_KEY=mysecretkey" >> .env`

4) Uygulamayı başlatın:
`npm start`





## API Kullanımı

#### Kaydol

```http
  POST /api/private/signup
```

| Parametre | Tip     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | example
| `password` | `string` | example123

#### Giriş

```http
  POST /api/private/login
```

| Parametre | Tip     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | example
| `password` | `string` | example123

#### Kullanıcıları getir(private route)

```http
  GET api/private/users
```

| Parametre | Tip     |                      |
| :-------- | :-------  :-------------------------------- |
| `status`      | `message` | |

#### Kullanıcıları getir(public route)
```http
  GET api/public/users
```

| Parametre | Tip     |                      |
| :-------- | :-------  :-------------------------------- |
| `status`      | `message` | |

