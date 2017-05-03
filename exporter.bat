@echo off
set source=%~dp0
set destination=%cd%
xcopy %source%src\ngx-plate %destination%\src\app\ngx-plate /i
xcopy %source%src\index %destination%\src\app /i