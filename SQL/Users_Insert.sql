USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[Users_InsertV2]    Script Date: 8/16/2022 10:29:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




ALTER PROC [dbo].[Users_InsertV2]
		@Email nvarchar(100)
		,@Password varchar(100)
		,@IsConfirmed bit
		,@UserStatusId int
		,@RoleId int
		,@Id int OUTPUT

AS
/*----TEST CODE----

	DECLARE @Email nvarchar(100) = 'test11@email.com'
			,@Password varchar (100) = 'Password1234'
			,@IsConfirmed bit = 'true'
			,@UserStatusId int = 3
			,@RoleId int = 2
			,@Id int = 0
			


	EXECUTE dbo.Users_InsertV2
			@Email
			,@Password
			,@IsConfirmed
			,@UserStatusId
			,@RoleId
			,@Id OUTPUT

	SELECT * 
	FROM dbo.Users
	WHERE @Id = Id

	Select * from dbo.UserRoles

*/----END TEST CODE----

BEGIN

	IF NOT EXISTS (SELECT 1
			FROM dbo.Users 
			WHERE Email = @Email)

		INSERT INTO dbo.Users
				([Email]
				,[Password]
				,[IsConfirmed]
				,[UserStatusId])

		VALUES (@Email
				,@Password
				,@IsConfirmed
				,@UserStatusId)
	
		SET @Id = SCOPE_IDENTITY()

		DECLARE @UserId int = @Id

		EXECUTE dbo.UserRoles_Insert @UserId, @RoleId
	
END
