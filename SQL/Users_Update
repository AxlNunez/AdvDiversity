USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[Users_Update]    Script Date: 8/16/2022 10:34:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




ALTER PROC [dbo].[Users_Update]
		@Email nvarchar(100)
		,@Password varchar(100)
		,@IsConfirmed bit
		,@UserStatusId int
		,@Id int

AS

/*----TEST CODE----

	DECLARE @Email nvarchar(100) = 'TEST4@email.com'
			,@Password varchar (100) = 'Password1!'
			,@IsConfirmed bit = 'false'
			,@UserStatusId int = 1
			,@Id int = 19

	EXECUTE dbo.Users_Update
			@Email
			,@Password
			,@IsConfirmed
			,@UserStatusId
			,@Id


	select * from dbo.Users


----END TEST CODE----
*/

BEGIN

	UPDATE dbo.Users
	SET [Email] = @Email
		,[Password] = @Password
		,[IsConfirmed] = @IsConfirmed
		,[UserStatusId] = @UserStatusId


	WHERE Id = @Id

END
