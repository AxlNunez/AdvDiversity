USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[UserTokens_Insert]    Script Date: 8/16/2022 10:39:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER   PROC [dbo].[UserTokens_Insert]
		@Email nvarchar(100)
		,@Token varchar(200)
		,@TokenType int

AS
/*

DECLARE @Email nvarchar(100) = 'admintest@diversity.com'
		,@Token varchar(200) = 'sads1223sda22313sdas2312313'
		,@TokenType int =2


EXECUTE dbo.UserTokens_Insert 
			@Token
			,@UserId
		    ,@TokenType
*/

BEGIN
DECLARE @UserId int 



SET @UserId =(
Select u.Id 
FROM dbo.Users AS u
WHERE u.email = @Email)



INSERT INTO dbo.UserTokens
		(Token,
		UserId,
		TokenType)
VALUES
		(@Token,
		@UserId,
		@Tokentype)
END
