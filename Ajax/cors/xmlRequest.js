// 1. 引入express
const express = require('express');

// 2. 创建应用对象
const app = express();

// 3. 创建路由规则
// request 是对请求报文的封装
// response 是对响应报文的封装
app.get('/serve', (request, response) => {
    // 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
  response.setHeader('Access-Control-Allow-Headers', '*');

  //  设置响应
  
    response.send("Hello fetch");
  
  
});
// app.post('/serve', (request, response) => {
//     // 设置允许跨域
//     response.setHeader('Access-Control-Allow-Origin','*')
//   //  设置响应
//   response.send("Hello AJAX POST");
// });
app.all('/serve', (request, response) => {
    // 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    // 设置响应头, 设置允许自定义头信息
  response.setHeader('Access-Control-Allow-Headers', '*');
  //  设置响应
response.send("Hello AJAX POST");
 

});
app.get('/timeout', (request, response) => {
    // 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
  response.setHeader('Access-Control-Allow-Headers', '*');

   setTimeout(()=>{
       //  设置响应
  response.send("timeout");
},1000)
  
});
app.all('/json-server', (request, response) => {
    // 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    // 设置响应头, 设置允许自定义头信息
  response.setHeader('Access-Control-Allow-Headers', '*');
//   响应数据
const data={
    name:'zzzzz'
}
let str=JSON.stringify(data)

  //  设置响应
//   response.send("Hello AJAX POST");
response.send(str)
});

app.all('/check-username', (request, response) => {
  // 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  // 设置响应头, 设置允许自定义头信息
response.setHeader('Access-Control-Allow-Headers', '*');
//   响应数据
const data={
  exist:1,
  msg:'用户名已经存在'
}
let str=JSON.stringify(data)

response.end(`handle(${str})`)//  设置响应

});

app.all('/jsonp', (request, response) => {

//   响应数据
const data={
 name:'qqq',
 city:['北极','南极']
}
let str=JSON.stringify(data)
let cb=request.query.callback

response.end(`${cb}(${str})`)//  设置响应



});
app.all('/cors', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin','*')
  // response.setHeader('Access-Control-Allow-Origin','http://localhost:8000')
  response.send('hello cors')
  });
// 4. 监听端口，启动服务
app.listen(8000, () => {
  console.log("服务已经启动, 8000 端口监听中...");
 })
