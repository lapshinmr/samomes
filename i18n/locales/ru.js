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
  common: {
    or: 'или',
  },
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
    edit: 'Редактировать',
    add: 'Добавить',
    remove: 'Удалить',
  },
  guid: {
    start: 'Начнем',
    add_tank: 'Добавить аквариум',
    add_recipe: 'Добавить рецепт',
    add_schedule: 'Добавить расписание',
    where_am_i: 'Где я?',
  },
  tanks: {
    alert: {
      title: 'У вас еще нет ни одного аквариума',
      todo: {
        action: 'Добавьте аквариум',
        text: 'чтобы иметь возможность создавать Рецепты и Расписания.',
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
    guide: {
      paragraph1: 'На этой странице вы можете рассчитать объем вашего прямоугольного аквариума по его размерам, а также учесть объем фильтра и воду, содержащуюся в грунте.',
      paragraph2: 'Аквариум в нашей системе — это базовая сущность, которая создаётся здесь, а используется на других страницах сервиса. Добавив аквариум однажды, вы получите доступ к его параметрам во всех разделах калькулятора.',
      paragraph3: 'Это значительно упрощает работу с сервисом и экономит ваше время, например, при составлении рецепта или расписания внесения удобрений.',
      paragraph4: 'Начните с нажатия на кнопку со знаком «плюс», чтобы добавить новый аквариум.',
    },
    dialog: {
      tankNew: 'Новый аквариум',
      tankEdit: 'Редактирование аквариума',
      name: 'Название',
      nameHint: 'Придумайте простое название, например "Аквариум 1" или "Большой аквариум"',
      volume: 'Объем',
      volumeHint: 'Вы можете воспользоваться калькулятором объема ниже',
      waterChange: 'Подмена воды',
      waterChangeVolume: 'Объем подмены воды',
      length: 'Длина',
      width: 'Ширина',
      height: 'Высота',
      filter: 'Объем внешнего фильтра',
      filterHint: 'Добавьте объем фильтра из спецификации. Или измерьте его самостоятельно во время обслуживания.',
      soil: 'Вода в грунте',
      soilHint: 'Объем воды внутри грунта.',
      heightHint: 'Введите только высоту воды',
      glassThickness: 'Толщина стекла',
      orSizes: 'или используйте размеры аквариума',
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
};