USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[Users_Change_Password]    Script Date: 8/16/2022 10:38:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




ALTER   PROC [dbo].[Users_Change_Password]
			@Token varchar(200)
			,@Password varchar (100)
			,@Tokentype int


AS

/*----TEST CODE----
	Declare @Token varchar(200)='00742d0ab7744744abe9c5dbf51b6402'
			,@Password varchar(100)='Helooooooooooo'
			,@TokenType int =2

	EXECUTE [DBO].[Users_Change_Password] @Token, @Password, @TokenType

	Select *
	From dbo.UserTokens
	Where token=@Token
	Select *
	From dbo.Users
	Where password=@Password


----END TEST CODE----
*/


IF ((SELECT UserId 
	From dbo.UserTokens
	Where Token =@Token)) > 0



 BEGIN

	DECLARE @UserId int

	SET @UserId = (SELECT UserId 
	From dbo.UserTokens
	Where Token =@Token)
	

	UPDATE dbo.Users
	SET [Password] =@Password
	WHERE  Id =@UserId

	 DELETE from dbo.UserTokens
	 WHERE Token =@Token AND TokenType = 2


 END
