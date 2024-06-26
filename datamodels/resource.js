class ResourceData extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        return {
          quantity: new fields.NumberField({ integer: false, required: false, nullable: true, initial: 0}),
          description: new fields.HTMLField({required: false, blank: false, initial: "<p></p>"}),
          category: new fields.StringField({required: false, initial: ""}),
          isStatic: new fields.BooleanField({required: false, initial: false}),
          isImportant: new fields.BooleanField({required: false, initial: false}),
        };
      }
      prepareDerivedData() {
        // console.log(this)
        // const resourceData = this;
        // const systemData = resourceData.system;
        // const flags = resourceData.flags.boilerplate || {};
        this._prepareResourceDetails()
      }
      
      _prepareResourceDetails(){
      }
}

export default ResourceData