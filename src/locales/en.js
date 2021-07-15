/**
 * Samomes
 *
 * Copyright (C) 2021 Mikhail Lapshin
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
  en: {
    routes: {
      tanks: 'Fish tanks',
      recipes: 'Recipies',
      fertilizers: 'Fertilizers',
      schedules: 'Schedule',
      remineralization: 'Remineralization',
      dynamics: 'Dynamics',
      about: 'About',
      settings: 'Settings',
      Github: 'Github',
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
      start: 'Lets get started',
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
          text: 'to have opportunity to create recipes and schedules.',
        },
      },
      addButton: 'Add tank',
      panels: {
        header: {
          pull: 'Pull to sort recipes',
        },
        body: {
          noSizes: 'No sizes',
        },
      },
      dialog: {
        tankNew: 'New tank',
        tankEdit: 'Tank edition',
        name: 'Name',
        nameHint: 'Use simple name, i.e. "Tank 1" or "My large tank"',
        volume: 'Volume',
        volumeHint: 'You can use volume calculator below',
        waterChange: 'Water change volume',
        length: 'Length',
        width: 'Width',
        height: 'Height',
        filter: 'External filter',
        filterHint: 'Add filter\'s volume from the specification. Or measure it yourself during maintenance.',
        soil: 'Soil',
        soilHint: 'Water\'s volume inside soil.',
        heightHint: 'Enter the water height only',
        glassThickness: 'Glass thickness',
        orSizes: 'or use tank\'s sizes',
        messageTankAdd: 'Tank was added',
        messageTankEdit: 'Tank was changed',
        messageTankRemove: 'Tank was removed',
        nameRules: {
          require: 'Enter name',
          exists: 'Tank with such name already exists',
        },
        volumeRules: {
          require: 'Enter volume',
        },
      },
    },
    recipes: {
      alert: {
        title: 'You don\'t have any recipe yet',
        todo: {
          action: 'Add tank',
          text: 'to have opportunity to create schedules.',
        },
      },
      addButton: 'Add recipe',
      panels: {
        header: {
          pull: 'Pull to sort recipes',
        },
        body: {
          noSizes: 'Размеры не указаны',
        },
      },
      dialog: {
        recipeNew: 'New recipe',
        recipeEdit: 'Recipe editing',
        name: 'Название',
        nameHint: 'Придумайте простое название, например "Аквариум 1" или "Большой аквариум"',
        volume: 'Объем',
        volumeHint: 'Вы можете воспользоваться калькулятором объема ниже',
        length: 'Длина',
        width: 'Ширина',
        height: 'Высота',
        heightHint: 'Введите высоту чистого столба воды',
        glassThickness: 'Толщина стекла',
        orSizes: 'Или используйте размеры',
        messageTankAdd: 'Аквариум добавлен',
        messageTankEdit: 'Аквариум изменен',
        messageTankRemove: 'Аквариум удален',
        nameRules: {
          require: 'Введите название',
          exists: 'Аквариум с таким названием уже существует',
        },
        volumeRules: {
          require: 'Введите объем в литрах',
        },
      },
    },
    fertilizers: {
      addButton: 'Add solution',
      panels: {
        header: {
          pull: 'Pull to sort recipes',
        },
        body: {
          noSizes: 'Размеры не указаны',
        },
      },
      dialog: {
        fertilizerNew: 'New fertilizer',
        fertilizerEdit: 'Fertilizer editing',
        name: 'Name',
        nameHint: 'Придумайте простое название, например "Аквариум 1" или "Большой аквариум"',
        volume: 'Объем',
        volumeHint: 'Вы можете воспользоваться калькулятором объема ниже',
        length: 'Длина',
        width: 'Ширина',
        height: 'Высота',
        heightHint: 'Введите высоту чистого столба воды',
        glassThickness: 'Толщина стекла',
        orSizes: 'Или используйте размеры',
        messageTankAdd: 'Аквариум добавлен',
        messageTankEdit: 'Аквариум изменен',
        messageTankRemove: 'Аквариум удален',
        nameRules: {
          require: 'Введите название',
          exists: 'Аквариум с таким названием уже существует',
        },
        volumeRules: {
          require: 'Введите объем в литрах',
        },
      },
    },
    schedules: {
      alert: {
        title: 'You don\'t have any redipes yet',
        todo: {
          action: 'Add schedule',
          text: ', чтобы вы могли использовать их для составления расписания по внесению удобрений.',
        },
      },
      addButton: 'Add schedule',
    },
  },
};
