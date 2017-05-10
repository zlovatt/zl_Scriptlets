(function findAllPresetFiles() {
	var presetFiles = [];
	var presetPaths = getPresetPaths();

	for (var i = 0, il = presetPaths.length; i < il; i++) {
		var presetDirectoryPath = presetPaths[i];
		var presetFolder = new Folder(presetDirectoryPath);

		var folderPresets = recursiveGetFiles(presetFolder, [], ".ffx");
		presetFiles = presetFiles.concat(folderPresets);
	}

	$.writeln("Found " + presetFiles.length + " presets.");
	return presetFiles;




	function getPresetPaths () {
		var prettyName = "";
		var appVersion = parseFloat(app.version);

		if (parseInt(appVersion) == 11)
			prettyName = "CS6";
		else if (parseInt(appVersion) == 12)
			prettyName = "CC";
		else if (appVersion >= 13.0 && appVersion < 13.5)
			prettyName = "CC 2014";
		else if (appVersion >= 13.5 && appVersion < 14.0)
			prettyName = "CC 2015";
		else if (appVersion >= 14.0)
			prettyName = "CC 2017";

		return [
			Folder.current.fullName + "/Presets/",
			Folder.myDocuments.fullName + "/Adobe/After Effects " + prettyName + "/User Presets/"
		];
	}

	function recursiveGetFiles (rootFolder, files, searchTerm) {
		searchTerm = searchTerm || "";
		files = files || [];

		var folderFiles = rootFolder.getFiles();

		for (var i = 0, il = folderFiles.length; i < il; i++) {
			var file = folderFiles[i];

			if (file instanceof Folder) {
				recursiveGetFiles(file, files, searchTerm);
			} else {
				if (file.displayName.indexOf(searchTerm) > -1)
					files.push(file);
			}
		}

		return files;
	}
})();
