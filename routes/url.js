const express= require('express');
const router= express.Router();
const validUrl= require('valid-url');
const shortId= require('shortid');
const config= require('config');

const Url= require('../models/url');

//@route   POST /api/url/shorten
//@desc    Create short Url
router.post('/shorten',async (req,res)=>{
    const { longUrl }=req.body;
    const baseUrl= config.get('baseUrl');

    if(!validUrl.isUri(baseUrl)){
        res.status(401).json('Invalid base URL');
    }

    //create url code

    const urlCode= shortId.generate();
    
    //Check long url

    if(validUrl.isUri(longUrl)){
        try{
            let url= await Url.findOne({ longUrl});
            if(url){
                res.json(url);
            }else{
                const shortUrl=baseUrl+'/'+ urlCode;

                url =new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });
                url.save();

                res.json(url);
            }

        }catch(err){
            console.log(err);
            res.status(500).json('Server Error')
        }
    }
    else{
        res.status(401).json('Invalid long url');
    }
})

module.exports= router;