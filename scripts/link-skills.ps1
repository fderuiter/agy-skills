param()
$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Repo = Split-Path -Parent $ScriptDir
$Dests = @(
    (Join-Path $HOME ".gemini\config\skills"),
    (Join-Path $HOME ".agents\skills"),
    (Join-Path $Repo ".agents\skills"),
    (Join-Path $Repo ".agents\plugins\agy-skills\skills")
)

$SkillFiles = Get-ChildItem -Path (Join-Path $Repo "skills") -Recurse -Filter "SKILL.md" | 
    Where-Object { $_.FullName -notmatch '[\\/]deprecated[\\/]' -and $_.FullName -notmatch '[\\/]node_modules[\\/]' }

Write-Host "Found $($SkillFiles.Count) skills to link from $Repo"

foreach ($Dest in $Dests) {
    if (-not (Test-Path $Dest)) {
        New-Item -ItemType Directory -Path $Dest -Force | Out-Null
    }

    foreach ($SkillFile in $SkillFiles) {
        $SkillDir = $SkillFile.Directory
        $SkillName = $SkillDir.Name
        $TargetPath = Join-Path $Dest $SkillName

        if (Test-Path $TargetPath) {
            $Item = Get-Item $TargetPath -Force
            if ($Item.Attributes -band [System.IO.FileAttributes]::ReparsePoint) {
                $Item.Delete()
            } else {
                Remove-Item -Path $TargetPath -Recurse -Force
            }
        }

        New-Item -ItemType Junction -Path $TargetPath -Target $SkillDir.FullName | Out-Null
        Write-Host "Linked $SkillName -> $($SkillDir.FullName) ($Dest)"
    }
}

$PluginRulesDir = Join-Path $Repo ".agents\plugins\agy-skills\rules"
if (-not (Test-Path $PluginRulesDir)) {
    New-Item -ItemType Directory -Path $PluginRulesDir -Force | Out-Null
}
$SrcAgentsMd = Join-Path $Repo "AGENTS.md"
$DestAgentsMd = Join-Path $PluginRulesDir "AGENTS.md"
if (Test-Path $SrcAgentsMd) {
    Copy-Item -Path $SrcAgentsMd -Destination $DestAgentsMd -Force
    Write-Host "Synced rules -> $DestAgentsMd"
}

Write-Host "`nAll skills linked successfully into Antigravity directories!"