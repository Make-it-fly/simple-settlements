import BuildingData from "../datamodels/building.js";
import ResourceData from "../datamodels/resource.js";
import BuildingSheet from "../sheets/building-sheet.js";
import ResourceSheet from "../sheets/resource-sheet.js";

Hooks.once("init", async function () {
	assignAndRegisterAll();
	loadHandleBarTemplates();
});

/* Hooks.once('ready', async function() {

}); */


function assignAndRegisterAll() {
	/* Building Assign */
	Object.assign(CONFIG.Actor.dataModels, {
		"simple-settlements.building": BuildingData,
	});
	Actors.registerSheet("building", BuildingSheet, {
		types: ["simple-settlements.building"],
		makeDefault: true,
	});
	/* Resource Assign */
	Object.assign(CONFIG.Item.dataModels, {
		"simple-settlements.resource": ResourceData,
	});
	Items.registerSheet("resource", ResourceSheet, {
		types: ["simple-settlements.resource"],
		makeDefault: true,
	});
}

async function loadHandleBarTemplates()
{
  // register templates parts
  const templatePaths = [
    "modules/simple-settlements/templates/parts/building-resources-manager.html"
  ];
  return loadTemplates( templatePaths );
}