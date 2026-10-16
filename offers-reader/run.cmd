@echo off
rem DailyBite offers reader: scheduled daily at 6:40 AM by Windows Task Scheduler (task "DailyBite offers reader").
rem Reads the signed-in offers pages and pushes offers-pack.json before the 7:02 AM refresh trigger.
cd /d "%~dp0"
echo ===== %date% %time% ===== >> reader.log
node reader.mjs >> reader.log 2>&1
