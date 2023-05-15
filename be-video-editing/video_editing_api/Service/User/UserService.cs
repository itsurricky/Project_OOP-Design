using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using video_editing_api.Model.ViewModel;
using video_editing_api.Service.DbConnection;

namespace video_editing_api.Service
{
    public class UserService: IUserService
    {
        private readonly IMongoCollection<AppUser> _user;
      

        public UserService(IDbClient dbClient)
        {
            _user = dbClient.GetUserCollection();
        }

        public List<AppUser> GetListUsers()
        {
            return _user.Find(user => true).ToList();
        }
        public AppUser GetUser(string username)
        {
            return _user.Find<AppUser>(u => u.Username == username).FirstOrDefault(); 
        }

        public void UpdateUser(AppUser user)
        {
            _user.ReplaceOne(u => u.ID == user.ID, user);
        }

        public void RemoveUser(string id)
        {
            _user.DeleteOne(u => u.ID == id);
        }

        public void AddUser(AppUser user)
        {
            _user.InsertOne(user);
        }


        public AppUser Authenticate(LoginModel account)
        {
            var user = _user.Find(u => u.Username == account.Username && u.Password == account.Password)
                .FirstOrDefault();
            if (user == null)
            {
                return null;
            }
            else
            {
                return user;
            } 
        }

        public void Register(RegisterModel account)
        {
            AppUser user = new AppUser();
            user.Username = account.Username;
            user.Password = account.Password;
            user.Fullname = account.Fullname;
            user.Email = account.Email;
            var existingUser = GetUser(user.Username);

            if (existingUser != null)
            {
                throw new ApplicationException("Username already exists.");
            }
            else
            {
                AddUser(user);
            }
        }
    }
}
