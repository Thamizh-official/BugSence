@echo off
title Premium Portfolio - Port 8000
color 0B
cd /d "%~dp0"

echo ==========================================================
echo          PREMIUM PORTFOLIO LAUNCHER
echo ==========================================================
echo.

set "NODE_EXE="

:: 1. Check embedded node.exe
if exist "%~dp0node.exe" (
    set "NODE_EXE=%~dp0node.exe"
    echo [OK] Using Embedded Node.js...
    goto :START_SERVER
)

:: 2. Check parent PortableTools
if exist "%~dp0..\PortableTools\node.exe" (
    set "NODE_EXE=%~dp0..\PortableTools\node.exe"
    echo [OK] Using PortableTools Node.js...
    goto :START_SERVER
)

:: 3. Check system node
where node >nul 2>nul
if %errorlevel% equ 0 (
    set "NODE_EXE=node"
    echo [OK] Using System Node.js...
    goto :START_SERVER
)

echo [ERROR] Node.js not found!
echo Please make sure 'node.exe' is inside this folder.
echo.
pause
exit /b 1

:START_SERVER
echo [OK] Starting Premium Portfolio on http://127.0.0.1:8000 ...
echo [OK] Opening Web Browser in 3 seconds...
echo.
echo ==========================================================
echo  NOTE: DO NOT CLOSE THIS WINDOW WHILE USING THE APP!
echo ==========================================================
echo.

:: Launch browser in background after 3 seconds
start "" cmd /c "ping 127.0.0.1 -n 4 >nul && start http://127.0.0.1:8000"

:: Run Server
"%NODE_EXE%" server.js

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Server stopped with error code %errorlevel%.
    pause
)
