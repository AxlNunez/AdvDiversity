USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[Users_Delete_ById]    Script Date: 8/16/2022 10:35:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




ALTER PROC [dbo].[Users_Delete_ById] 

			@Id int

AS 

/* ----TEST CODE----

	DECLARE @Id int = 19

	EXECUTE dbo.Users_Delete_ById @Id

	SELECT * 
	FROM dbo.Users

	

*/----END TEST CODE----

BEGIN


	UPDATE dbo.Users
	SET [UserStatusId] = 2
	WHERE @Id = Id


END



