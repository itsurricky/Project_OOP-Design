import axiosClient from "./axiosClient";


const videoEditingApi = {
    getGallery: (catID)=>{
        const url = `/Video/getGallery?type=${catID}`;
        return axiosClient.get(url)
    },
    deleteGallery: (id) => {
        const url = `/Video/deleteGallery/${id}`;
        return axiosClient.delete(url);
      },

      getGalleryById: (id) => {
        const url = `/Video/getGalleryById/${id}`;
        return axiosClient.get(url);
      },
    
    updateGallery: (id)=>{
        const url = `/Video/updateGallery/${id}`;
        return axiosClient.put(url);
    }


}
export default videoEditingApi;