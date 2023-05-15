using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace video_editing_api.Model.ViewModel
{
    public class VideoModel
    {

        public string CatID { get; set; }
        public string Title { get; set; }
        public IFormFile fileVideo { get; set; }

        public string Filename { get; set; }
        public string FilePath { get; set; }
    }
}
