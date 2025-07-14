import axios from "axios";

const API_KEY = "wxsj7xrstc1sc3gru" ;
const BASE_URL = "https://techhk.aoscdn.com/" ;
export const enhancedImageAPI = async (file) =>{
 
    //code to call api and to get enhanced image url

    try {
      const taskId = await uploadImage(file);
      console.log("Image Uploaded ,Task ID:", taskId);

      const enhancedImageData = await PollForEnhancedImage(taskId);
       console.log("enhanced image data:", enhancedImageData);

       return enhancedImageData;
    } 
    catch (error) {
        console.log("Error for enhancing image:",error.message);
    }
};


const uploadImage = async (file) =>{

    const formData = new FormData();
     formData.append("image_file",file);

    const {data} = await axios.post("https://techhk.aoscdn.com/api/tasks/visual/scale", 
        formData,
         {
            headers: {
             "Content-Type": "multipart/form-data",
            "X-API-KEY": API_KEY ,
          },
     }
 );
     if(!data?.data?.task_id){
         throw new Error("Failed to upload image! Task Id not found");
    }
  
    return data.data.task_id;

};


const fetchEnhancedImage = async(taskId) =>{

      const {data} = await axios.get(`https://techhk.aoscdn.com/api/tasks/visual/scale/${taskId}`, 
        {
           headers: {
            "X-API-KEY": API_KEY ,
         },
    }
   
);

if(!data?.data){
    throw new Error("Failed to detch enhanced image");
}
 return data.data;
    //fetch enhanced image from API
        "/api/tasks/visual/scale/{task_id}"  //getAPI
};

const PollForEnhancedImage = async(taskId, retries =0) =>{
    const result =await fetchEnhancedImage(taskId);

    if(result.state === 4){
        console.log("processing...");

        if(retries >= 20 ){
            throw new Error("Max retries reached, please try again later")
        }

        // wait for 2 second
        await new Promise((resolve) =>setTimeout(resolve,2000));

        return PollForEnhancedImage(taskId, retries +1);
    }
    console.log("enhanced image URL:",result);
    return result;
};