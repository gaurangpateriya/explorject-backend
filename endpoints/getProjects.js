const getProjects =(req,res,bcrypt,data,uniqid,jwt)=>{

    let headers = req.headers
    let token = headers.token
    console.log(` ${req.hostname} ${req.url}  ${req.method}`)
    jwt.verify(token, 'supersecret', function(err, decoded){
        if(!err){
            data.table('users_projects').innerJoin('users','users.u_id','=','users_projects.u_id').select()
                .then(projects => {
                    let getTags = new Promise((resolve,reject) =>{
                        if(projects.length === 0){
                            res.json({data:{ projects:projects}})
                        }
                        else{

                        
                        let i=0;
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
    getProjects :getProjects,
  };
  