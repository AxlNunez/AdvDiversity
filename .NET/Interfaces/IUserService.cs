using Sabio.Models;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Users;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public interface IUserService
    {
        Users Get(int id);
        Paged<Users> Pagination(int pageIndex, int pageSize);
        void Delete(int id);
        int Add(UserAddRequest model);
        void Update(UserUpdateRequest model, int userId);
        Task<bool> LogInAsync(string email, string password);
        Task<bool> LogInTest(string email, string password, int id, string[] roles = null);
        bool VerifyEmail(string email);
        void ChangePassword(string password, string token, int passwordTokenType);
        bool AddToken(string email, string token, int id);
        List<RoleAnalytics> GetUserAnalytics();
    }
}
