@echo off
set source=%~dp0
set destination=%cd%
xcopy %source%ngx-plate %destination%\src\app\ngx-plate /i
xcopy %source%index %destination%\src\app /i