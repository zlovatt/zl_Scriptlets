function zl_toggleJSDebugger()
	{
		// Do the work
		app.beginUndoGroup("Toggle Javascript Debugger");

		try
		{
			// Toggle the pref, save to disk, and reload so it's active in the current session
			if (parseFloat(app.version) >= 12.0)
			{
				var newSetting = +!(app.preferences.getPrefAsLong("Main Pref Section v2", "Pref_JAVASCRIPT_DEBUGGER", PREFType.PREF_Type_MACHINE_INDEPENDENT) === 1);

				app.preferences.savePrefAsLong("Main Pref Section v2", "Pref_JAVASCRIPT_DEBUGGER", newSetting, PREFType.PREF_Type_MACHINE_INDEPENDENT);
			}
			else
			{
				var newSetting = +!(app.preferences.getPrefAsLong("Main Pref Section", "Pref_JAVASCRIPT_DEBUGGER") === 1);

				app.preferences.savePrefAsLong("Main Pref Section", "Pref_JAVASCRIPT_DEBUGGER", newSetting);
			}
			app.preferences.saveToDisk();
			app.preferences.reload();

			if (newSetting === 0)
				alert("Javascript Debugger Disabled");
			else
				alert("Javascript Debugger Enabled");
		}
		catch (e)
		{
			alert("Can't change prefs!");
		}

		app.endUndoGroup();
	};

zl_toggleJSDebugger();