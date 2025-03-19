/**
 * Samomes
 *
 * Copyright (C) 2025 Mikhail Lapshin
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

export default {
  home: 'Samomes',
  common: {
    or: 'or',
  },
  routes: {
    tanks: 'Fish tanks',
    recipes: 'Recipes',
    fertilizers: 'Fertilizers',
    schedules: 'Schedule',
    reminerals: 'Reminerals',
    remineralization: 'Remineralization',
    dynamics: 'Dynamics',
    articles: 'Articles',
    about: 'About',
    settings: 'Settings',
  },
  units: {
    mm: 'mm',
    cm: 'cm',
    l: 'l',
    ml: 'ml',
  },
  buttons: {
    open: 'Open',
    save: 'Save',
    edit: 'Edit',
    add: 'Add',
    remove: 'Remove',
  },
  guid: {
    start: 'Let\'s get started',
    add_tank: 'Add fish tank',
    add_recipe: 'Add recipe',
    add_schedule: 'Add schedule',
    where_am_i: 'Where am I?',
  },
  tanks: {
    alert: {
      title: 'You don\'t have any tank yet',
      todo: {
        action: 'Add tank',
        text: 'to be able to create Recipes and Schedules.',
      },
    },
    addButton: 'Add tank',
    panels: {
      header: {
        pull: 'Pull to sort tanks',
      },
      body: {
        noSizes: 'No sizes specified',
      },
    },
    guide: {
      paragraph1: 'On this page, you can calculate the volume of your rectangular aquarium based on its dimensions, as well as account for the filter volume and water contained in the substrate.',
      paragraph2: 'An aquarium in our system is a basic entity that is created here and used on other pages of the service. Once you add an aquarium, you\'ll have access to its parameters in all sections of the calculator.',
      paragraph3: 'This significantly simplifies working with the service and saves your time, for example, when creating a recipe or fertilization schedule.',
      paragraph4: 'Start by clicking the "plus" button to add a new aquarium.',
    },
    dialog: {
      tankNew: 'New tank',
      tankEdit: 'Edit tank',
      name: 'Name',
      nameHint: 'Use a simple name, e.g. "Tank 1" or "Large aquarium"',
      volume: 'Volume',
      volumeHint: 'You can use the volume calculator below',
      waterChange: 'Water change',
      waterChangeVolume: 'Water change volume',
      length: 'Length',
      width: 'Width',
      height: 'Height',
      filter: 'External filter volume',
      filterHint: 'Add filter\'s volume from the specification. Or measure it yourself during maintenance.',
      soil: 'Water in substrate',
      soilHint: 'Volume of water inside the substrate.',
      heightHint: 'Enter only the water height',
      glassThickness: 'Glass thickness',
      orSizes: 'or use tank dimensions',
      messageTankAdd: 'Tank added',
      messageTankEdit: 'Tank updated',
      messageTankRemove: 'Tank removed',
      nameRules: {
        require: 'Enter a name',
        exists: 'A tank with this name already exists',
      },
      volumeRules: {
        require: 'Enter volume in liters',
      },
    },
  },
};