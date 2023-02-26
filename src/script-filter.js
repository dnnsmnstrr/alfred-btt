function run(argv) {
  var query = argv[0];

  try {
    let BetterTouchTool = Application('BetterTouchTool');
    let namedTriggerId = 643
    let allNamedTriggersJSONString = BetterTouchTool.get_triggers({trigger_id: namedTriggerId });
    let allTriggers = JSON.parse(allNamedTriggersJSONString);
    const items = allTriggers.map(trigger => {
      const triggerUrl = `btt://trigger_named/?trigger_name=${encodeURIComponent(trigger.BTTTriggerName)}`
      return {
        uid: trigger.BTTUUID,
        title: trigger.BTTTriggerName,
        subtitle: trigger.BTTPredefinedActionName,
        autocomplete: trigger.BTTTriggerName,
        arg: trigger.BTTTriggerName,
        text: {
          copy: triggerUrl,
          largetype: trigger.BTTGestureNotes || trigger.BTTGenericActionConfig
        },
        quicklookurl: triggerUrl
      }
    })

    return JSON.stringify({ items });
  } catch (err) {
    return JSON.stringify({ items: [] })
  }
}
