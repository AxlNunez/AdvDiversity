USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[ReferenceTypes_SelectAll]    Script Date: 8/16/2022 11:14:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER proc [dbo].[ReferenceTypes_SelectAll]


/*
	EXECUTE [dbo].[ReferenceTypes_SelectAll]
*/

AS
BEGIN

SELECT [Id]
      ,[Name]
  FROM [dbo].[ReferenceTypes]

END


