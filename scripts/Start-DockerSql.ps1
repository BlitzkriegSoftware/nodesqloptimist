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
[string]$dockerImage="mcr.microsoft.com/mssql/server:2022-latest"
[string]$justScript = "optimist.sql"
[string]$IMAGENAME="sql-docker"
[string]$DBNAME="optimist"
[string]$SAPASS="blitz!2023stw-"

# Dispose of any old running ones
$null = (docker stop "${IMAGENAME}") 2> $null
$null = (docker rm "${IMAGENAME}") 2> $null

[string]$pwd = $(Get-Location).Path

$dbPath = Join-Path -Path $pwd -ChildPath "db"

docker pull $dockerImage
docker run -d -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=${SAPASS}" -p "${SQLPORT}:${SQLPORT}" --volume "${dbPath}:/db" --workdir "/db" --name="${IMAGENAME}" --hostname="${IMAGENAME}" $dockerImage

Write-Output "Waiting for SQL to Start"

Start-Sleep -Seconds 30

docker exec -t $IMAGENAME cat /var/opt/mssql/log/errorlog

Write-Output "Creating $DBNAME from ${justScript}"

docker exec -it $IMAGENAME //opt/mssql-tools18/bin/sqlcmd  -C -S '.' -U sa -P $SAPASS -i //db/$justScript

$SQLCN="Server=127.0.0.1,${SQLPORT};Database=${DBNAME};User Id=sa;Password=${SAPASS};Encrypt=no;"

setx BLITZSQL $SQLCN
setx BLITZSQLPORT $SQLPORT
setx BLITZSQLPASS $SAPASS
setx BLITZSQLNAME $DBNAME

Write-Output "ConnectionString: ${SQLCN}"