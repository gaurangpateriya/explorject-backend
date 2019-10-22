const signin =(req,res,bcrypt,data,uniqid,jwt)=>{
    const{email,password}= req.body;
    console.log(` ${req.hostname} ${req.url}  ${req.method}`)
  
    data("users")
            .where({email:email})
                .then(userdata=>{
                    let result= bcrypt.compareSync(password, userdata[0].password);
                    if(result) {
                        
                    
                        return data.select('*').from("users").where('email','=',email)
                        .then(users=>{
                            const token = jwt.sign({userid:users[0].u_id}, 'supersecret');
                            res.json({data:{token:token,message:'Login successfull !!!', users:users[0]}})
                        })
                        .catch(err => {
                            console.log("error in login ",err)
                            return res.status(400).json("Error occured in server !!1");
                        })
                    }
                    else
                        return res.status(401).json("invalid credential");
                    
  
                }).catch(err=> {
                    res.status(400).json("cannot login")
                    console.log('err in login',err)
                });
  }
  
  
  module.exports={
    handleLogin :signin,
  };
  