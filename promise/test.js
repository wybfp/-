const p=new Promise((resolve,reject)=>{
    resolve('ok')
})
p.then((onResolve,onReject)=>{
    console.log(onResolve)
})