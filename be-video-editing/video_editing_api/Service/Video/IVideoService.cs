using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using video_editing_api.Model.Collection;
using video_editing_api.Model.InputModel;
using video_editing_api.Model.ViewModel;

namespace video_editing_api.Service.Video
{
    public interface IVideoService
    {
        List<Model.Collection.Video> GetListVideo(string catID);
        void AddVideo(VideoModel model);
        void DeleteVideo(string id);
        void updateGallery(string id, Gallery gallery);
        Model.Collection.Video GetById(string id);
        Task<List<Model.Collection.Gallery>> getGalley(string username, int Type);
        Task<string> SaveToGallery(string username, GalleryInput input);
        Task<bool> deleteGallery(string id);
        Task<Gallery> getGalleyByID(string id);
        Task<string> UpdateToGallery(string id, Gallery gallery);
    }
}
