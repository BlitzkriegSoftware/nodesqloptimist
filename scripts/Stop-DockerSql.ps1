<#
	
    .SYNOPSIS
        Start SQL Server w. Northwind DB  

    .DESCRIPTION
        See above
    
    .INPUTS
        none

    .OUTPUTS
        Sucess or failure 
#>

[string]$IMAGENAME="sql-docker"

$null = (docker stop "${IMAGENAME}") 2> $null
$null = (docker rm "${IMAGENAME}") 2> $null
