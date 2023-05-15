using System;
using System.Collections.Generic;
using System.Linq;
using video_editing_api.Model.ViewModel;

namespace video_editing_api.Service
{
    public interface IUserService
    {
        List<AppUser> GetListUsers();
        AppUser GetUser(string Username);
        void UpdateUser(AppUser user);
        void AddUser(AppUser user);
        void RemoveUser(string id);

        AppUser Authenticate(LoginModel account);
        void Register(RegisterModel account);
       
    }
}
