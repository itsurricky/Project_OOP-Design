using Microsoft.AspNetCore.Http;
using MongoDB.Bson.IO;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

using System.Net.Http;
using Newtonsoft.Json;
using System.Threading.Tasks;
using video_editing_api.Model.Collection;
using video_editing_api.Model.InputModel;
using video_editing_api.Model.ViewModel;
using video_editing_api.Service.DbConnection;
using System.Threading;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.SignalR;
using AutoMapper;
using video_editing_api.Model;

namespace video_editing_api.Service.Video
{
    public class VideoService : IVideoService
    {
        private readonly IMongoCollection<Model.Collection.Video> _video;
        private readonly IMongoCollection<Gallery> _gallery;
        private readonly IConfiguration _config;
       

        public VideoService(IDbClient dbClient, IConfiguration config)
        {
            _video = dbClient.GetVideoCollection();
            _gallery = dbClient.GetGalleryCollection();
            _config = config;
            
        }
          
        public VideoService(IDbClient dbClient) {
            
        }

        public void AddVideo(VideoModel model)
        {
            Model.Collection.Video video = new Model.Collection.Video();

            video.Filename = model.Filename;
            video.FilePath = model.FilePath;
            video.CatID = model.CatID;
            video.Title = model.Title;

            _video.InsertOne(video);
        }

        public void DeleteVideo(string id)
        {
            _video.DeleteOne(v => v.ID == id);
        }

        public List<Model.Collection.Video> GetListVideo(string catID)
        {
            return _video.Find(v => v.CatID == catID).ToList();
        }

        Model.Collection.Video IVideoService.GetById(string id)
        {
            return _video.Find(v => v.ID == id).FirstOrDefault();
        }
        public async Task<string> SaveToGallery(string username, GalleryInput input)
        {
            try
            {
                Gallery gallery = new Gallery()
                {
                    Type = input.Type,
                    Event = input.EventName,
                    Username = username,
                    Height = input.Height,
                    Width = input.Width
                };
                gallery.file_name = await UploadToServerStorage(input.File);
                await _gallery.InsertOneAsync(gallery);
                return "success";
            }
            catch (System.Exception ex)
            {
                throw new System.Exception(ex.Message);
            }
        }
        public async Task<string> UpdateToGallery(string id,Gallery gallery)
        {
            try
            {
                var gal = _gallery.Find(x => x.Id == id).First();
               
                gal.Event = gallery.Event;
                gal.Type = gallery.Type;
                
                
                await _gallery.ReplaceOneAsync(m => m.Id == id, gal);
                return "success";
            }
            catch (System.Exception ex)
            {
                throw new System.Exception(ex.Message);
            }
        }


        private async Task<string> UploadToServerStorage(IFormFile file)
        {
            try
            {
                HttpClient client = new HttpClient();
                client.Timeout = TimeSpan.FromDays(1);
                client.BaseAddress = new System.Uri("https://store.cads.live");

                var requestContent = new MultipartFormDataContent();

                if (file != null)
                {
                    byte[] data;
                    using (var br = new BinaryReader(file.OpenReadStream()))
                    {
                        data = br.ReadBytes((int)file.OpenReadStream().Length);
                    }
                    ByteArrayContent bytes = new ByteArrayContent(data);
                    requestContent.Add(bytes, "file", file.FileName);
                }
                var response = await client.PostAsync("/projects/", requestContent);
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    dynamic jsons = Newtonsoft.Json.JsonConvert.DeserializeObject(result);
                    return jsons.url;
                }
                else
                    throw new System.Exception(await response.Content.ReadAsStringAsync());
            }
            catch (System.Exception ex)
            {
                throw new System.Exception(ex.Message);
            }
        }

        public void updateGallery(string id, Gallery gallery)
        {
             _gallery.ReplaceOneAsync(gallery => gallery.Id == id, gallery);
        }

        public async Task<List<Gallery>> getGalley(string username, int Type)
        {
            try
            {
                if (Type != -1)
                {
                    return await _gallery.Find(gal => gal.Username == username && gal.Type == Type).ToListAsync();
                }
                else
                {
                    return await _gallery.Find(gal => gal.Username == username).ToListAsync();
                }
            }
            catch (System.Exception ex)
            {
                throw new System.Exception(ex.Message);
            }
        }
        public async Task<bool> deleteGallery(string id)
        {
            try
            {
                await _gallery.DeleteOneAsync(gal => gal.Id == id);
                return true;
            }
            catch (System.Exception e)
            {
                throw new System.Exception(e.Message);
            }
        }
        public async Task<Gallery> getGalleyByID(string id)
        {
            try
            {
                return  _gallery.Find(x => x.Id == id).First();
            }
            catch (System.Exception ex)
            {
                throw new System.Exception(ex.Message);
            }
        }

    }
}
