using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using video_editing_api.Model.Collection;
using video_editing_api.Model;
using video_editing_api.Model.ViewModel;
using video_editing_api.Service.DbConnection;
using video_editing_api.Service.Video;
using video_editing_api.Model.InputModel;

namespace video_editing_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        private readonly IVideoService _videoService;
        private readonly IWebHostEnvironment _webHostEnviroment;
        

        public VideoController(IVideoService videoService, IWebHostEnvironment webHostEnvironment)
        {
            _videoService = videoService;
            _webHostEnviroment = webHostEnvironment;
        }
        [HttpGet("GetListVideo")]
        public IActionResult GetListVideo(string id)
        {
            return Ok(_videoService.GetListVideo(id));
        }

        [HttpPost("Upload")]
        public IActionResult Upload([FromForm] VideoModel videoModel)
        {
            IFormFile video = videoModel.fileVideo;
            if (video != null && video.Length > 0)
            {
                string directoryPath = Path.Combine(_webHostEnviroment.ContentRootPath, "UploadedFiles");
                string filePath = Path.Combine(directoryPath, video.FileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    video.CopyTo(stream);
                }

                VideoModel model = new VideoModel();
                model.Filename = video.FileName;
                model.FilePath = filePath;
                model.CatID = videoModel.CatID;
                model.Title = videoModel.Title;
                _videoService.AddVideo(model);

            }
            return Ok("Upload Successfully");

        }

        [HttpDelete("DeleteViddeo/{id}")]
        public IActionResult DeleteVideo(string id)
        {

            Model.Collection.Video video = new Model.Collection.Video();
            video = _videoService.GetById(id);
            FileInfo file = new FileInfo(video.FilePath);
            if (file.Exists)
            {
                file.Delete();
                _videoService.DeleteVideo(id);

            }
            return Ok("Delete Successfully");
        }


        [HttpPost("SaveToGallery")]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> saveToGallery([FromForm] GalleryInput input)
        {
            try
            {
                var res = await _videoService.SaveToGallery(User.Identity.Name, input);
                return Ok(new Response<string>(200, "", res));
            }
            catch (System.Exception e)
            {
                return BadRequest(new Response<string>(400, e.Message, null));
            }
        }

       
        [HttpDelete("deleteGallery/{id}")]
        public async Task<IActionResult> deleteGallery(string id)
        {
            try
            {
                var res = await _videoService.deleteGallery(id);
                return Ok(new Response<bool>(200, "", res));
            }
            catch (System.Exception e)
            {
                return BadRequest(new Response<string>(400, e.Message, null));
            }
        }
       


        [HttpGet("getGallery")]
        public async Task<IActionResult> getGallery(int type)
        {
            try
            {
                var res = await _videoService.getGalley(User.Identity.Name, type);
                return Ok(new Response<List<Gallery>>(200, "", res));
            }
            catch (System.Exception e)
            {
                return BadRequest(new Response<string>(400, e.Message, null));
            }
        }

        [HttpGet("getGalleryById/{id}")]
        public  IActionResult getGalleryById(string id)
        {
           
               
                return Ok(_videoService.getGalleyByID(id));
            
           
        }



        [HttpPut("updateGallery/{id}")]
        public async Task<IActionResult> updateGallery(string id, Gallery gallery)
        {
            try
            {
                    var res = await _videoService.UpdateToGallery(id, gallery);
                
                    return Ok(new Response<string>(200, "", res));
               
            }
            catch (System.Exception e)
            {
                return BadRequest(new Response<string>(400, e.Message, null));
            }
        }




    }
}
