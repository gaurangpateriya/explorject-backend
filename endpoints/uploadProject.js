const uploadProject =(req,res,bcrypt,data,uniqid,jwt)=>{
    const  {p_name,githubLink,description,tags}= req.body;
    let headers = req.headers
    let token = headers.token
    
    console.log(` ${req.hostname} ${req.url}  ${req.method}`)

    jwt.verify(token, 'supersecret', function(err, decoded){
        let p_id = uniqid()
        if(!err){
            let userId = decoded.userid
            data('users_projects').insert({p_id:p_id,p_name:p_name,githubLink:githubLink,u_id:userId,description:description})
                .then(r => {
                    tags.forEach(t => {
                        data('project_tags').insert({p_id,tag:t})
                            .catch(err => {
                                console.log('err in the tag upload',err)
                                res.status(400).json("problem occured!!!")  
                            })
                    });
                    res.json({data:{message:'Project Uploaded succesfully', project:{p_name,githubLink,u_id:userId,description,tags}}})
                })
                .catch(err => {
                    console.log("err in the upload resum",err)
                    res.status(400).json("problem occured!!!")  
                })
        } else 
            return res.send(err);
        
    })
    
}
module.exports={
    uploadProject :uploadProject,
};
  