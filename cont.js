import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { urlUser } from "../../modl.js";
import crypto from "crypto";
//encrypting  the url from code
const shorten= asyncHandler(async(req,res)=>{
        // destructoring the body 
        const {url}= req.body;
        const regexUrl= /^(http|https):\/\/[^\s$.?#].[^\s]*$/;
        if(!regexUrl.test(url)){
            throw new ApiError(402,"error in url ");
        }

        try {
            let existingURL = await urlUser.findOne({ originalURL: url });
            if(existingURL){
                return res.json({shortUrl: `${req.headers.host}/${existingURL.shortCode}`})
            }
            const shortCode = crypto.randomBytes(3).toString('hex');
            const newUrl= urlUser({originalURL:url,shortCode});
        await newUrl.save();
        return res.status(200).json(new ApiResponse(200,shortCode,"shorturl has been uncoded"));
            
        } catch (error) {
            throw new ApiError(401,"error again in url ")||console.log(`errror :${error}`);
            
        }
});

//redirecting the url
const redirectingUrl = asyncHandler(async (req, res) => {
    const { shortCode } = req.params;
  
    try {
      // Log the received short code
      console.log(`Short code received: ${shortCode}`);
  
      // Query the database
      const urlEntry = await urlUser.findOne({ shortCode });
      console.log(`Database result: ${urlEntry}`);
  
      // Check if the URL entry exists
      if (!urlEntry) {
        console.warn(`Short code not found: ${shortCode}`);
        return res.status(404).json({ error: 'Short URL not found' });
      }
  
      // Validate the original URL format
      if (!urlEntry.originalURL.startsWith('http')) {
        console.error(`Invalid URL format in database: ${urlEntry.originalURL}`);
        return res.status(400).json({ error: 'Invalid URL format in database' });
      }
  
      // Redirect to the original URL
      console.log(`Redirecting to: ${urlEntry.originalURL}`);
      return res.redirect(urlEntry.originalURL);
  
    } catch (err) {
      // Log and respond with a server error
      console.error('Error during redirection:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  

export {shorten,  redirectingUrl}
