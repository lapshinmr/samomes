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
  home: 'Самомес',
  routes: {
    tanks: 'Аквариумы',
    recipes: 'Рецепты',
    fertilizers: 'Удобрения',
    schedules: 'Расписание',
    reminerals: 'Реминерализаторы',
    remineralization: 'Водоподготовка',
    dynamics: 'Динамика',
    articles: 'Статьи',
    about: 'О проекте',
    settings: 'Настройки',
  },
  units: {
    mm: 'мм',
    cm: 'см',
    l: 'л',
    ml: 'мл',
  },
  buttons: {
    open: 'Открыть',
    save: 'Сохранить',
    edit: 'Изменить',
    add: 'Добавить',
    remove: 'Удалить',
  },
  guid: {
    start: 'Начните с этого',
    add_tank: 'Добавить аквариум',
    add_recipe: 'Создать рецепт',
    add_schedule: 'Составить расписание',
    where_am_i: 'Где я оказался?',
  },
  tanks: {
    alert: {
      title: 'У вас еще нет аквариума',
      todo: {
        action: 'Добавьте аквариум',
        text: ', чтобы вы могли создавать рецепты удобрений и составлять расписание по внесению удобрений.',
      },
    },
    addButton: 'Добавить аквариум',
    panels: {
      header: {
        pull: 'Потяните, чтобы отсортировать аквариумы',
      },
      body: {
        noSizes: 'Размеры не указаны',
      },
    },
    dialog: {
      tankNew: 'Новый аквариум',
      tankEdit: 'Редактирование аквариума',
      name: 'Название',
      nameHint: 'Придумайте простое название, например "Аквариум 1" или "Большой аквариум"',
      volume: 'Объем воды в аквариуме',
      volumeHint: 'Введите известное значение или воспользуйтесь калькулятором ниже',
      waterChange: 'Процент подмены',
      waterChangeVolume: 'Объем подмены',
      length: 'Длина',
      width: 'Ширина',
      height: 'Высота',
      filter: 'Объем внешнего фильтра',
      filterHint: 'Добавьте объем фильтра из инструкции. Или замерьте объем при заполнении его водой.',
      soil: 'Объем воды, которая находится в грунте',
      soilHint: 'Это вода, которая впиталась в грунт, когда вы запускали аквариум. Если вы не измерили этот объем '
        + 'на запуске, то можно добавить приблизительное значение или пропустить этот пункт.',
      heightHint: 'Введите высоту чистого столба воды (от поверхности грунта до кромки воды)',
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
  recipes: {
    alert: {
      title: 'У вас еще нет рецептов',
      todo: {
        action: 'Добавьте рецепты',
        text: ', чтобы вы могли использовать их для составления расписания по внесению удобрений.',
      },
    },
    addButton: 'Добавить рецепт',
    panels: {
      header: {
        pull: 'Потяните, чтобы отсортировать рецепты',
      },
      body: {
        noSizes: 'Размеры не указаны',
      },
    },
    dialog: {
      recipeNew: 'Новый рецепт',
      recipeEdit: 'Редактирование рецепта',
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
    addButton: 'Добавить удобрение',
    panels: {
      header: {
        pull: 'Потяните, чтобы отсортировать рецепты',
      },
      body: {
        noSizes: 'Размеры не указаны',
      },
    },
    dialog: {
      fertilizerNew: 'Новое удобрение',
      fertilizerEdit: 'Редактирование удобрения',
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
  reminerals: {
    addButton: 'Добавить реминерализатор',
    panels: {
      header: {
        pull: 'Потяните, чтобы отсортировать рецепты',
      },
      body: {
        noSizes: 'Размеры не указаны',
      },
    },
    dialog: {
      fertilizerNew: 'Новое удобрение',
      fertilizerEdit: 'Редактирование удобрения',
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
  schedules: {
    alert: {
      title: 'У вас еще нет рецептов',
      todo: {
        action: 'Добавьте рецепты',
        text: ', чтобы вы могли использовать их для составления расписания по внесению удобрений.',
      },
    },
    addButton: 'Добавить аквариум',
  },
};
