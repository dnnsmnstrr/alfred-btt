on run argv
  set theQuery to item 1 of argv
  set theSecret to (system attribute "BTT_SHARED_SECRET")

  tell application "BetterTouchTool"
    try
      trigger_named_async_without_response theQuery shared_secret theSecret
    on error
      display notification "Could not execute named trigger." with title "Error"
    end try
  end tell
  return theQuery
end run