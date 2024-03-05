const cloudinary=require("cloudinary").v2;
// const fs=require("fs")

exports.imageUploadCloudinary=async (file,folder,height,quality)=>{

    const options={folder};
    if(height){
        options.height=height;
    }
    if(quality){
        options.quality=quality;
    }
    options.resource_type="auto";
    console.log(file.tempFilePath) //   \public\temp\tmp-1-1709127698629

    return await cloudinary.uploader.upload(file.tempFilePath, options)

    // const response= await cloudinary.uploader.upload(file.tempFilePath,options);
     // unlink the temp file that is remove the locally
    //  saved temporary files
    //  fs.unlinkSync(file.tempFilePath)
    // return response;
}

