using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.SiteReferences;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/sitereferences")]
    [ApiController]
    public class SiteReferencesApiController : BaseApiController
    {

        private ISiteReferenceService _service = null;
        private IAuthenticationService<int> _authService = null;
        public SiteReferencesApiController(ISiteReferenceService service
          , IAuthenticationService<int> authService
          , ILogger<SiteReferencesApiController> logger) : base(logger)
        {
            _service = service;
            _authService = authService;
        }


        [HttpGet]
        public ActionResult<ItemsResponse<SiteReference>> GetAllSiteReferences()
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                List<SiteReference> list = _service.GetAllSiteReferences();
                if (list == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("NotFound");
                }
                else
                {
                    response = new ItemsResponse<SiteReference> { Items = list };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("references")]
        [AllowAnonymous]
        public ActionResult<ItemsResponse<ReferenceType>> GetAllReferenceTypes()
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                List<ReferenceType> list = _service.GetAllReferenceTypes();
                if (list == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("NotFound");
                }
                else
                {
                    response = new ItemsResponse<ReferenceType> { Items = list };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("paginate")] 
        public ActionResult<ItemResponse<Paged<SiteReference>>> PaginatedSiteReferences(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try 
            {
                Paged<SiteReference> page = _service.PaginatedSiteReferences(pageIndex, pageSize); 
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<SiteReference>> { Item = page };
                }                      
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult<ItemResponse<int>> Create(SiteReferencesAddRequest request)
        {
            {
                ObjectResult result = null;
                try
                {
                    int id = _service.AddSiteReference(request);
                    ItemResponse<int> response = new ItemResponse<int>() { Item = id };
                    result = Created201(response);
                }
                catch (Exception ex)
                {
                    Logger.LogError(ex.ToString());
                    ErrorResponse response = new ErrorResponse(ex.Message);
                    result = StatusCode(500, response);
                }
                return result;
            }
        }



    }
}
