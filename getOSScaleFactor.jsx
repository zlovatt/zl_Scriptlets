/*
		This function returns scale factor for your OS.
		On MacOS, this seems to always be fixed at 1.0 for standard displays, or 2.0 for Retina, regardless of zoom or resolution?
		On Windows, this is the result of the DPI slider and resolution setting, as well as the effective resolution of your display.

		Sample tests on my Surface Pro 3 (fixed 2160x1440, 216ppi)
			--------------
			User settings:
			DPI SLIDER: 1.5x, RESOLUTION: 2160x1440

			baseResolution: 1440,960
			effectiveResolution: 2160,1440
			---
			Scaling: 1.5
			--------------

			--------------
			User settings:
			DPI SLIDER: 1.5x, RESOLUTION: 1920x1200

			baseResolution: 1280,800
			effectiveResolution: 2160,1440
			---
			Scaling: 1.6875
			--------------
*/

(function getOSScaleFactor () {
	var debug = true;

	var scaleFactor = getOSScaleFactor();
	log(scaleFactor);

	function getOSScaleFactor () {
		if (isWindows())
			return getWindowsScaleFactor();
		else if (isRetina())
			return 2.0;
	}

	function isRetina() {
		if (isWindows()) return;

		var command = "system_profiler SPDisplaysDataType | grep Resolution";
		var result = system.callSystem(command).toString();

		if (result.toLowerCase().match("retina"))
			return true;
	}

	function getWindowsScaleFactor () {
		if (!isWindows()) return;

		var effectiveResolution = getEffectiveResolution();
		var baseResolution = getBaseResolution();

		log("windowsScaleFactor: " + String(effectiveResolution[0] / baseResolution[0]));
		return effectiveResolution[0] / baseResolution[0];
	}

	// This returns
	function getBaseResolution () {
		var powerShellCmdBase = "cmd /c \"for /f %l in (\'powershell -command \"Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.Screen]::PrimaryScreen.Bounds.";
		var powerShellCmdEnd = "\"\') do @set var=%l && echo %l\"";
		var width = parseInt(system.callSystem(powerShellCmdBase + "Width" + powerShellCmdEnd));
		var height = parseInt(system.callSystem(powerShellCmdBase + "Height" + powerShellCmdEnd));

		log("baseResolution: " + String([width, height]));

		return [
			width,
			height
		];
	}

	// This returns the effective resolution of the monitor
	function getEffectiveResolution () {
		var command = "wmic path Win32_VideoController get ";
		var width = parseInt(system.callSystem(command + "CurrentHorizontalResolution").toString().split("\n")[1]);
		var height = parseInt(system.callSystem(command + "CurrentVerticalResolution").toString().split("\n")[1]);

		log("effectiveResolution: " + String([width, height]));

		return [
			width,
			height
		];
	}

	function isWindows () {
		return $.os.indexOf("Windows") > -1;
	}

	function log (str) {
		if (typeof debug === "undefined")
			debug = false;

		if (debug === true)
			$.writeln(String(str));
	}
})();
