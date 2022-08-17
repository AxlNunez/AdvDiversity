USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[Users_Select_ByEmail]    Script Date: 8/16/2022 10:37:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROC [dbo].[Users_Select_ByEmail]
			@Email nvarchar(100)

AS


/*----TEST CODE----

	DECLARE @Email nvarchar(100) = 'admintest@diversity.com'

	EXECUTE dbo.Users_Select_ByEmail @Email

	
	
*/----END TEST CODE----

BEGIN 


	  SELECT [Id]
			,[Email]


	  FROM	[dbo].[Users]


	  WHERE Email = @Email


END 
