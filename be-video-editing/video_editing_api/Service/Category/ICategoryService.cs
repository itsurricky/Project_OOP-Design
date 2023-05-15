using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace video_editing_api.Service.Category
{
    public interface ICategoryService
    {
        List<Model.Collection.Category> GetListCategory();

        void AddCategory(Model.Collection.Category category);
        void UpdateCategory(Model.Collection.Category category);
        void RemoveCategory(string id);
    }
}
