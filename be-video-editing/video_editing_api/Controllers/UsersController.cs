using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using video_editing_api.Model;
using video_editing_api.Model.ViewModel;
using video_editing_api.Service;

namespace video_editing_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetListUsers()
        {
            return Ok(_userService.GetListUsers());
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]LoginModel account)
        {
            var user = _userService.Authenticate(account);
            if (user == null)
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }

            return Ok(user);
        }  

        [HttpPost("register")]
        public IActionResult Register([FromBody]RegisterModel account)
        {
            
            try
            {
                _userService.Register(account);
                return Ok();
            }
            catch (ApplicationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
