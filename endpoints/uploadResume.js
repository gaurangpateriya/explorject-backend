const uploadResume =(req,res,bcrypt,data,uniqid,jwt)=>{
    const  {u_resume}= req.body;
    let headers = req.headers
    let token = headers.token
    console.log(` ${req.hostname} ${req.url}  ${req.method}`)

    jwt.verify(token, 'supersecret', function(err, decoded){
        console.log("decoded",req.on)
        if(!err){
            let userId = decoded.userid
            console.group("users id in the upload resume",userId)
  
  
            if (!req.file) {
                console.log("No file received");
                    let  message = "Error! in image upload."
                res.status(400).json({data:{message: message}});
            
            } else {
                console.log('file received');
                console.log(req.file.buffer);
                req.on('data',(dara =>{
                    console.log(dara)
                }))
        
                    // data('users_resume').insert({u_id:userId,u_resume:req.file.filename})
                    //     .then(r =>{
                    //         console.log(r)
                    //         console.log('inserted data');
                    //         let message = "Successfully! uploaded";
                    //         res.status(200).json({data:{message: message}});
                    //     }).catch(err =>{
                    //         if(err.code === 'ER_DUP_ENTRY')
                    //             res.status(400).json({data:{message:"resume already uploaded !! "}})

                    //         console.log("error in the uplaod resume",err)
                    //     })
                    res.json("fileuploaded")
                          
              
                
              
        
            }
            // req.on('data', (u_id) => {
            //     console.log(u_id);
            // });
            // data('users_resume').insert({u_id:userId,u_resume:u_resume})
            //     .then(r => {
            //         console.log('upload resume respone',r)
            //         res.json("uploaded successfully!!!")
            //     })
            //     .catch(err => {
            //         console.log("err in the upload resum",err)
            //         res.status(400).json("problem occured!!!")    
            //     })
        } else {
            return res.send(err);
        }
    })
    
}
  module.exports={
    uploadResume :uploadResume,
  };

  
  
// app.post('/api/v1/upload',upload.single('profile'), function (req, res) {
//     message : "Error! in image upload."
//       if (!req.file) {
//           console.log("No file received");
//             message = "Error! in image upload."
//           res.render('index',{message: message, status:'danger'});
      
//         } else {
//           console.log('file received');
//           console.log(req);
//           var sql = "INSERT INTO `file`(`name`, `type`, `size`) VALUES ('" + req.file.filename + "', '"+req.file.mimetype+"', '"+req.file.size+"')";
  
//                   var query = db.query(sql, function(err, result) {
//                      console.log('inserted data');
//                   });
//           message = "Successfully! uploaded";
//           res.render('index',{message: message, status:'success'});
  
//         }
//   });