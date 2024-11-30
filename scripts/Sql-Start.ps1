<#
	
    .SYNOPSIS
        Start SQL Server 
        Load Sample Data

    .DESCRIPTION
        See above
    
    .INPUTS
        none

    .OUTPUTS
        Sucess or failure 
#>

Import-Module Microsoft.PowerShell.Utility

function Get-DockerRunning {

	[bool]$DockerAlive = $false

	try {
		$null = Get-Process 'com.docker.backend'
		$DockerAlive = $true;
	} catch {
		$DockerAlive = $false;
	}

	return $DockerAlive
}

#
# Main
#

Set-StrictMode -Version 2.0
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls -bor [Net.SecurityProtocolType]::Tls11 -bor [Net.SecurityProtocolType]::Tls12
Push-Location $PSScriptRoot

[bool]$da = Get-DockerRunning

if(! $da) {
	Write-Error "docker must be running 1st"
	return 1
}

[int]$SQLPORT=1433
[string]$imageName="sql-docker"
[string]$SAPASS="blitz!2023stw-"
[string]$dbname="Northwind"
[string]$justscript = "instnwnd.sql"

# Dispose of any old running ones
$null = (docker stop "${imageName}") 2> $null
$null = (docker rm "${imageName}") 2> $null

[string]$pwd = $(Get-Location).Path

$dbPath = Join-Path -Path $pwd -ChildPath "db"

$dockerImage="mcr.microsoft.com/mssql/server:2022-latest"

docker pull $dockerImage
docker run -d -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=${SAPASS}" -p "${SQLPORT}:${SQLPORT}" --volume "${dbPath}:/db" --workdir "/db" --name="${imageName}" --hostname="${imageName}" $dockerImage

Write-Output "Waiting for SQL to Start"

Start-Sleep -Seconds 30

docker exec -t $imageName cat /var/opt/mssql/log/errorlog

Write-Output "Creating $dbname from $justscript"

docker exec -it $imageName //opt/mssql-tools18/bin/sqlcmd  -C -S '.' -U sa -P $SAPASS -i //db/$justscript

$SQLCN="Server=127.0.0.1,${SQLPORT};Database=${dbname};User Id=sa;Password=${SAPASS};Encrypt=no;"
setx BLITZSQL $SQLCN

Write-Output "ConnectionString: ${SQLCN}"