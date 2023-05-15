using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using video_editing_api.Model;
using video_editing_api.Model.Collection;

namespace video_editing_api.Service.DbConnection
{
    public interface IDbClient
    {
        IMongoCollection<AppUser> GetUserCollection();
        IMongoCollection<Model.Collection.Category> GetCategoryCollection();
        IMongoCollection<Model.Collection.Video> GetVideoCollection();
        IMongoCollection<Model.Collection.Gallery> GetGalleryCollection();
        
    }
}
