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
    name: 'Kuban Aquariums Микро',
    reagents: {
      H3BO3: 0.7,
      'C10H14N2Na2O8(H2O)2': 3,
      'MgSO4(H2O)7': 30,
      K2SO4: 20,
      C6H8O6: 0.1,
      C6H7KO2: 0.5,
    },
    compounds: {
      AgroMicsT: 11,
      'Fe-EDTA13': 5.6,
    },
    volume: 1000,
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
    name: 'Aqua Botanic Микро',
    reagents: {
      C6H8O7: 30,
      'FeSO4(H2O)7': 10,
      'MnSO4(H2O)5': 0.5,
      'CuSO4(H2O)5': 0.05,
      'ZnSO4(H2O)7': 0.6,
      'MgSO4(H2O)7': 10.54,
      H3BO3: 0.3,
      K2SO4: 8.6,
      C63H88CoN14O14P: 0.001,
      // H2SO4: 20,
    },
    compounds: {
      Citovit: 6,
      Ferovit: 6,
    },
    volume: 1000,
    note: `
      Рецепт взят с сайта aqua-botanic.ru
      (https://web.archive.org/web/20131206073940/http://www.aqua-botanic.ru/index.html):

      С помощью мерного стакана отмеряем 700 мл дистиллированной воды или воды из фильтра с обратным осмосом.
      Воду предварительно кипятим и растворяем

      * Лимонную кислоту 30 грамм
      * Сульфат железа - 10 грамм
      * Сульфат марганца - 0.5 грамм
      * Сульфат меди - 0.05 грамм
      * Сульфат цинка - 0.6 грамм
      * Сульфат магния - 10.54 грамма
      * сделать паузу в 1 час.
      * Борная кислота - 0.3 грамма
      * Сульфат калия - 8.6 грамма
      * Цитовит 4 ампулы
      * Феровит - 4 ампулы
      * Витамин B12 2 ампулы
      * Серная кислота - 20 мл.

      Важно! Можно вливать только кислоту в воду, а не наоборот.
      При желании, серную кислоту можно заменить на Сайдекс (2.5% раствор глутарового альдегида) в
      количестве 200-250 мл. Долить воду в раствор с удобрением до отметки 1 литр. Воду можно не кипятить.

      Растворять каждый последующий реактив можно только после того, как полностью растворится предыдущий.
    `,
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
  {
    name: 'Simple Aqua Micro',
    reagents: {
      C6H8O7: 15,
      H3BO3: 0.3,
      C4H6O4: 0.05,
      C63H88CoN14O14P: 0.0005,
      '(NH4)2MoO4': 0.1,
    },
    compounds: {
      'Fe-EDTA13': 5,
      'Mn-EDTA13': 0.5,
      'Cu-EDTA15': 0.03,
      'Zn-EDTA15': 0.6,
      'Mg-EDTA6': 5,
    },
    volume: 1000,
    note: `
      Рецепт от Simple Aqua (https://vk.com/simpleaqua1):

      * нагреть 1 литр осмоса;
      * растворить реагенты последовательно:

        15 г лимонная кислота,
        5 г хелат железа,
        0.5 г хелат марганца,
        0.03 г хелат меди,
        0.6 г хелат цинка,
        5 г хелат магния,
        0.1 молибдат аммония
        0.3 г борная кислота,
        0.05 г янтарная кислота;

      * остудить;
      * добавить 1 мл (500 мкг) цианокобаламин.
    `,
  },
  {
    name: 'Pps-pro Macro',
    reagents: {
      K2SO4: 29.3,
      KNO3: 32.6,
      KH2PO4: 2.9,
      'MgSO4(H2O)7': 20.2,
    },
    volume: 500,
    note: 'Рецепт взят с сайта https://sites.google.com/site/aquaticplantfertilizer/pps-pro. Методика там же',
  },
  {
    name: 'Pps-pro Micro',
    compounds: {
      PlantexCMM: 28.6,
    },
    volume: 500,
    note: 'Рецепт взят с сайта https://sites.google.com/site/aquaticplantfertilizer/pps-pro. Методика там же',
  },
  {
    name: 'PMDD CMM',
    reagents: {
      K2SO4: 33,
      KNO3: 15,
      'MgSO4(H2O)7': 15,
    },
    compounds: {
      PlantexCMM: 9.93,
    },
    volume: 500,
    note: 'http://www.amania.org/Tech/liqfert-mikom.html',
  },
  {
    name: 'PMDD CSM + B',
    reagents: {
      K2SO4: 33,
      KNO3: 15,
      'MgSO4(H2O)7': 15,
      H3BO3: 0.714,
    },
    compounds: {
      PlantexCSM: 9.93,
    },
    volume: 500,
    note: 'http://www.amania.org/Tech/liqfert-mikom.html',
  },
];
