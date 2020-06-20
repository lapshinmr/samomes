export default {
  en: {
    routes: {
      tanks: 'Fish tanks',
      recipes: 'Recipies',
      schedules: 'Schedule',
      remineralization: 'Remineralization',
      dynamics: 'Dynamics',
      about: 'About',
      settings: 'Settings',
      Github: 'Github'
    },
    units: {
      mm: 'mm',
      cm: 'cm',
      l: 'l',
      ml: 'ml'
    },
    buttons: {
      save: 'Save',
      edit: 'Edit',
      add: 'Add',
      remove: 'Remove'
    },
    guid: {
      start: 'Lets get started',
      add_tank: 'Add fish tank',
      add_recipe: 'Add recipe',
      add_schedule: 'Add schedule',
      where_am_i: 'Where am I?'
    },
    tanks: {
      alert: {
        title: 'You don\'t have any tank yet',
        todo: {
          action: 'Add tank',
          text: 'to have opportunity to create recipes and schedules.'
        }
      },
      addButton: 'Add tank',
      panels: {
        header: {
          pull: 'Pull to sort recipes'
        },
        body: {
          noSizes: 'No sizes'
        }
      },
      dialog: {
        tankNew: 'New tank',
        tankEdit: 'Tank edition',
        name: 'Name',
        nameHint: `Use simple name, i.e. "Tank 1" or "My large tank"`,
        volume: 'Volume',
        volumeHint: 'You can use volume calculator below',
        length: 'Length',
        width: 'Width',
        height: 'Height',
        heightHint: 'Enter the water height only',
        glassThickness: 'Glass thickness',
        orSizes: 'or use tank\'s sizes',
        messageTankAdd: 'Tank was added',
        messageTankEdit: 'Tank was changed',
        messageTankRemove: 'Tank was removed',
        nameRules: {
          require: 'Enter name',
          exists: 'Tank with such name already exists'
        },
        volumeRules: {
          require: 'Enter volume'
        }
      }
    },
    recipes: {
      alert: {
        title: 'You don\'t have any recipe yet',
        todo: {
          action: 'Add recipes',
          text: 'to have opportunity to create schedules.'
        }
      },
      addButton: 'Добавить аквариум'
    }
  }
}
