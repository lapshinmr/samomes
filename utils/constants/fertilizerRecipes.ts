/**
 * Samomes
 *
 * Copyright (C) 2025 Mikhail Lapshin
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0
 * International License. To view a copy of this license, visit
 * http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to
 * Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
 *
 * You are free to:
 *  - Share — copy and redistribute the material in any medium or format
 *  - Adapt — remix, transform, and build upon the material
 *
 * Under the following terms:
 *  - Attribution — You must give appropriate credit
 *  - NonCommercial — You may not use the material for commercial purposes
 *  - ShareAlike — If you remix, transform, or build upon the material,
 *    you must distribute your contributions under the same license as the original
 *
 * No warranties are given. The license may not give you all of the permissions
 * necessary for your intended use.
 */

import type { FertilizerRecipeExampleType } from '~/utils/types/types';

export const FERTILIZER_RECIPES: FertilizerRecipeExampleType[] = [
  {
    key: 'kubanNitrate',
    name: 'Kuban Aquariums Нитрат',
    reagents: [
      { key: 'H2O', amount: 1000 },
      { key: 'KNO3', amount: 49.71 },
      { key: '(NH2)2CO', amount: 5.02 },
      { key: 'NH4NO3', amount: 6.71 },
      { key: 'C6H7KO2', amount: 0.5 },
    ],
    tankVolume: 100,
    description: 'Рецепт взят с youtube канала Kuban Aquariums (https://www.youtube.com/watch?v=Vyq-R0tv384)',
  },
  {
    key: 'kubanPhosphate',
    name: 'Kuban Aquariums Фосфат',
    reagents: [
      { key: 'H2O', amount: 1000 },
      { key: 'KH2PO4', amount: 7.01 },
      { key: 'C6H7KO2', amount: 0.5 },
    ],
    tankVolume: 100,
    description: 'Рецепт взят с youtube канала Kuban Aquariums (https://www.youtube.com/watch?v=Vyq-R0tv384)',
  },
  {
    key: 'kubanPotassium',
    name: 'Kuban Aquariums Калий',
    reagents: [
      { key: 'H2O', amount: 1000 },
      { key: 'K2SO4', amount: 84.76 },
      { key: 'C6H7KO2', amount: 0.5 },
    ],
    tankVolume: 100,
    description: 'Рецепт взят с youtube канала Kuban Aquariums (https://www.youtube.com/watch?v=Vyq-R0tv384)',
  },
  {
    key: 'kubanMicro',
    name: 'Kuban Aquariums Микро',
    reagents: [
      { key: 'H2O', amount: 1000 },
      { key: 'AgroMicsT', amount: 11 },
      { key: 'Fe-EDTA13', amount: 5.6 },
      { key: 'MgSO4(H2O)7', amount: 30 },
      { key: 'K2SO4', amount: 20 },
      { key: 'H3BO3', amount: 0.7 },
      { key: 'C6H8O6', amount: 0.1 },
      { key: 'C6H7KO2', amount: 0.5 },
      { key: 'C10H14N2Na2O8(H2O)2', amount: 3 },
    ],
    tankVolume: 100,
    description: 'Рецепт взят с youtube канала Kuban Aquariums (https://www.youtube.com/watch?v=Vyq-R0tv384)',
  },
  {
    key: 'botanicNitrate',
    name: 'Aqua Botanic Нитрат',
    reagents: [
      { key: 'H2O', amount: 1000 },
      { key: 'KNO3', amount: 82.88 },
    ],
    tankVolume: 100,
    description: 'Чистая калиевая селитра. Рецепт взят с сайта aqua-botanic.ru'
      + '(https://web.archive.org/web/20131206073940/http://www.aqua-botanic.ru/index.html)',
  },
  {
    key: 'botanicNitratePlus',
    name: 'Aqua Botanic Нитрат+',
    reagents: [
      { key: 'H2O', amount: 1000 },
      { key: 'KNO3', amount: 49.71 },
      { key: '(NH2)2CO', amount: 5.02 },
      { key: 'NH4NO3', amount: 6.71 },
    ],
    tankVolume: 100,
    description: 'Калиевая селитра, разбавленная мочевиной и нитратом аммония. Рецепт взят с сайта aqua-botanic.ru'
      + '(https://web.archive.org/web/20131206073940/http://www.aqua-botanic.ru/index.html)',
  },
  {
    key: 'botanicPhosphate',
    name: 'Aqua Botanic Фосфат',
    reagents: [
      { key: 'H2O', amount: 1000 },
      { key: 'KH2PO4', amount: 7.01 },
    ],
    tankVolume: 100,
    description: 'Чистый монофосфат калия. Рецепт взят с сайта aqua-botanic.ru'
      + '(https://web.archive.org/web/20131206073940/http://www.aqua-botanic.ru/index.html)',
  },
  {
    key: 'botanicPotassium',
    name: 'Aqua Botanic Калий',
    reagents: [
      { key: 'H2O', amount: 1000 },
      { key: 'K2SO4', amount: 84.76 },
    ],
    tankVolume: 100,
    description: 'Чистый сульфат калия. Рецепт взят с сайта aqua-botanic.ru'
      + '(https://web.archive.org/web/20131206073940/http://www.aqua-botanic.ru/index.html)',
  },
  {
    key: 'botanicMicro',
    name: 'Aqua Botanic Микро',
    reagents: [
      { key: 'H2O', amount: 968 },
      { key: 'C6H8O7', amount: 30 },
      { key: 'FeSO4(H2O)7', amount: 10 },
      { key: 'MnSO4(H2O)5', amount: 0.5 },
      { key: 'CuSO4(H2O)5', amount: 0.05 },
      { key: 'ZnSO4(H2O)7', amount: 0.6 },
      { key: 'MgSO4(H2O)7', amount: 10.54 },
      { key: 'H3BO3', amount: 0.3 },
      { key: 'K2SO4', amount: 8.6 },
      { key: 'C63H88CoN14O14P', amount: 0.001 },
      { key: 'Citovit', amount: 6 },
      { key: 'Ferovit', amount: 6 },
      { key: 'H2SO4', amount: 20 },
    ],
    tankVolume: 100,
    description: `Рецепт взят с сайта aqua-botanic.ru
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

Растворять каждый последующий реактив можно только после того, как полностью растворится предыдущий.`,
  },
  {
    key: 'amaniaNpk',
    name: 'NPK Amania.org 1:15',
    reagents: [
      { key: 'H2O', amount: 1000 },
      { key: 'KNO3', amount: 106.45 },
      { key: 'KH2PO4', amount: 5.77 },
    ],
    tankVolume: 100,
    description: 'Макро в соотношении 1 к 15. Рецепт взят с сайта amania.org',
  },
  {
    key: 'amaniaNpkPlus',
    name: 'NPK Amania.org 1:15 + амидный азот',
    reagents: [
      { key: 'H2O', amount: 1000 },
      { key: 'KNO3', amount: 53.6 },
      { key: '(NH2)2CO', amount: 16 },
      { key: 'KH2PO4', amount: 5.77 },
    ],
    tankVolume: 100,
    description: 'Макро в соотношении 1 к 15. Калиевая селитра в соотношении 50 на 50 с мочевиной.'
      + ' Рецепт взят с сайта amania.org',
  },
  {
    key: 'ermolaevMicro',
    name: 'Удо Ермолаева. МИКРО',
    reagents: [
      { key: 'H2O', amount: 500 },
      { key: 'K2SO4', amount: 7.45 },
      { key: 'MgSO4(H2O)7', amount: 16.4 },
      { key: 'Fe2(SO4)3(H2O)9', amount: 1.45 },
      { key: 'CuSO4(H2O)5', amount: 0.1 },
      { key: 'ZnSO4(H2O)7', amount: 0.04 },
      { key: 'H3BO3', amount: 0.1 },
      { key: '(NH4)2MoO4', amount: 0.04 },
      { key: 'MnSO4(H2O)5', amount: 0.73 },
      { key: 'C10H14N2Na2O8(H2O)2', amount: 2.5 },
    ],
    tankVolume: 100,
    description: 'Микро. Рецепт - https://aquascape-promotion.com/udobreniya-svoimi-rukami',
  },
  {
    key: 'ermolaevMikroGh7',
    name: 'Удо Ермолаева. МИКРО (gh < 7)',
    reagents: [
      { key: 'H2O', amount: 500 },
      { key: 'K2SO4', amount: 7.45 },
      { key: 'MgSO4(H2O)7', amount: 16.4 },
      { key: 'Fe2(SO4)3(H2O)9', amount: 1.45 },
      { key: 'CuSO4(H2O)5', amount: 0.1 },
      { key: 'ZnSO4(H2O)7', amount: 0.04 },
      { key: 'H3BO3', amount: 0.1 },
      { key: '(NH4)2MoO4', amount: 0.04 },
      { key: 'MnSO4(H2O)5', amount: 0.73 },
      { key: 'C10H14N2Na2O8(H2O)2', amount: 1.75 },
    ],
    tankVolume: 100,
    description: 'Микро. Рецепт - https://aquascape-promotion.com/udobreniya-svoimi-rukami',
  },
  {
    key: 'ermolaevMicroFeSulphate',
    name: 'Удо Ермолаева. МИКРО (Железный купорос)',
    reagents: [
      { key: 'H2O', amount: 500 },
      { key: 'K2SO4', amount: 7.45 },
      { key: 'MgSO4(H2O)7', amount: 16.4 },
      { key: 'FeSO4(H2O)7', amount: 1.44 },
      { key: 'CuSO4(H2O)5', amount: 0.1 },
      { key: 'ZnSO4(H2O)7', amount: 0.04 },
      { key: 'H3BO3', amount: 0.1 },
      { key: '(NH4)2MoO4', amount: 0.04 },
      { key: 'MnSO4(H2O)5', amount: 0.73 },
      { key: 'C14H18N3O10Na2Fe', amount: 1 },
      { key: 'C10H14N2Na2O8(H2O)2', amount: 1.75 },
    ],
    tankVolume: 100,
    description: 'Микро. Рецепт - https://aquascape-promotion.com/udobreniya-svoimi-rukami',
  },
  {
    key: 'ppsProMacro',
    name: 'Pps-pro Macro',
    reagents: [
      { key: 'H2O', amount: 500 },
      { key: 'K2SO4', amount: 29.3 },
      { key: 'KNO3', amount: 32.6 },
      { key: 'KH2PO4', amount: 2.9 },
      { key: 'MgSO4(H2O)7', amount: 20.2 },
    ],
    description: 'Рецепт взят с сайта https://sites.google.com/site/aquaticplantfertilizer/pps-pro. Методика там же',
  },
  {
    key: 'ppsProMicro',
    name: 'Pps-pro Micro',
    reagents: [
      { key: 'H2O', amount: 500 },
      { key: 'PlantexCMM', amount: 28.6 },
    ],
    description: 'Рецепт взят с сайта https://sites.google.com/site/aquaticplantfertilizer/pps-pro. Методика там же',
  },
  {
    key: 'pmddCmm',
    name: 'PMDD CMM',
    reagents: [
      { key: 'H2O', amount: 500 },
      { key: 'K2SO4', amount: 33 },
      { key: 'KNO3', amount: 15 },
      { key: 'MgSO4(H2O)7', amount: 15 },
      { key: 'PlantexCMM', amount: 9.93 },
    ],
    description: 'http://www.amania.org/Tech/liqfert-mikom.html',
  },
  {
    key: 'pmddCsm',
    name: 'PMDD CSM + B',
    reagents: [
      { key: 'H2O', amount: 500 },
      { key: 'K2SO4', amount: 33 },
      { key: 'KNO3', amount: 15 },
      { key: 'MgSO4(H2O)7', amount: 15 },
      { key: 'H3BO3', amount: 0.714 },
      { key: 'PlantexCSM', amount: 9.93 },
    ],
    description: 'http://www.amania.org/Tech/liqfert-mikom.html',
  },
  {
    key: 'udarMacro',
    name: 'Удар Макро',
    reagents: [
      { key: 'H2O', amount: 1000 },
      { key: 'KNO3', amount: 82 },
      { key: 'KH2PO4', amount: 7 },
      { key: 'C6H7KO2', amount: 0.5 },
    ],
    description: 'Это удобрение от Юрия Христенко (https://www.youtube.com/@Echinodorus)',
  },
  {
    key: 'udarMicro',
    name: 'Удар Микро',
    reagents: [
      { key: 'H2O', amount: 1000 },
      { key: 'AgroMicsT', amount: 11 },
      { key: 'Fe-EDTA13', amount: 5.6 },
      { key: 'K2SO4', amount: 20 },
      { key: 'MgSO4(H2O)7', amount: 30 },
      { key: 'H3BO3', amount: 0.7 },
      { key: 'C6H8O6', amount: 3 },
      { key: 'C6H7KO2', amount: 0.5 },
      { key: 'C10H14N2Na2O8(H2O)2', amount: 3 },
    ],
    description: 'Это удобрение от Юрия Христенко (https://www.youtube.com/@Echinodorus)',
  },
];

