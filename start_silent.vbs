Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
If fso.FileExists(scriptDir & "\server.js") Then
    projDir = scriptDir
Else
    projDir = "C:\Users\tamil\.gemini\antigravity\scratch\premium-portfolio"
End If

' 1. Check if server is already running on port 8000
isRunning = False
On Error Resume Next
Set http = CreateObject("MSXML2.ServerXMLHTTP.6.0")
http.Open "GET", "http://127.0.0.1:8000/api/db/init", False
http.setTimeouts 600, 600, 600, 600
http.Send
If http.Status = 200 Then
    isRunning = True
End If
On Error GoTo 0

' 2. If not running, clear any conflicting process on port 8000 and start Node.js server completely hidden
If Not isRunning Then
    WshShell.Run "powershell -NoProfile -Command ""Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }""", 0, True
    WScript.Sleep 300
    WshShell.CurrentDirectory = projDir
    nodeExe = "node"
    If fso.FileExists(projDir & "\node.exe") Then
        nodeExe = """" & projDir & "\node.exe"""
    ElseIf fso.FileExists("C:\Program Files\nodejs\node.exe") Then
        nodeExe = """C:\Program Files\nodejs\node.exe"""
    End If
    
    WshShell.Run nodeExe & " """ & projDir & "\server.js""", 0, False
    
    ' Wait for server to bind port 8000
    For i = 1 To 20
        WScript.Sleep 250
        On Error Resume Next
        Set http2 = CreateObject("MSXML2.ServerXMLHTTP.6.0")
        http2.Open "GET", "http://127.0.0.1:8000/api/db/init", False
        http2.setTimeouts 400, 400, 400, 400
        http2.Send
        If http2.Status = 200 Then
            Exit For
        End If
        On Error GoTo 0
    Next
End If

' 3. Open in default browser
WshShell.Run "http://localhost:8000"
