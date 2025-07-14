

import ImageUpload from './ImageUpload' ;
import ImagePreview from './ImagePreview' ;
import { useState } from 'react';
import { enhancedImageAPI } from '../utils/enhancedImageApi';


const Home = () => {
    const[ uploadImage, setUploadImage] = useState(null);
    const[ enhancedImage, setEnhancedImage] = useState(null);
    const[loading,setloading] = useState(false);

   const UploadImageHandler = async (file) => {
     setUploadImage(URL.createObjectURL(file));
     setloading(true);
     try{
          //Call the API to enhance the image
          //code which may prouduce error put here
          const enhancedURL = await enhancedImageAPI(file);
         setEnhancedImage(enhancedURL.image);
          
     } catch(error){
        //code that handle the error and show message is inside catch block
        console.log(error);
        alert("Error while enhancing the image please try again later");
     } finally {
      setloading(false);

     }
     
   };
    
  return (
    <>
      <ImageUpload  UploadImageHandler={ UploadImageHandler} />
      <ImagePreview 
      loading= {loading}
      uploaded={uploadImage}
      enhanced={enhancedImage}/>
    </>
  )
}

export default Home ;