FERTILIZER_RECIPES.sort((a, b) => a.name.localeCompare(b.name));

export const FERTILIZER_RECIPE_NAMES_EN: {
  key: string;
  name: string;
  description: string;
}[] = [
  {
    key: 'kubanNitrate',
    name: 'Kuban Aquariums Nitrate',
    description: 'Recipe taken from Kuban Aquariums YouTube channel (https://www.youtube.com/watch?v=Vyq-R0tv384)',
  },
  {
    key: 'kubanPhosphate',
    name: 'Kuban Aquariums Phosphate',
    description: 'Recipe taken from Kuban Aquariums YouTube channel (https://www.youtube.com/watch?v=Vyq-R0tv384)',
  },
  {
    key: 'kubanPotassium',
    name: 'Kuban Aquariums Potassium',
    description: 'Recipe taken from Kuban Aquariums YouTube channel (https://www.youtube.com/watch?v=Vyq-R0tv384)',
  },
  {
    key: 'kubanMicro',
    name: 'Kuban Aquariums Micro',
    description: 'Recipe taken from Kuban Aquariums YouTube channel (https://www.youtube.com/watch?v=Vyq-R0tv384)',
  },
  {
    key: 'botanicNitrate',
    name: 'Aqua Botanic Nitrate',
    description: 'Pure potassium nitrate. Recipe taken from aqua-botanic.ru website '
      + '(https://web.archive.org/web/20131206073940/http://www.aqua-botanic.ru/index.html)',
  },
  {
    key: 'botanicNitratePlus',
    name: 'Aqua Botanic Nitrate+',
    description: 'Potassium nitrate diluted with urea and ammonium nitrate. Recipe taken from aqua-botanic.ru website '
      + '(https://web.archive.org/web/20131206073940/http://www.aqua-botanic.ru/index.html)',
  },
  {
    key: 'botanicPhosphate',
    name: 'Aqua Botanic Phosphate',
    description: 'Pure monopotassium phosphate. Recipe taken from aqua-botanic.ru website '
      + '(https://web.archive.org/web/20131206073940/http://www.aqua-botanic.ru/index.html)',
  },
  {
    key: 'botanicPotassium',
    name: 'Aqua Botanic Potassium',
    description: 'Pure potassium sulfate. Recipe taken from aqua-botanic.ru website '
      + '(https://web.archive.org/web/20131206073940/http://www.aqua-botanic.ru/index.html)',
  },
  {
    key: 'botanicMicro',
    name: 'Aqua Botanic Micro',
    description: `Recipe taken from aqua-botanic.ru website
(https://web.archive.org/web/20131206073940/http://www.aqua-botanic.ru/index.html):

Using a measuring cup, measure 700 ml of distilled water or reverse osmosis filtered water.
Pre-boil the water and dissolve:

* Citric acid 30 grams
* Iron sulfate - 10 grams
* Manganese sulfate - 0.5 grams
* Copper sulfate - 0.05 grams
* Zinc sulfate - 0.6 grams
* Magnesium sulfate - 10.54 grams
* take a 1-hour break
* Boric acid - 0.3 grams
* Potassium sulfate - 8.6 grams
* Citovit 4 ampoules
* Ferovit - 4 ampoules
* Vitamin B12 2 ampoules
* Sulfuric acid - 20 ml

Important! Only add acid to water, never the other way around.
If desired, sulfuric acid can be replaced with Cidex (2.5% glutaraldehyde solution) in
the amount of 200-250 ml. Add water to the fertilizer solution up to the 1 liter mark. Water doesn't need to be boiled.

Each subsequent reagent should only be dissolved after the previous one has completely dissolved.`,
  },
  {
    key: 'amaniaNpk',
    name: 'NPK Amania.org 1:15',
    description: 'Macro in a 1 to 15 ratio. Recipe taken from amania.org website',
  },
  {
    key: 'amaniaNpkPlus',
    name: 'NPK Amania.org 1:15 + amide nitrogen',
    description: 'Macro in a 1 to 15 ratio. Potassium nitrate in a 50-50 ratio with urea. '
      + 'Recipe taken from amania.org website',
  },
  {
    key: 'ermolaevMicro',
    name: 'Udo Ermolaev. MICRO',
    description: 'Micro fertilizer. Recipe - https://aquascape-promotion.com/udobreniya-svoimi-rukami',
  },
  {
    key: 'ermolaevMikroGh7',
    name: 'Udo Ermolaev. MICRO (gh < 7)',
    description: 'Micro fertilizer. Recipe - https://aquascape-promotion.com/udobreniya-svoimi-rukami',
  },
  {
    key: 'ermolaevMicroFeSulphate',
    name: 'Udo Ermolaev. MICRO (Iron Sulfate)',
    description: 'Micro fertilizer. Recipe - https://aquascape-promotion.com/udobreniya-svoimi-rukami',
  },
  {
    key: 'ppsProMacro',
    name: 'PPS-Pro Macro',
    description: 'Recipe taken from https://sites.google.com/site/aquaticplantfertilizer/pps-pro. Methodology available there',
  },
  {
    key: 'ppsProMicro',
    name: 'PPS-Pro Micro',
    description: 'Recipe taken from https://sites.google.com/site/aquaticplantfertilizer/pps-pro. Methodology available there',
  },
  {
    key: 'pmddCmm',
    name: 'PMDD CMM',
    description: 'http://www.amania.org/Tech/liqfert-mikom.html',
  },
  {
    key: 'pmddCsm',
    name: 'PMDD CSM + B',
    description: 'http://www.amania.org/Tech/liqfert-mikom.html',
  },
  {
    key: 'udarMacro',
    name: 'Udar Macro',
    description: 'This fertilizer is by Yuri Khristenko (https://www.youtube.com/@Echinodorus)',
  },
  {
    key: 'udarMicro',
    name: 'Udar Micro',
    description: 'This fertilizer is by Yuri Khristenko (https://www.youtube.com/@Echinodorus)',
  },
];
