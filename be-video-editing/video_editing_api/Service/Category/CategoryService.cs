using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using video_editing_api.Service.DbConnection;

namespace video_editing_api.Service.Category
{
    public class CategoryService : ICategoryService
    {
        private readonly IMongoCollection<Model.Collection.Category> _category;

        public CategoryService(IDbClient dbClient)
        {
            _category = dbClient.GetCategoryCollection();
        }

        public List<Model.Collection.Category> GetListCategory()
        {
            return _category.Find(cat => true).ToList();
        }

        public void AddCategory(Model.Collection.Category category)
        {
            _category.InsertOne(category);
        }

        public void RemoveCategory(string id)
        {
            _category.DeleteOne(c => c.ID == id);
        }

        public void UpdateCategory(Model.Collection.Category category)
        {
            _category.ReplaceOne(c => c.ID == category.ID, category);
        }
    }
}
