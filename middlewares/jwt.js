const jwt= require('jsonwebtoken')


const verifyToken=(req,res,next)=>{
    const token=req.cookies.accessToken;
    if (!token) return res.status(401).send("you are not authenticated")
    jwt.verify(token,process.env.SERECT_KYE, async(err, payload)=>{
        if (err) return res.status(403).send("token is not valid");
        req.userId=payload.id;
        req.isSeller=payload.isSeller;
        })
}