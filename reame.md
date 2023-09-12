## npm i --save-dev @types/express

npm i --save-dev @types/express là một lệnh dùng để cài đặt gói @types/express trong một dự án sử dụng Node.js và Express.js. Gói @types/express chứa các khai báo kiểu TypeScript cho thư viện Express.js.

Khi bạn cài đặt @types/express với tùy chọn --save-dev, nó sẽ được thêm vào mục devDependencies trong tệp package.json của bạn. Điều này chỉ ra rằng gói này là cần thiết cho quá trình phát triển và kiểm tra mã, nhưng không cần thiết khi ứng dụng đã được triển khai vào môi trường sản xuất.

- Setup express (npm i express) // Framework
- Setup type express (npm i --save-dev @types/express)
- Setup ts-node (npm install -D ts-node or npm i ts-node --save-dev)

## ORM

- Type ORMS
- npm i typeorm mysql reflect-metadata --save

## 2 Prisma

- npm i prisma
- npm i @prisma/client
- Setup path schema.prisma in package.json =>

"prisma": {
"schema": "./src/prisma/schema.prisma"
}

- Setup create database, client:

"db": "prisma db push",
"client": "prisma generate"

## Mail

npm i nodemailer @types/nodemailer
