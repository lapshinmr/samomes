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

export default [
  {
    name: 'Kuban Aquariums Нитрат',
    reagents: {
      KNO3: 49.71,
      '(NH2)2CO': 5.02,
      NH4NO3: 6.71,
      C6H7KO2: 0.5,
    },
    tankVolume: 100,
    volume: 1000,
    note: 'Рецепт взят с youtube канала Kuban Aquariums (https://www.youtube.com/watch?v=Vyq-R0tv384)',
  },
  {
    name: 'Kuban Aquariums Фосфат',
    reagents: {
      KH2PO4: 7.01,
      C6H7KO2: 0.5,
    },
    tankVolume: 100,
    volume: 1000,
    note: 'Рецепт взят с youtube канала Kuban Aquariums (https://www.youtube.com/watch?v=Vyq-R0tv384)',
  },
  {
    name: 'Kuban Aquariums Калий',
    reagents: {
      K2SO4: 84.76,
      C6H7KO2: 0.5,
    },
    tankVolume: 100,
    volume: 1000,
    note: 'Рецепт взят с youtube канала Kuban Aquariums (https://www.youtube.com/watch?v=Vyq-R0tv384)',
  },
  {
    name: 'Kuban Aquariums Реминерализатор',
    reagents: {
      'CaSO4(H2O)2': 1.88,
      'MgSO4(H2O)7': 1.28,
    },
    note: 'Рецепт взят с youtube канала Kuban Aquariums (https://www.youtube.com/watch?v=Vyq-R0tv384)',
  },
  {
    name: 'Aqua Botanic Нитрат',
    reagents: {
      KNO3: 82.88,
    },
    tankVolume: 100,
    volume: 1000,
    note: 'Чистая калиевая селитра. Рецепт взят с сайта aqua-botanic.ru'
    + '(https://web.archive.org/web/20131206073940/http://www.aqua-botanic.ru/index.html)',
  },
  {
    name: 'Aqua Botanic Нитрат+',
    reagents: {
      KNO3: 49.71,
      '(NH2)2CO': 5.02,
      NH4NO3: 6.71,
    },
    tankVolume: 100,
    volume: 1000,
    note: 'Калиевая селитра, разбавленная мочевиной и нитратом аммония. Рецепт взят с сайта aqua-botanic.ru'
    + '(https://web.archive.org/web/20131206073940/http://www.aqua-botanic.ru/index.html)',
  },
  {
    name: 'Aqua Botanic Фосфат',
    reagents: {
      KH2PO4: 7.01,
    },
    tankVolume: 100,
    volume: 1000,
    note: 'Чистый монофосфат калия. Рецепт взят с сайта aqua-botanic.ru'
    + '(https://web.archive.org/web/20131206073940/http://www.aqua-botanic.ru/index.html)',
  },
  {
    name: 'Aqua Botanic Калий',
    reagents: {
      K2SO4: 84.76,
    },
    tankVolume: 100,
    volume: 1000,
    note: 'Чистый сульфат калия. Рецепт взят с сайта aqua-botanic.ru'
    + '(https://web.archive.org/web/20131206073940/http://www.aqua-botanic.ru/index.html)',
  },
  {
    name: 'NPK Amania.org 1:15',
    reagents: {
      KNO3: 106.45,
      KH2PO4: 5.77,
    },
    tankVolume: 100,
    volume: 1000,
    note: 'Макро в соотношении 1 к 15. Рецепт взят с сайта amania.org',
  },
  {
    name: 'NPK Amania.org 1:15 + амидный азот',
    reagents: {
      KNO3: 53.6,
      '(NH2)2CO': 16,
      KH2PO4: 5.77,
    },
    tankVolume: 100,
    volume: 1000,
    note: 'Макро в соотношении 1 к 15. Калиевая селитра в соотношении 50 на 50 с мочевиной.'
      + ' Рецепт взят с сайта amania.org',
  },
  {
    name: 'Удо Ермолаева. МИКРО',
    reagents: {
      K2SO4: 7.45,
      'MgSO4(H2O)7': 16.4,
      'Fe2(SO4)3(H2O)9': 1.45,
      'CuSO4(H2O)5': 0.1,
      'ZnSO4(H2O)7': 0.04,
      H3BO3: 0.1,
      '(NH4)2MoO4': 0.04,
      'MnSO4(H2O)5': 0.73,
      C10H14N2Na2O8: 2.5,
    },
    tankVolume: 100,
    volume: 500,
    note: 'Микро. Рецепт - https://aquascape-promotion.com/udobreniya-svoimi-rukami',
  },
  {
    name: 'Удо Ермолаева. МИКРО (gh < 7)',
    reagents: {
      K2SO4: 7.45,
      'MgSO4(H2O)7': 16.4,
      'Fe2(SO4)3(H2O)9': 1.45,
      'CuSO4(H2O)5': 0.1,
      'ZnSO4(H2O)7': 0.04,
      H3BO3: 0.1,
      '(NH4)2MoO4': 0.04,
      'MnSO4(H2O)5': 0.73,
      C10H14N2Na2O8: 1.75,
    },
    tankVolume: 100,
    volume: 500,
    note: 'Микро. Рецепт - https://aquascape-promotion.com/udobreniya-svoimi-rukami',
  },
  {
    name: 'Удо Ермолаева. МИКРО (Железный купорос)',
    reagents: {
      K2SO4: 7.45,
      'MgSO4(H2O)7': 16.4,
      'FeSO4(H2O)7': 1.44,
      'CuSO4(H2O)5': 0.1,
      'ZnSO4(H2O)7': 0.04,
      H3BO3: 0.1,
      '(NH4)2MoO4': 0.04,
      'MnSO4(H2O)5': 0.73,
      C10H14N2Na2O8: 1.75,
      C14H18N3O10Na2Fe: 1,
    },
    tankVolume: 100,
    volume: 500,
    note: 'Микро. Рецепт - https://aquascape-promotion.com/udobreniya-svoimi-rukami',
  },
];
