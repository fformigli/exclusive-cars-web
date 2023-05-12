@echo off

rmdir /s /q node_modules dist
call npm install
call tsc
