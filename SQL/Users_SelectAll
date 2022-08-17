USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectAll]    Script Date: 8/16/2022 10:44:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO









ALTER PROC [dbo].[Users_SelectAll] 
			@PageIndex int
			,@PageSize int



AS



/*----TEST CODE----

	
	
	DECLARE	@PageIndex int = 0
			 ,@PageSize int = 5

	EXECUTE dbo.Users_SelectAll
			@PageIndex
			,@PageSize 

*/----END TEST CODE----

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT u.[Id]
		  ,u.[Email]
		  ,u.[Password]
		  ,u.[IsConfirmed]
		  ,u.[Email]
		  ,us.[Name]
		  ,TotalCount = COUNT(1) OVER()
	 FROM [dbo].[Users] AS u INNER JOIN dbo.UserStatus AS us
		ON u.UserStatusId = us.Id


	ORDER BY u.Id
	OFFSET @offSet ROWS
	FETCH NEXT @PageSize ROWS ONLY

END
