USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[Users_Select_ById]    Script Date: 8/16/2022 10:46:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




ALTER PROC [dbo].[Users_Select_ById]
			@Id int


AS 



/*----TEST CODE----

	DECLARE @Id int = 6

	EXECUTE dbo.Users_Select_ById @Id



*/----END TEST CODE----



BEGIN



	SELECT u.[Id]
		  ,u.[Email]
		  ,u.[Password]
		  ,u.[IsConfirmed]
		  ,us.[Name] AS Status
	 FROM [dbo].[Users] AS u INNER JOIN dbo.UserStatus AS us
		ON u.UserStatusId = us.Id

	WHERE u.Id = @Id
	                      
END


