USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectAll_Statistics]    Script Date: 8/16/2022 10:41:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROC [dbo].[Users_SelectAll_Statistics]

AS

/*
---- TEST CODE ----

Execute dbo.Users_SelectAll_Statistics

---- END TEST CODE ----

*/

BEGIN

SELECT	
		r.Name
		,COUNT(r.Name) as Count
		,Growth = (
					SELECT	CAST(p.DateCreated as Date) as DateCreated,
							COUNT(1) as Quantity
					FROM	dbo.UserProfiles as p inner join dbo.Users as u
						ON u.Id = p.UserId
						inner join dbo.UserRoles as ur
						ON u.Id = ur.UserId
						inner join dbo.Roles as ro
						ON ur.RoleId = ro.Id
					WHERE NOT r.Name ='Admin' AND ro.Name = r.Name
					GROUP BY ro.Name, CAST(p.DateCreated as Date)
					FOR JSON AUTO
				)				

FROM dbo.Roles as r inner join dbo.UserRoles as ur
		ON r.Id = ur.RoleId
WHERE NOT r.Name ='Admin'
GROUP BY r.Name

END
