using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Threading.Tasks;
using video_editing_api.Model;
using video_editing_api.Model.Collection;

namespace video_editing_api.Service.DbConnection
{
    public class DbClient : IDbClient
    {
        private readonly DbConfig _dbConfig;
        private readonly IMongoDatabase _database;
        private readonly IMongoCollection<AppUser> _user;
        private readonly IMongoCollection<Model.Collection.Category> _category;
        private readonly IMongoCollection<Model.Collection.Video> _video;
        private readonly IMongoCollection<Model.Collection.Gallery> _gallery;

        public DbClient(IOptions<DbConfig> options)
        {
            var client = new MongoClient("mongodb+srv://phucnguyen:26102002@cluster0.fh28jr0.mongodb.net/test");
            var database = client.GetDatabase("Video-Editing");

            _user = database.GetCollection<AppUser>("User");
            _category = database.GetCollection<Model.Collection.Category>("Category");
            _video = database.GetCollection<Model.Collection.Video>("Video");

            try
            {
                //_dbConfig = options.Value;

                MongoClientSettings settings = MongoClientSettings.FromUrl(
                   new MongoUrl("mongodb+srv://phucnguyen:26102002@cluster0.fh28jr0.mongodb.net/test")
                 );
                settings.SslSettings =
                  new SslSettings() { EnabledSslProtocols = SslProtocols.Tls12 };
                var mongoClient = new MongoClient(settings);

                _database = mongoClient.GetDatabase("Video-Editing");
            }
            catch (System.Exception e)
            {
                throw new System.Exception(e.Message);
            }
        }

        public IMongoCollection<Model.Collection.Category> GetCategoryCollection()
        {
            return _category;
        }

        public IMongoCollection<AppUser> GetUserCollection()
        {
            return _user;
        }

        public IMongoCollection<Model.Collection.Video> GetVideoCollection()
        {
            return _video;
        }
        public IMongoCollection<Model.Collection.Gallery> GetGalleryCollection()
        { 
            try
            {
                return _database.GetCollection<Model.Collection.Gallery>("Gallery");
            }
            catch (System.Exception e)
            {
                throw new System.Exception(e.Message);
            }
        }

    }
}
