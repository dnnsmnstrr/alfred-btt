ObjC.import('stdlib')

function run(argv) {
  var query = argv[0];
  var shared_secret = $.getenv('BTT_SHARED_SECRET') || ''
  const DEBUG = false
  try {
    let BetterTouchTool = Application('BetterTouchTool');
    let namedTriggerId = 643
    const namedTriggersObject = { trigger_id: namedTriggerId }
    if (!!shared_secret) {
      namedTriggersObject.shared_secret = shared_secret
    }
    let allNamedTriggersJSONString = BetterTouchTool.get_triggers(namedTriggersObject);
    if (!allNamedTriggersJSONString || allNamedTriggersJSONString.includes('error')) {
        return JSON.stringify({ items: [{ title: allNamedTriggersJSONString || 'Error', subtitle: 'Please make sure external scripting is enabled in BTT and the shared secret is configured properly' }] })
    }
    let allTriggers = JSON.parse(allNamedTriggersJSONString);
    const items = allTriggers.map(trigger => {
      const triggerUrl = `btt://trigger_named/?trigger_name=${encodeURIComponent(trigger.BTTTriggerName)}${shared_secret ? '&shared_secret=' + shared_secret : ''}`
      return {
        uid: trigger.BTTUUID,
        title: trigger.BTTTriggerName,
        subtitle: trigger.BTTPredefinedActionName,
        autocomplete: trigger.BTTTriggerName,
        arg: trigger.BTTTriggerName,
        text: {
          copy: JSON.stringify(trigger),
          largetype: trigger.BTTGestureNotes || trigger.BTTGenericActionConfig
        },
        quicklookurl: triggerUrl
      }
    })

    return JSON.stringify({ items });
  } catch (err) {
    const items = [{ title: 'Error', subtitle: err.message }]
    return JSON.stringify({ items: DEBUG ? items : [] })
  }
}