export default class MacroManager {
	static handleIncomeData(income, system) {
		const macros = this.getMacros(system, "incomeMacros");
        macros.forEach(macro => {
            eval(macro.command)
        })
	}
    static handleTimePasser(system){
		const income = system.income
        const macros = this.getMacros(system, "turnMacros");
        macros.forEach(macro => {
            eval(macro.command)
        })
    }
	static getMacros(system, key) {
		return system.options.macros[key]
			.split(";")
			.map((macroName) => {
				const foundMacro = game.macros.contents.find(
					(macro) => macro?.name === macroName
				);
				return foundMacro;
			})
			.filter((macro) => macro?.type === "script");
	}
}
/* export default class MacroManager {
	static handleIncomeData(income, flags) {
		const macros = this.getMacros(flags, "incomeMacros");
        macros.forEach(macro => {
            eval(macro.command)
        })
	}
    static handleTimePasser(system){
        const macros = this.getMacros(system.parent.flags, "turnMacros");
        macros.forEach(macro => {
            eval(macro.command)
        })
    }
	static getMacros(flags, key) {
		return flags["simple-settlements"]?.options?.macros?.[key]
			.split(";")
			.map((macroName) => {
				const foundMacro = game.macros.contents.find(
					(macro) => macro?.name === macroName
				);
				return foundMacro;
			})
			.filter((macro) => macro?.type === "script");
	}
}
 */