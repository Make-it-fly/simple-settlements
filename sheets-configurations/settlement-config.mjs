export default class SettlementConfig extends FormApplication {
	constructor(settlementSheet) {
		super();
		this.settlementSheet = settlementSheet;
	}
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["form"],
			popOut: true,
			id: "settlement-config-form",
			title: "My macro calls",
			width: 400,
		});
	}

	get template() {
		const path = "modules/simple-settlements/templates/configs";
		return `${path}/settlement-config.html`;
	}

	getData() {
		// Send data to the template
		const settlement = this.settlementSheet.object;
		const flags = settlement.flags;
		const macros = flags["simple-settlements"]?.options?.macros 
		return {
			macros,
			flags,
			settlement,
			settlementSheet: this.settlementSheet,
		};
	}

	activateListeners(html) {
		super.activateListeners(html);
	}

	async _updateObject(event, formData) {
		const settlement = this.settlementSheet.object;
		const flags = settlement.flags;

		// normal updateObject stuff
		console.log(formData);

		Object.keys(formData).forEach((key) => {
			if (key === "incomeMacros" || key === "turnMacros") {
				ConfigManager.addMacro(settlement, key, formData[key]);
			}
		});

		this.render(); // rerenders the FormApp with the new data.
	}
	ConfigManager = ConfigManager;
}

class ConfigManager {
	static getMacros(settlement, key) {
		settlement.getFlag("simple-settlements", `options.macros.${key}`);
	}
	static addMacro(settlement, key, value) {
		settlement.setFlag(
			"simple-settlements", `options.macros.${key}`, value
		);
	}
	static removeMacro(settlement, key) {
		settlement.unsetFlag("simple-settlements", `options.macros.${key}`);
	}
}