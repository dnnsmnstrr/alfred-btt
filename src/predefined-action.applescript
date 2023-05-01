on run argv
  set theQuery to item 1 of argv
  set theSecret to (system attribute "BTT_SHARED_SECRET")
  set theAction to "{\"BTTPredefinedActionType\": " & theQuery & "}"
  tell application "BetterTouchTool"
	try
		trigger_action theAction shared_secret theSecret
	on error
		display notification "Could not execute named trigger." with title "Error"
	end try

  end tell
  return theAction
end run