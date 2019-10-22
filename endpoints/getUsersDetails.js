const getUsersDetails =(req,res,bcrypt,data,uniqid,jwt)=>{

    let headers = req.headers
    let token = headers.token
    console.log(` ${req.hostname} ${req.url}  ${req.method}`)
    jwt.verify(token, 'supersecret', function(err, decoded){
        if(!err){
            let userId = decoded.userid
            data.table('users').where({u_id : userId}).select()
                .then(users => {
                    let user = users[0]
                    delete user['password']
                    res.json({data:{ user:user}})
                })
                .catch(err => {
                    console.log("err in the get users",err)
                    res.status(400).json("problem occured!!!")    
                })
        } else {
            return res.send(err);
        }
    })
    
}
  module.exports={
    getUsersDetails :getUsersDetails,
  };
  