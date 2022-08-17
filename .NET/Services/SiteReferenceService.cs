using Sabio.Data.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Sabio.Models.Domain;
using Sabio.Models;
using System.Data;
using Sabio.Data;
using Sabio.Services.Interfaces;
using Sabio.Models.Requests.SiteReferences;

namespace Sabio.Services
{
    public class SiteReferenceService : ISiteReferenceService
    {
        IDataProvider _data = null;
        public SiteReferenceService(IDataProvider data)
        { _data = data; }

        public List<SiteReference> GetAllSiteReferences()
        {


            List<SiteReference> list = null;
            string procName = "[dbo].[SiteReferences_SelectAllTotals]";
            _data.ExecuteCmd(procName, inputParamMapper: null,
             singleRecordMapper: delegate (IDataReader reader, short set)
             {
                 int startingIndex = 0;
                 SiteReference newReference = MapSingleReference(reader, ref startingIndex);
                 if (list == null)
                 {
                     list = new List<SiteReference>();
                 }
                 list.Add(newReference);
             });
            return list;
        }

        public List<ReferenceType> GetAllReferenceTypes()
        {
            List<ReferenceType> list = null;
            string procName = "[dbo].[ReferenceTypes_SelectAll]";
            _data.ExecuteCmd(procName, inputParamMapper: null,
             singleRecordMapper: delegate (IDataReader reader, short set)
             {
                 int startingIndex = 0;
                 ReferenceType newReference = new ReferenceType();
                 newReference.Id = reader.GetSafeInt32(startingIndex++);
                 newReference.Name = reader.GetSafeString(startingIndex++);
                 if (list == null)
                 {
                     list = new List<ReferenceType>();
                 }
                 list.Add(newReference);
             });
            return list;
        }

        public int AddSiteReference(SiteReferencesAddRequest request)
        {
            string procName = "[dbo].[SiteReferences_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonSiteReferenceParams(request, col);
            },
            returnParameters: null);

            return request.ReferenceTypeId;
        }

        public Paged<SiteReference> PaginatedSiteReferences(int pageIndex, int pageSize)
        {
            Paged<SiteReference> pagedResult = null;
            List<SiteReference> result = null;
            int totalCount = 0;
            string procName = "[dbo].[SiteReferences_Pagination]";
            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    SiteReference newService = MapSingleReference(reader, ref startingIndex);
                    totalCount = startingIndex++;
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (result == null)
                    {
                        result = new List<SiteReference>();
                    }
                    result.Add(newService);
                }
            );
            if (result != null)
            {
                pagedResult = new Paged<SiteReference>(result, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }

        private static SiteReference MapSingleReference(IDataReader reader, ref int startingIndex)
        {
            SiteReference newReference = new SiteReference();
            newReference.ReferenceTypeId = reader.GetSafeInt32(startingIndex++);
            newReference.Name = reader.GetSafeString(startingIndex++);
            newReference.UserId = reader.GetSafeInt32(startingIndex++);
            return newReference;
        }

        private static void AddCommonSiteReferenceParams(SiteReferencesAddRequest request, SqlParameterCollection col)
        {
            col.AddWithValue("@ReferenceTypeId", request.ReferenceTypeId);
            col.AddWithValue("@UserId",request.UserId);
        }


    }
}
