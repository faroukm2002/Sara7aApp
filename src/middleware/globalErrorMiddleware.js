// export const globalError= (err,req,res,next)=>{
//     console.log(err)
//     process.env.MODE == "devlopment"? 
//     res.status(err.statusCode).json({err:err.message,stack:err.stack})
//     : res.status(err.statusCode).json({err:err.message})

   
// }     


export const globalError = (err, req, res, next) => {
    if (process.env.MODE === 'development') {
        devMode(err, res);
    } else {
        prodMode(err, res);
    }
};
 const devMode = (err, res) => {
    let code =err.statusCode || 500
    res.status(code).json({
        statusCode: code,
        err: err.message,
        stack: err.stack,
    });
};

const prodMode = (err, res) => {
    let code =err.statusCode || 500
    res.status(code).json({
        statusCode: code,
        err: err.message,
    });
};