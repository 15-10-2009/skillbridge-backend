$files = @(
  "postman/collections/SkillBridge-Students-API/Get All Students.request.yaml",
  "postman/collections/SkillBridge-Students-API/Create Student.request.yaml",
  "postman/collections/SkillBridge-Students-API/Update Student.request.yaml",
  "postman/collections/SkillBridge-Students-API/Delete Student.request.yaml"
)
foreach ($f in $files) {
  $content = Get-Content $f -Raw
  $updated = $content -replace 'http://localhost:3000/api/students', 'http://localhost:3000/students'
  Set-Content $f -Value $updated -NoNewline
  Write-Host "Updated: $f"
}
