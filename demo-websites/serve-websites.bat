@echo off

echo Serving demo-website-1...
start /B http-server demo-website-1 -p 4001 --silent
timeout /t 3
echo demo-website-1 server started.
echo.

echo Serving demo-website-2...
start /B http-server demo-website-2 -p 4002 --silent
timeout /t 3
echo demo-website-2 server started.
echo.

echo Serving demo-website-3...
start /B http-server demo-website-3 -p 4003 --silent
timeout /t 3
echo demo-website-3 server started.
echo.

echo Serving demo-website-4...
start /B http-server demo-website-4 -p 4004 --silent
timeout /t 3
echo demo-website-4 server started.
echo.

echo Serving demo-website-5...
start /B http-server demo-website-5 -p 4005 --silent
timeout /t 3
echo demo-website-5 server started.
echo.

echo To kill the serves, close the command prompt window.
