#!/usr/bin/env pwsh
# Script para probar POST en Koyeb después del redeploy

$baseUrl = "https://encouraging-kacy-compendium-91d5ed98.koyeb.app"

Write-Host "Testing POST /api/pacientes en Koyeb..." -ForegroundColor Cyan

$body = @{
    nombre = "Juan Pérez - $(Get-Date -Format 'HHmmss')"
    rut = "20.987.654-3"
    piso = 7
    turno = "TARDE"
} | ConvertTo-Json

Write-Host "Body: $body" -ForegroundColor Gray

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/pacientes" `
        -Method POST `
        -Headers @{"Content-Type"="application/json"} `
        -Body $body `
        -UseBasicParsing
    
    Write-Host "✅ POST exitoso - Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Green
}
catch {
    $statusCode = $_.Exception.Response.StatusCode.Value
    Write-Host "❌ Error - Status: $statusCode" -ForegroundColor Red
    
    if ($statusCode -eq 403) {
        Write-Host "CSRF o CORS aún bloqueando. Koyeb probablemente no ha redeploy aún." -ForegroundColor Yellow
        Write-Host "Espera 2 minutos más y vuelve a intentar." -ForegroundColor Yellow
    }
}
