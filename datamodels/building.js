class BuildingData extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        return {
          description: new fields.HTMLField({required: false, blank: false, initial: "<p></p>"}),
        };
      }
      prepareDerivedData() {
        // console.log(this)
        // console.log(this.parent)
        // console.log(this.parent.items.contents)

        const items = this.parent.items.contents
        const resources = this._filterItemsResources(items)

        this.resources = resources
      }

      _filterItemsResources(items){
        const resources = []
    
        for (let i of items) {
          i.img = i.img || DEFAULT_TOKEN;
          // Append to resources.
          if (i.type === "simple-settlements.resource") {
            resources.push(i);
          }
          // resources.push(i);
        }
    
        return resources
      }
}

export default BuildingData