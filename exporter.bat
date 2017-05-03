@echo off
set source=%~dp0
set destination=%cd%
xcopy %source%source %destination%\src\app\ngx-plate /i