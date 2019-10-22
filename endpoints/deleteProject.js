const deleteProject =(req,res,bcrypt,data,uniqid,jwt)=>{
    const  {p_id}= req.body;
    let headers = req.headers
    let token = headers.token
    console.log(` ${req.hostname} ${req.url}  ${req.method}`)
    jwt.verify(token, 'supersecret', (err, decoded)=>{
        if(!err){
            let userId = decoded.userid
            console.group(userId)
            data('users_projects').where({"users_projects.u_id":userId,'users_projects.p_id':p_id }).del()
                .then(r =>{
                    console.log(r)
                    if( r === 1)
                        res.json({data:{message:'Project Deleted successfully'}})
                    else   
                        res.json({data:{message:'No project Found  !!!'}})
                })
                .catch(err => {
                    console.log("err in the delete Project",err)
                    res.status(400).json("problem occured!!!")    
                })
        }
        else 
            return res.send(err);
        
    })
}
module.exports={
    deleteProject :deleteProject,
};
