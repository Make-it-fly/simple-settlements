class SettlementSheet extends ActorSheet {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["sheet", "actor", "simple-settlements-settlement"],
			width: 520,
			height: 480,
			tabs: [
				{
					navSelector: ".sheet-tabs",
					contentSelector: ".sheet-body",
					initial: "description",
				},
			],
		});
	}
	get template() {
		const path = "modules/simple-settlements/templates";
		return `${path}/settlement-sheet.html`;
	}
	async getData() {
		const context = super.getData();

		await this._prepareDescriptionData(context);

		context.buildings = context.actor.system.buildings;

		console.log(context);
		// console.log("preparing sheet data");

		return context;
	}

	activateListeners(html) {
		/* html.find(".isInactiveCheckbox").change((ev) => {
			const buildingId = ev.currentTarget.closest(".building-card").attributes["data-building-id"].value;
			if (ev.target.checked) {
				this._registerInactiveBuilding(buildingId);
			} else {
				this._unregisterInactiveBuilding(buildingId);
			}
		}); */

		html.find(".item-see").click((ev)=>{
			const buildingId = ev.currentTarget.closest(".building-card").attributes["data-building-id"].value;
			game.actors.get(buildingId).sheet.render(true)
			// console.log(ev)

		})
		html.find(".item-remove").click((ev)=>{
			const buildingId = ev.currentTarget.closest(".building-card").attributes["data-building-id"].value;
			this.object.unsetFlag("simple-settlements", `buildings.${buildingId}`);
		})
		html.find(".quantity-control-up").click((ev)=>{
			const buildingId = ev.currentTarget.closest(".building-card").attributes["data-building-id"].value;
			this._addQuantityToBuilding(buildingId)
			
		})
		html.find(".quantity-control-down").click((ev)=>{
			const buildingId = ev.currentTarget.closest(".building-card").attributes["data-building-id"].value;
			this._removeQuantityToBuilding(buildingId)
		})
	}
	async _prepareDescriptionData(context) {
		context.description = await TextEditor.enrichHTML(
			this.object.system.description,
			{
				async: true,
				secrets: this.object.isOwner,
				relativeTo: this.object,
			}
		);
	}

	_addQuantityToBuilding(buildingId){
		/* const actualQuantity = this.object.getFlag('simple-settlements', `buildingsQuantity.${buildingId}`) || 1
		this.object.setFlag('simple-settlements', 'buildingsQuantity', {[buildingId]: {
			quantity: (actualQuantity + 1),
			id: buildingId
		}}); */
		const building = this._getBuildingById(buildingId);
		if (building) {
			this.object.setFlag('simple-settlements', `buildings.${building.id}.quantity` , building.quantity + 1);
		}

	}
	_removeQuantityToBuilding(buildingId){
		/* const actualQuantity = this.object.getFlag('simple-settlements', `buildingsQuantity.${buildingId}`) || 1
		this.object.setFlag('simple-settlements', 'buildingsQuantity', {[buildingId]: {
			quantity: (actualQuantity - 1),
			id: buildingId
		}}); */
		const building = this._getBuildingById(buildingId);
		if (building) {
			if (building.quantity > 0) {
				this.object.setFlag('simple-settlements', `buildings.${building.id}.quantity` , building.quantity - 1);
			} else {
				this.object.setFlag('simple-settlements', `buildings.${building.id}.quantity` , 0);	
			}
		}
	}

	/* _registerInactiveBuilding(buildingId) {
		this.object.setFlag('simple-settlements', 'inactiveBuildings', {[buildingId]: buildingId});
	}
	
	_unregisterInactiveBuilding(buildingId) {
		this.object.unsetFlag("simple-settlements", `inactiveBuildings.${buildingId}`)
	} */

	_getBuildingById(id){
		const buildings = this.object.system.buildings;
		const building = buildings.find(building => building.id === id);
		return building 
	}

}

export default SettlementSheet;
