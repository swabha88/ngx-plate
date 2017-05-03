@echo off
set source=%~dp0
set destination=%cd%
xcopy %source%source%ngx-plate %destination%\src\app\ngx-plate /i
xcopy %source%source%index %destination%\src\app /i