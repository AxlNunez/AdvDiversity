USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectPass_ByEmail]    Script Date: 8/16/2022 10:43:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





ALTER PROC [dbo].[Users_SelectPass_ByEmail]
			@Email nvarchar(100)

AS 



/*----TEST CODE----

	DECLARE @Email nvarchar(100) = 'test02@email.com'

	EXECUTE dbo.Users_SelectPass_ByEmail @Email

	

*/----END TEST CODE----


BEGIN



	SELECT	u.[Id]
			,u.[Email]
			,u.[Password]
			,r.[Name] AS Roles

	 FROM [dbo].[Users] AS u INNER JOIN dbo.UserStatus AS us
		ON us.Id = u.UserStatusId
		INNER JOIN dbo.UserRoles AS ur
		ON u.Id = ur.UserId
		INNER JOIN dbo.Roles AS r 
		ON r.Id = ur.RoleId
    WHERE (Email LIKE '%' + @Email + '%')
	

	

END


