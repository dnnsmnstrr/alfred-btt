on run argv
  set theQuery to item 1 of argv

  tell application "BetterTouchTool"
    try
      trigger_named_async_without_response theQuery
    on error
      display notification "Could not execute named trigger." with title "Error"
    end try
  end tell
  return theQuery
end run
