USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[SiteReferences_SelectAllTotals]    Script Date: 8/16/2022 11:14:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER proc [dbo].[SiteReferences_SelectAllTotals]


/*
EXECUTE [dbo].[SiteReferences_SelectAllTotals]
*/

AS

BEGIN

SELECT sr.ReferenceTypeId
		,rt.[Name]
		,SiteCount = COUNT(1)
FROM	  [dbo].[SiteReferences] AS sr 
	inner join [dbo].[ReferenceTypes] as rt
		ON sr.ReferenceTypeId= rt.Id
GROUP BY sr.ReferenceTypeId, rt.[Name]
		

END
