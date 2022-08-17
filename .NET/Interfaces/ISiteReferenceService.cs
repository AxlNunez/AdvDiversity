using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.SiteReferences;
using System.Collections.Generic;

namespace Sabio.Services
{
    public interface ISiteReferenceService
    {
        List<SiteReference> GetAllSiteReferences();
        List<ReferenceType> GetAllReferenceTypes();
        Paged<SiteReference> PaginatedSiteReferences(int pageIndex, int pageSize);

        int AddSiteReference(SiteReferencesAddRequest request);
    }
}