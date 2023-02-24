on run argv
  set theQuery to item 1 of argv
  set theAction to "{\"BTTPredefinedActionType\": " & theQuery & "}"
  tell application "BetterTouchTool"
	try
		trigger_action theAction
	on error
		display notification "Could not execute named trigger." with title "Error"
	end try
	
  end tell
  return theAction
end run
