USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[SiteReferences_Insert]    Script Date: 8/16/2022 11:10:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER proc [dbo].[SiteReferences_Insert]

				@ReferenceTypeId int
				,@UserId int

AS

/*
DECLARE @ReferenceTypeId int = 2
		,@UserId int = 8

EXECUTE [dbo].[SiteReferences_Insert]
		@ReferenceTypeId
		,@UserId

SELECT *
FROM [dbo].[SiteReferences]

*/
BEGIN

INSERT INTO [dbo].[SiteReferences]
           ([ReferenceTypeId]
           ,[UserId])
     VALUES
           (@ReferenceTypeId
           ,@UserId)
END
