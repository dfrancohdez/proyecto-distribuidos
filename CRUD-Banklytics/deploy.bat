@echo off
echo ------Deploying Function: 7CM1-CRUD-Products
echo Current directory:
echo %cd%

echo Installing dependencies
call npm install

if %ERRORLEVEL% neq 0 (
    echo "npm install failed"
    exit /b %ERRORLEVEL%
)

echo Packing...
tar -a -c -f CRUD-Bank.zip index.mjs node_modules src

echo Deployment complete!