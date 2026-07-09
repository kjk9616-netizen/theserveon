@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ============================================
echo  서브온 홈페이지 미리보기 서버를 시작합니다
echo  주소: http://localhost:8080/index.html
echo  이 창을 닫으면 서버가 종료됩니다.
echo ============================================

start "ServeOn Preview Server" cmd /k python -m http.server 8080
timeout /t 2 /nobreak >nul
start "" "http://localhost:8080/index.html"
