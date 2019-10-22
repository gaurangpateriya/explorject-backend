const register =(req,res,bcrypt,data,uniqid)=>{
    const  {name,about,phone_number,password,email,profilepic}= req.body;
    let u_id = uniqid();
    console.log(` ${req.hostname} ${req.url}  ${req.method}`)

    bcrypt.hash(password, 10, function(err, hash) {
        data('users').insert({u_id,name,about,phone_number,password:hash,email,profilepic})
        .then(r => {
            console.log("register response",r)
            data('users')
                .where({u_id:u_id})
                .select('u_id','name','about','phone_number','email')
                    .then(user => res.status(200).json({data:{message:'user registered', users:user[0]}}))
                    .catch(err => console.log("error in the select of the registe ",err.code))
            
        }).catch(err => {
            if(err.code ==='ER_DUP_ENTRY'){
            console.log(err.code)

                return res.status(409).json({data:{message:'user Already Present', users:user[0]}})

            }
                
            else {
                res.status(500).json(`server error!!! `)

            }
        });
    })
}
  module.exports={
    handleRegister :register,
  };
  