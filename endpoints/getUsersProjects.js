const getUsersProjects =(req,res,bcrypt,data,uniqid,jwt)=>{

    let headers = req.headers
    let token = headers.token
    console.log(` ${req.hostname} ${req.url}  ${req.method}`)
    jwt.verify(token, 'supersecret', function(err, decoded){
        if(!err){
            let userId = decoded.userid

            data.table('users_projects').select().where({u_id:userId})
                .then(projects => {
                    let getTags = new Promise((resolve,reject) =>{
                        let i=0;
                        if(projects.length === 0){
                            res.json({data:{ projects:projects}})

                        }else{
                        projects.forEach(p=>{
                            data.table("project_tags").select('tag').where("project_tags.p_id",'=',p.p_id)
                                .then(tags => {
                                    p.tags = tags.map(t => t.tag);
                                    if(i=== projects.length -1)
                                        resolve(projects)
                                    else
                                        i++;
                                })
                                .catch(err => {
                                    console.log('error in the get tags query',err)
                                    reject(err)
                                })
                            delete p.password
                        })
                    }
                    })
                    getTags.then( projects => {
                        res.json({data:{ projects:projects}})
                    }).catch(err =>{
                        console.log('error in the get all the projects',err)
                        res.status(400).json('server error !!!')
                    })
                    // 
                })
                .catch(err => {
                    console.log("err in the upload resum",err)
                    res.status(400).json("problem occured!!!")    
                })
        } else {
            return res.send(err);
        }
    })
    
}
  module.exports={
    getUsersProjects :getUsersProjects,
  };
  