USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[SiteReferences_Pagination]    Script Date: 8/16/2022 11:11:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER proc [dbo].[SiteReferences_Pagination]

			@PageIndex int 
			,@PageSize int

AS

/*
DECLARE
			@PageIndex int = 0
			,@PageSize int = 10

Execute dbo.SiteReferences_Pagination @PageIndex, @PageSize

SELECT *
FROM dbo.SiteReferences

SELECT *
FROM dbo.Users

*/
BEGIN
	DECLARE		@offset int = @PageIndex * @PageSize

	SELECT		
		sr.ReferenceTypeId
		--,rt.Id
		,rt.[Name]
		,sr.UserId

	FROM	  [dbo].[SiteReferences] AS sr 
	inner join [dbo].[ReferenceTypes] as rt
		ON		  sr.ReferenceTypeId = rt.Id
	WHERE		sr.ReferenceTypeId = rt.Id
	ORDER BY  sr.ReferenceTypeId ASC
			  OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY

END


