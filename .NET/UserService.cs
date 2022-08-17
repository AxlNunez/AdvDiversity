using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Users;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class UserService : IUserService
    {
        private IAuthenticationService<int> _authenticationService;
        private IDataProvider _dataProvider;

        public UserService(IAuthenticationService<int> authSerice, IDataProvider dataProvider)
        {
            _authenticationService = authSerice;
            _dataProvider = dataProvider;
        }
        public Users Get(int id)
        {
            string procName = "[dbo].[Users_Select_ById]";
            Users user = null;

            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                user = MapUser(reader, ref startingIndex);

            });
            return user;
        }
        public Paged<Users> Pagination(int pageIndex, int pageSize)
        {
            Paged<Users> pagedResult = null;

            List<Users> result = null;

            int totalCount = 0;

            _dataProvider.ExecuteCmd(
                "[dbo].[Users_SelectAll]",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {

                    int startingIndex = 0;
                    Users aPaged = new Users();

                    aPaged = MapUser(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (result == null)
                    {
                        result = new List<Users>();
                    }

                    result.Add(aPaged);
                }

            );
            if (result != null)
            {
                pagedResult = new Paged<Users>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }
        public int Add(UserAddRequest model)
        {
            int id = 0;
            string password = model.Password;
            string salt = BCrypt.BCryptHelper.GenerateSalt(10);
            string hashedPassword = BCrypt.BCryptHelper.HashPassword(password, salt);

            string procName = "[dbo].[Users_Insert]";
            _dataProvider.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Email", model.Email);
                    col.AddWithValue("@Password", hashedPassword);
                    col.AddWithValue("@IsConfirmed", model.IsConfrimed);
                    col.AddWithValue("@UserStatusId", model.UserStatusId);
                    col.AddWithValue("@RoleId", model.RoleId);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    col.Add(idOut);

                }, returnParameters: delegate (SqlParameterCollection returnCol)
                {
                    object oId = returnCol["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);
                });
            return id;
        }
        public void Update(UserUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Users_Update]";
            _dataProvider.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@Id", model.Id);

                }, returnParameters: null);
        }
        public void Delete(int id)
        {
            string procName = "[dbo].[Users_Delete_ById]";
            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                }, returnParameters: null);
        }
        public bool VerifyEmail(string email)
        {
            string procName = "[dbo].[Users_Select_ByEmail]";

            bool isUser = false;
            Users user = new Users();
            _dataProvider.ExecuteCmd(procName
             , delegate (SqlParameterCollection paramCollection)
             {
                 paramCollection.AddWithValue("email", email);
             }
             , delegate (IDataReader reader, short set)
             {
                 int startingIndex = 0;
                 user = MapUsersEmail(reader, user, startingIndex);

                 if (!string.IsNullOrEmpty(email) && user.Email == email)
                 {
                     isUser = true;
                 }
             });
            return isUser;
        }

        public void ChangePassword(string password, string token,int passwordTokenType)
        {
            string procName = "[DBO].[Users_Change_Password]";

            string securedPassword = GenerateHash(password);

            _dataProvider.ExecuteNonQuery(procName, inputParamMapper:
                delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Password", securedPassword);
                    col.AddWithValue("@Token", token);
                    col.AddWithValue("@TokenType", passwordTokenType);
                });
        }

        private string GenerateHash(string password)
        {
            string salt = BCrypt.BCryptHelper.GenerateSalt();
            return BCrypt.BCryptHelper.HashPassword(password, salt);
        }

        private static Users MapUsersEmail(IDataReader reader, Users user, int startingIndex)
        {
            user.Id = reader.GetSafeInt32(startingIndex++);
            user.Email = reader.GetSafeString(startingIndex++);
            return user;
        }
        public bool AddToken(string email, string token, int tokenTypeId)
        {
            bool result = false;

            string procName = "[dbo].[UserTokens_Insert]";
            _dataProvider.ExecuteNonQuery(procName
               , inputParamMapper: delegate (SqlParameterCollection col)
               {
                   col.AddWithValue("@Token", token);
                   col.AddWithValue("@Email", email);
                   col.AddWithValue("@TokenType", tokenTypeId);

               }, returnParameters: delegate (SqlParameterCollection returnCol)
               {
                   string emailOut = email;
                   string tokenOut = token;

                   if (email != null && token != null)
                   {
                       result = true;
                   }

               });
            return result;

        }
        public async Task<bool> LogInAsync(string email, string password)
        {
            bool isSuccessful = false;
            IUserAuthData response = Get(email, password);
            if (response != null)
            {
                await _authenticationService.LogInAsync(response);
                isSuccessful = true;
            }
            return isSuccessful;
        }
        public async Task<bool> LogInTest(string email, string password, int id, string[] roles = null)
        {
            bool isSuccessful = false;
            var testRoles = new[] { "Mentee", "Mentor", "Admin" };

            var allRoles = roles == null ? testRoles : testRoles.Concat(roles);

            IUserAuthData response = new UserBase
            {
                Id = id
                ,
                Name = email
                ,
                Roles = allRoles
                ,
                TenantId = "Advancing Diversity"
            };

            Claim fullName = new Claim("CustomClaim", "Sabio Bootcamp");
            await _authenticationService.LogInAsync(response, new Claim[] { fullName });

            return isSuccessful;
        }
        public List<RoleAnalytics> GetUserAnalytics()

        {
            string procName = "dbo.[Users_SelectAll_Statistics]";
            List<RoleAnalytics> rolesList = null;

            _dataProvider.ExecuteCmd(procName,
                    inputParamMapper: null,
                    singleRecordMapper: delegate (IDataReader reader, short set)
                    {
                        int startingIndex = 0;
                    
                        RoleAnalytics aRole = new RoleAnalytics();
                            
                            aRole.RoleName = reader.GetSafeString(startingIndex++);
                            aRole.Quantity = reader.GetSafeInt32(startingIndex++);
                            aRole.UsersGrowth = reader.DeserializeObject<List<DateGrowth>>(startingIndex++);
                           
                            if( rolesList == null )
                            {
                                rolesList = new List<RoleAnalytics>();
                            }

                            rolesList.Add(aRole);
                        
                    });

            return rolesList;
        }  
        private IUserAuthData Get(string email, string password)
        {
            string passwordFromDb = "";
            UserBase user = null;
            string procName = "[dbo].[Users_SelectPass_ByEmail]";

            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Email", email);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                UserBase userBase = MapUserBase(reader, ref passwordFromDb, ref startingIndex);
                bool isValidCredentials = BCrypt.BCryptHelper.CheckPassword(password, passwordFromDb);

                if (isValidCredentials)
                {
                    user = userBase;
                }
            });

            return user; 
        }
        private static UserBase MapUserBase(IDataReader reader, ref string passwordFromDb, ref int startingIndex)
        {
            UserBase user = new UserBase();
            user.Id = reader.GetSafeInt32(startingIndex++);
            user.Name = reader.GetSafeString(startingIndex++);
            passwordFromDb = reader.GetSafeString(startingIndex++);
            user.Roles = new[] {reader.GetSafeString(startingIndex++) };
            user.TenantId = "Advancing Diversity";
            return user;
        }
        private static Users MapUser(IDataReader reader, ref int startingIndex)
        {
            Users aUser = new Users();
            aUser.Id = reader.GetSafeInt32(startingIndex++);
            aUser.Email = reader.GetSafeString(startingIndex++);
            aUser.Password = reader.GetSafeString(startingIndex++);
            aUser.IsConfirmed = reader.GetSafeBool(startingIndex++);
            aUser.Status = reader.GetSafeString(startingIndex++);
            return aUser;
        }
        private static void AddCommonParams(UserAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Email", model.Email);
            col.AddWithValue("@Password", model.Password);
            col.AddWithValue("@IsConfirmed", model.IsConfrimed);
            col.AddWithValue("@UserStatusId", model.UserStatusId);          
        }

        
    }
}
