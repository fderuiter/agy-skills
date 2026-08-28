# Human-in-the-loop reproduction loop for Windows PowerShell.
# Copy this file, edit the steps below, and run it.
# The agent runs the script; the user follows prompts in their terminal.
#
# Usage:
#   pwsh hitl-loop.template.ps1
#
# Two helpers:
#   step "<instruction>"          → show instruction, wait for Enter
#   capture VAR "<question>"      → show question, read response into VAR
#
# At the end, captured values are printed as KEY=VALUE for the agent to parse.

$ErrorActionPreference = "Stop"

function step([string]$instruction) {
    Write-Host "`n>>> $instruction"
    Write-Host "    [Enter when done] " -NoNewline
    [void][System.Console]::ReadLine()
}

function capture([string]$varName, [string]$question) {
    Write-Host "`n>>> $question"
    Write-Host "    > " -NoNewline
    $ans = [System.Console]::ReadLine()
    Set-Variable -Name $varName -Value $ans -Scope 1
    return $ans
}

# --- edit below ---------------------------------------------------------

step "Open the app at http://localhost:3000 and sign in."

capture "ERRORED" "Click the 'Export' button. Did it throw an error? (y/n)"

capture "ERROR_MSG" "Paste the error message (or 'none'):"

# --- edit above ---------------------------------------------------------

Write-Host "`n--- Captured ---"
Write-Host "ERRORED=$ERRORED"
Write-Host "ERROR_MSG=$ERROR_MSG"
