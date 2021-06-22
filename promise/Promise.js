class Promise{
    constructor(executor){
       // 构造函数指向实例对象
    // console.log(this)
    this.PromiseState='pending'
    this.PromiseResult=null
    this.callback=[]
    const self=this

    function resolve(data){
        // 普通函数指向windows
        // console.log(this)
        if(self.PromiseState !== 'pending') return ;
        self.PromiseResult=data
        self.PromiseState='fulfilled' 
         setTimeout(()=>{
        self.callback.forEach(element => {
          
                element.onResolve()
            })
            
        });
        // if(self.callback.onResolve){
        //     self.callback.onResolve(data)
        // }
    }

    function reject(data){
        if(self.PromiseState !== 'pending') return ;
        self.PromiseResult=data
        self.PromiseState='rejected'
        setTimeout(()=>{
        self.callback.forEach(element => {
            element.onReject()
        });
        })
        // if(self.callback.onReject){
        //     self.callback.onReject(data)
        // }
    }
    // 调用函数
    // executor()
    try{
        executor(resolve,reject)
    }catch(e){
        reject(e)
    }
    }
    then(onResolve,onReject){
        const self=this
        if(typeof onReject !== 'function'){
            onReject=reason=>{
                throw reason
            }
        }
        if(typeof onResolve !== 'function'){
            onResolve=value=>value
        }
      return new Promise((resolve,reject)=>{ 
        function callback(type){
              try{
                    let res=type(self.PromiseResult)
                    if(res instanceof Promise){
                        // 现在是个Promise对象    
                        // 设置对象实例值
                        res.then(value=>resolve(value),err=>reject(err))
                    }else{
                        resolve(res)
                    }
              }catch(e){
                     reject(e)
            }
        }
          if(this.PromiseState=='fulfilled'){
              setTimeout(()=>{
                  callback(onResolve)
              })
            
          }
           
          if(this.PromiseState=='rejected'){
            setTimeout(()=>{
           callback(onReject)
            })
            
          }
            
          if(this.PromiseState=='pending'){
            this.callback.push({
                onResolve:function(){
                  callback(onResolve)  
                },   
                onReject:function(){
                callback(onReject)
            }
          })
        }
    })
          
    }
    catch(onReject){
        return this.then(undefined,onReject)
    }
    static resolve(value){
        return new Promise((resolve,reject)=>{
            if(value instanceof Promise){
           value.then(v=>resolve(v),err=>reject(err))
       }else{
           resolve(value)
       }
       })
    }
    static reject(reason){
        return new Promise((resolve,reject)=>{
            reject(reason)    
        })
       
    }
    static all(promises){
        return new Promise((resolve,reject)=>{
            let count=0
            let arr=[]
            for(let i=0;i<promises.length;i++){
               promises[i].then(v=>{
                   count++
                   arr[i]=v
                   if(count===promises.length) resolve(arr)
               },r=>{
                   reject(r)
               })
            }
        })
    }
    
    static race(promises){
        return new Promise((resolve,reject)=>{
            for(let i=0;i<promises.length;i++){
                promises[i].then(v=>{
                    resolve(v)
                },r=>{
                    reject(r)
                })
             }
        })
    }
}