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

export default {
  $vuetify: {
    open: 'Open',
    close: 'Close',
  },
  home: 'Samomes',
  dashboard: 'Dashboard',
  common: {
    volume: 'Volume',
    or: 'or',
    for: 'for',
    pull: 'Pull to sort',
    removePopupTitle: 'Confirmation',
    element: 'Element',
    reagent: 'Reagent',
    reagents: 'Reagents',
    reagentsHint: 'You can select multiple reagents',
    recipes: 'Recipes',
    recipesHint: 'or choose one of the recipes',
    sum: 'Sum',
    total: 'Total',
    isFormErrors: 'The form contains errors. Please correct them to continue.',
    dry: 'Dry',
    liquid: 'Liquid',
    comboboxTypingHint: 'Start typing to sort the list',
    noRatio: 'Don\'t see the ratio you need?',
    formula: 'Formula',
    compound: 'Compound',
  },
  validation: {
    required: 'Required field',
    positive: 'Only positive numbers',
    solubilityLimit: 'Maximum solubility reached',
    positiveOrEmpty: 'Only positive numbers or empty field',
    positiveOrZero: 'Only positive numbers or zero',
  },
  routes: {
    tanks: 'Tanks',
    recipes: 'Recipes',
    fertilizers: 'Fertilizers',
    reminerals: 'Remineralizers',
    dosing: 'Dosing',
    schedules: 'Schedule',
    hardness: 'Hardness',
    dynamics: 'Dynamics',
    articles: 'Articles',
    about: 'About',
    settings: 'Settings',
    install: 'Install app',
  },
  units: {
    mm: 'mm',
    cm: 'cm',
    l: 'L',
    ml: 'mL',
    g: 'g',
    mg: 'mg',
    'mg/l': 'ppm',
    'g/l': 'g/L',
    'mg/l / ml': 'ppm / mL',
    'g/1g': '%',
    'ml/d': 'ml/day',
    'g/d': 'g/day',
  },
  buttons: {
    open: 'Open',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    add: 'Add',
    remove: 'Remove',
    copy: 'Copy',
    share: 'Share',
    reset: 'Reset',
    close: 'Close',
    go: 'Go',
    calculate: 'Calculate',
  },
  landing: {
    title: 'Samomes',
    subtitle: 'fertilizer calculator for planted tanks',
    videoError: 'Your browser does not support video',
    mainSection: {
      title: 'Forget about complex fertilizer calculations!',
      subtitle: 'Calculate quickly and accurately the correct dosages of any fertilizers for your planted aquarium using our calculator',
    },
    toolsSection: {
      title: 'Everything you need for the perfect tank',
      subtitle: 'All tools work together — creating a comprehensive solution for planted tank care',
      dosingSubtitle: 'Precise dosage calculations',
      schedulesSubtitle: 'Fertilizer dosing schedule',
      fertilizersSubtitle: 'Database of 100+ products',
      recipesSubtitle: 'Proven formulas',
      remineralsSubtitle: 'RO water preparation',
      hardnessSubtitle: 'Water hardness control',
    },
    dosingSection: {
      subtitle: 'Fine-tune your dosing in minutes',
    },
    schedulesSection: {
      subtitle: 'Create a schedule so you don\'t forget to add fertilizers',
    },
    fertilizersSection: {
      subtitle: 'We have gathered fertilizers from well-known manufacturers in one place',
    },
    recipesSection: {
      subtitle: 'Make DIY fertilizers from any reagents',
    },
    remineralsSection: {
      subtitle: 'Create the perfect water composition',
    },
    hardnessSection: {
      subtitle: 'For monitoring water hardness',
    },
    contactUsSection: {
      title: 'Contact Us',
    },
  },
  popups: {
    addRatio: {
      title: 'New Element Ratio',
      firstElementInput: 'Enter first element',
      secondElementInput: 'Enter second element',
      elementInputHint: 'Enter an element that is present in the selected fertilizers',
      elementInputError: 'No such element',
      ratioIs: 'Ratio is',
    },
  },
  tanks: {
    title: 'Tanks',
    noTanks: 'You don\'t have any tanks yet',
    removePopupContent: 'Are you sure you want to delete this tank?',
    filterVolume: 'External filter volume',
    soilVolume: 'Water volume in substrate',
    waterChangeVolume: 'Water change volume',
    addButton: 'Add tank',
    card: {
      title: 'Tank parameters',
    },
    hints: {
      p1: 'On this page, you can calculate the volume of your rectangular tank based on its dimensions, as well as account for filter volume and water contained in the substrate.',
      p2: 'A tank in our system is a basic entity that is created here and used on other pages of the service. Once you add a tank, you will have access to its parameters in all sections of the calculator.',
      p3: 'This significantly simplifies working with the service and saves your time, for example, when creating a recipe or fertilization schedule.',
      p4: 'Start by clicking the "plus" button to add a new tank.',
    },
    page: {
      titleNew: 'New tank',
      name: 'Tank name *',
      nameHint: 'Come up with a simple name, such as "Aquarium 1" or "Large Tank"',
      sectionTitle1: 'Main parameters',
      sectionTitle2: 'Calculate volume',
      sectionTitle3: 'Extra parameters',
      volume: 'Tank volume *',
      volumeInfo: {
        title: 'More about volume',
        p1: 'This is the total volume of water that was poured into the tank at startup. It consists of the volume of the water column, water in the substrate, and external filter, minus all decorations in the tank.',
        p2: 'The easiest way to find out the exact volume of water is to measure it when starting the tank using a container or scales. But if you don\'t know the exact value, you can calculate it using the form below.',
        p3: 'Here you can specify the volume of the tank without filter, and add the filter volume in the additional volumes section in the section below.',
        p4: 'Don\'t worry! You don\'t need to know the exact volume. An error of 10-20% will not lead to significant errors in fertilizer calculations, algae, or anything bad, since in the end we cannot very accurately control the absorption of fertilizers and rely on the appearance of plants.',
      },
      volumeSkip: 'I don\'t know',
      volumeHint: 'Enter volume in liters',
      volumeCount: 'Volume count',
      length: 'Tank length *',
      width: 'Tank width *',
      height: 'Tank height *',
      glassThickness: 'Glass thickness',
      sectionDescription2: 'Volume calculation',
      heightHint: 'Enter only the height of the water column',
      filterVolumeHint: 'Add the filter volume from the specification. Or measure it yourself during maintenance.',
      volumeWithFilter: 'Volume total',
      waterChangePercent: 'Water change percentage',
      message: {
        tankAdded: 'Aquarium added',
        tankEdited: 'Aquarium modified',
        tankRemoved: 'Aquarium deleted',
        nameExists: 'The tank with this name already exists',
        isFormErrors: 'Name and volume are required fields',
      },
    },
  },
  reagents: {
    nameExists: 'Reagent with this name already exists',
    formulaExists: 'This formula already exists',
  },
  recipes: {
    title: 'Recipes',
    noRecipes: 'You don\'t have any recipes yet',
    hints: {
      p1: 'On this page, you can develop your unique DIY fertilizer recipe.',
      p2: 'For this, you have both pure reagents (with precise chemical formulas) and compound reagents common among aquarists.',
      p3: 'Recipes are your own fertilizers that can be used when dosing fertilizers.',
      p4: 'Start by clicking the "plus" button to add a new recipe.',
    },
    removePopupContent: 'Are you sure you want to delete this recipe?',
    card: {
      recipe: 'Recipe',
      composition: 'Composition',
      description: 'Description',
    },
    addButton: 'Add recipe',
    page: {
      titleNew: 'New recipe',
      titleCopy: 'This is a copy of the recipe',
      subtitleCopy: 'Make changes and don\'t forget to save',
      titleShare: 'The recipe has been shared with you!',
      subtitleShare: 'Check it, give it a name, and don\'t forget to save.',
      reagentsDescription: 'In tank keeping, nitrogen and phosphorus concentrations are measured in the form of nitrates (NO₃⁻) and phosphates (PO₄³⁻), as these are the main compounds of these elements found in tanks. Therefore, after conversion, some reagents have nitrate or phosphate values greater than 100%.',
      reagentsHint: 'Here are the all reagents: formulas, compounds, your reagents. You can select multiple reagents.',
      reagentsHintWater: 'Here are the all reagents: formulas, compounds, your reagents. You can select multiple reagents. Remove reagent "Water" if you want dry fertilizer.',
      noReagent: 'Don\'t see the reagent you need?',
      recipesHint: 'Here you can find recipe examples',
      dilution: 'Dilution',
      totalVolume: 'Total fertilizer volume',
      totalVolumeHint: 'If by water volume you meant total volume, then enter it here and the calculator will calculate the required water volume for you',
      unitConcTitle: 'Specific concentration',
      unitConcDescription: 'Specific concentration is the amount by which the concentration of an element in the tank will increase when 1 ml of fertilizer is added. For example, you want to make a macro fertilizer with nitrate. And for ease of introduction into the tank, you would like that with each 1 ml of fertilizer added, the nitrate concentration increases by 0.5 mg/l. Value "0.5 mg/l / ml" is the specific concentration.',
      unitConc: 'Specific concentration',
      fertilizerConc: 'Fertilizer concentration',
      tankInputLabel: 'Select the tank or enter volume',
      name: 'Recipe name *',
      nameHint: 'The recipe name must be unique',
      description: 'Description',
      descriptionHint: 'You can add additional information to the recipe',
      calculateReagentMass: 'Calculate reagent mass',
      message: {
        recipeAdded: 'Recipe added',
        recipeEdited: 'Recipe modified',
        recipeRemoved: 'Recipe deleted',
        recipeCopied: 'Recipe copied',
        nameExists: 'A recipe or fertilizer with this name already exists',
      },
      reagentPopup: {
        title: 'New reagent',
        formulaInput: 'Enter formula *',
        densityInput: 'Enter density',
        densityHint: 'I.e., density of water is equal to 1 g/sm3',
        densityUnit: 'g/sm3',
        reagentName: 'Enter reagent name *',
        reagentSolubilityInput: 'Enter solubility limit',
        reagentSolubilityHint: 'Solubility is typically given for 25°C per liter of water',
      },
      unitConcPopup: {
        title: 'Reagent Mass Calculation',
        hint: 'Here you can calculate the mass of each reagent using specific concentration',
      },
      edtaPopup: {
        title: 'EDTA Calculation',
        hint: 'Select reagents you want to chelate:',
        chelatorIncrease: 'Increase chelator amount by:',
        anotherValue: 'Other value',
        edtaAmount: 'EDTA amount',
        alkaliHint: 'Select alkali and molar amount to neutralize EDTA',
        alkaliSelect: 'Select alkali',
        alkaliAmount: 'Alkali amount',
      },
      trilonPopup: {
        title: 'Trilon B Calculation',
        hint: 'Select reagents you want to chelate:',
        chelatorIncrease: 'Increase chelator amount by:',
        anotherValue: 'Other value',
        trilonAmount: 'Trilon B amount',
      },
    },
  },
  fertilizers: {
    title: 'Fertilizers',
    noFertilizers: 'You don\'t have any fertilizers yet',
    removePopupContent: 'Are you sure you want to delete this fertilizer?',
    card: {
      composition: 'Composition',
      description: 'Description',
    },
    addButton: 'Add fertilizer',
    hints: {
      p1: 'On this page, you can add your favorite brand fertilizers with known composition so that the system helps select dosages and includes them in your personal schedule.',
      p2: 'Even if you don\'t know the exact composition of the fertilizer, you can add it to the system — this will help you keep track of additions and not miss important feedings for your plants.',
      p3: 'Start by clicking the "plus" button to add a new fertilizer.',
    },
    page: {
      titleNew: 'New fertilizer',
      formDescription: 'To add your branded fertilizer, use the form below. Select the units of measurement and enter the element concentrations indicated on the label.',
      fertilizers: 'Select a fertilizer from the list',
      fertilizersHint: 'Most brand fertilizers are here',
      alertInfo: 'Fertilizer composition information updated according to manufacturer data',
      alertWarning: 'Warning! You have changed the units of measurement. Concentrations now differ by a factor of 10 from those indicated on the label. If you are not sure about the correctness of the changes, return to the original version.',
      ionsInput: 'Select elements from the list *',
      ionsInputHint: 'All necessary elements are here',
      name: 'Fertilizer name *',
      nameHint: 'The fertilizer name must be unique',
      description: 'Description',
      descriptionHint: 'You can add additional information to the fertilizer',
      remineral: 'Remineralizer',
      remineralInstruction: 'Enter values from the label',
      remineralExample1: 'Example instruction: "5 g of mixture per 100 L of water increases GH by 6, KH by 3"',
      remineralExample2: 'Based on this instruction, you need to enter 6 in the GH field, 3 in the KH field, 5 in the amount field, and 100 in the volume field.',
      ghInput: 'Enter Gh',
      ghInputHint: 'Value declared by manufacturer',
      khInput: 'Enter Kh',
      khInputHint: 'Value declared by manufacturer',
      remineralAmountInput: 'Amount',
      remineralAmountInputHint: 'Required amount of remineralizer to increase hardness by the declared Gh and Kh values',
      remineralVolumeInput: 'Enter volume',
      remineralVolumeInputHint: 'Volume for which the composition is calculated',
      message: {
        fertilizerAdded: 'Fertilizer added',
        fertilizerEdited: 'Fertilizer modified',
        fertilizerRemoved: 'Fertilizer deleted',
        nameExists: 'A fertilizer or recipe with this name already exists',
      },
    },
  },
  reminerals: {
    title: 'Remineralizers',
    noReminerals: 'You don\'t have any remineralizers yet',
    removePopupContent: 'Are you sure you want to delete this remineralizer?',
    card: {
      reagents: 'Reagents',
      description: 'Description',
      explanationTitle: 'Interpretation',
      explanation: {
        dry: {
          t1: 'ml of remineralizer increase in',
          t2: 'Gh by',
          t3: 'and Kh by',
        },
        liquid: {
          t1: 'g of remineralizer increase in',
          t2: 'Gh by',
          t3: 'and Kh by',
        },
      },
    },
    addButton: 'Add remineralizer',
    hints: {
      p1: 'On this page, you can develop your own remineralizer recipe. For this, you have reagents that are commonly used by aquarists.',
      p2: 'Don\'t worry — you can always use ready-made recipes that have already been tested and successfully used by many aquarists.',
      p3: 'Start by clicking the "plus" button to add a new remineralizer.',
    },
    page: {
      titleNew: 'New remineralizer',
      titleCopy: 'This is a copy of the remineralizer',
      subtitleCopy: 'Make changes and don\'t forget to save',
      titleShare: 'The remineralizer recipe has been shared with you!',
      subtitleShare: 'Check it, give it a name, and don\'t forget to save.',
      reagentsHint: 'You can select multiple reagents. Choose reagent "Water" if you want to create liquid remineralizer.',
      recipesHint: 'Here you can find recipe examples',
      ghKhHint: 'When these fields are changed, reagent masses are recalculated automatically',
      concentration: 'Concentration',
      soluteConcentration: 'Solute concentration',
      dryConcentration: 'Dry mix concentration',
      changeWaterConcentration: 'Concentration in change water',
      portionsTable: 'Portions table',
      remineralVolume: 'Remineralizer volume',
      explanation: {
        dry: 'mixture increase in',
        liquid: 'solution increase in',
      },
      cations: 'Cations',
      anions: 'Anions',
      ionsTotal: 'Total composition',
      mix: {
        title: 'Mixture preparation',
        t1: 'I want to prepare',
        t2: 'Then you need to mix:',
      },
      name: 'Remineralizer name *',
      nameHint: 'The remineralizer name must be unique',
      description: 'Description',
      descriptionHint: 'You can add additional information to the remineralizer',
      message: {
        add: 'Remineralizer added',
        edit: 'Remineralizer modified',
        remove: 'Remineralizer deleted',
        copy: 'Remineralizer copied',
        nameExists: 'A recipe or fertilizer with this name already exists',
      },
    },
  },
  dosing: {
    title: 'Dosage Selection',
    tankInputLabel: 'Select a tank or enter volume',
    tankInputHint: 'Volume is necessary for calculating dosages',
    fertilizersInputLabel: 'Select fertilizers',
    fertilizersInputHint: 'All your recipes and fertilizers are collected here. Click "Branded" to view the full list.',
    switch: 'Branded',
    doses: {
      title: 'Dosage Selection',
      description: 'By adjusting the volume of selected recipes, you can achieve the necessary concentration of elements in the tank. This way, you can select an approximate value that the plants "consume" over a given period of time.',
    },
    dosesTable: {
      regime1: 'Every day',
      regime2: 'In water change',
      regime3: 'Combined feeding',
      daysTotal: 'Period',
      waterChange: 'Enter water change volume *',
      waterChangeHint: 'Volume is required to calculate dosage in water change',
      doseTotal: 'Total fertilizer volume',
      waterChangeTitle: 'Water change',
      everyDay: 'Daily',
      total: 'Total',
    },
    elementsTable: {
      showGh: 'Show hardness increase',
      element: 'Element',
      totalDose: 'Total dose',
      inWaterChangeDose: 'In water change',
      inTankDose: 'In the tank',
      everyDayDose: 'Per day',
      inDayWeekDose: 'Per day/week',
    },
    smallValue: 'small',
  },
  hardness: {
    title: 'Hardness',
  },
  settings: {
    title: 'Settings',
    resetData: 'Data reset',
    allData: 'All data',
  },
  meta: {
    landing: {
      title: 'Fertilizer Calculator for Planted Aquarium',
      description: 'DIY Mix is a convenient calculator for aquarists that simplifies the calculation '
        + 'of element concentrations and fertilizer dosages for planted aquariums. '
        + 'With it, you can create your own fertilizer recipes, make dosing schedules, '
        + 'manage water hardness, and track element content dynamics.',
      keywords: 'aquariums, recipes, fertilizers, schedule, water treatment, dynamics, planted aquarium, '
        + 'remineralizers, aquarists',
    },
    tanks: {
      title: 'Tank List',
      description: 'On this page you can manage your list of tanks, calculate their volumes by ' +
        'linear dimensions, and also account for the volume of filter and water in substrate. By adding ' +
        'an aquarium, you will get access to its parameters in all sections of the calculator, which simplifies ' +
        'working with the service and saves your time.',
      keywords: 'aquariums, volume calculation, filter, substrate, aquarium management',
    },
    tank: {
      title: 'Tank',
    },
    recipes: {
      title: 'Fertilizer Recipe List',
      description: 'On this page you can create recipes for DIY micro and macro fertilizers from '
        + 'reagents or compounds, as well as use proven recipes that are already tested '
        + 'and successfully used by many aquarists.',
      keywords: 'fertilizer recipes, DIY fertilizer, macro, micro, tank, planted tank fertilizers',
    },
    recipe: {
      title: 'Fertilizer recipe',
    },
    fertilizers: {
      title: 'Commercial Fertilizer List',
      description: 'On this page you can add any commercial fertilizers '
        + 'that you use in your aquarium to easily calculate dosages.',
      keywords: 'commercial fertilizers, aquarium, dosages, fertilizer tracking, plant nutrition',
    },
    fertilizer: {
      title: 'Commercial fertilizer',
    },
    reminerals: {
      title: 'Remineralizer recipes',
      description: 'On this page you can develop your own remineralizer recipe. '
        + 'For this purpose, you have reagents that are commonly used by aquarists at your disposal.',
      keywords: 'remineralizer recipes, GH, KH, water remineralization',
    },
    remineral: {
      title: 'Remineralizer recipe',
    },
    dosing: {
      title: 'Planted Tank Fertilizer Dosage Selection',
      description: 'Here you can select dosages for all your fertilizers using a convenient table. The calculator ' +
        'will automatically calculate the total ' +
        'concentrations of all elements entering your tank. This simplifies the calculation of ' +
        'elements like potassium, which are found in different fertilizers.',
      keywords: 'tank, fertilizers, dosages, concentration',
    },
    schedules: {
      title: 'Tank Fertilizer Schedule',
      description: 'If you have multiple bottles of fertilizers, the dosages of each fertilizer ' +
        'differ from each other, ' +
        'and you have several tanks, it can be quite easy to make mistakes with fertilizer dosing. ' +
        'A convenient widget will help you create a schedule for the entire week and keep track of which ' +
        'fertilizers need to be added.',
      keywords: 'tank, fertilizers, dosing schedule, dosages, fertilizer planning',
    },
    hardness: {
      title: 'Tank Water Hardness',
      description: 'This calculator allows you to prepare replacement water with the desired hardness parameters '
        + 'and easily calculate the resulting hardness in the planted tank.',
      keywords: 'water change, water hardness, gh, kh',
    },
    settings: {
      title: 'Settings',
    },
    about: {
      title: 'About Samomes Project',
      description: 'The Samomes project offers a set of tools for calculating planted tank fertilizers. '
        + 'It helps reduce routine work in calculating reagent concentrations and creating '
        + 'fertilizer dosing schedules. Use both DIY and commercial fertilizers to '
        + 'achieve the desired element concentrations in water.',
      keywords: 'DIY mix, fertilizer calculator, aquarium fertilizers, homemade recipes, '
        + 'element concentration, schedule, aquarium plants',
    },
    articles: {
      title: 'Articles',
      description: 'Detailed recipes and instructions for making DIY fertilizers for '
        + 'aquarium plants: nitrates, phosphates and potassium. Simple ways to create effective '
        + 'fertilizers at home.',
      keywords: 'DIY fertilizers, aquarium plants, nitrate, phosphate, potassium, fertilizer recipes, '
        + 'stock solutions, planted aquarium',
      nitrate: {
        title: 'The Simplest Recipe for Homemade Nitrate Fertilizer',
        description: 'In this article you will learn how to make a fertilizer recipe with nitrate and ' +
          'potassium (DIY nitrate mix). And that it is actually not complicated at all.',
        keywords: 'nitrate, fertilizer, DIY mix, stock solution, recipe',
      },
      phosphate: {
        title: 'The Simplest Recipe for DIY Phosphate Fertilizer',
        description: 'In this article you will learn how to make a fertilizer recipe with phosphate ' +
          'and potassium (DIY phosphate mix). And that it is actually not complicated at all.',
        keywords: 'phosphate, fertilizer, DIY mix, stock solution, recipe',
      },
      potassium: {
        title: 'The Simplest Recipe for DIY Potassium Fertilizer',
        description: 'In this article you will learn how to make a potassium fertilizer recipe ' +
          '(DIY potassium mix) for aquarium.',
        keywords: 'potassium, fertilizer, DIY mix, stock solution, recipe, aquarium',
      },
      noTests1: {
        title: 'You Don\'t Need Aquarium Tests - Part 1: General Overview and Tank Examples',
        description: 'Why aquarium tests may be unnecessary and how to successfully '
          + 'maintain a planted aquarium without them. Real examples of tanks before and after giving up tests.',
        keywords: 'aquarium without tests, planted tank, aquaristics, CO2 '
          + 'in aquarium, aquarium fertilizers, algae in aquarium, water parameters, '
          + 'nitrates, phosphates, potassium',
      },
      noTests2: {
        title: 'You Don\'t Need Aquarium Tests - Part 2: Detailed Test Review and Conclusion',
        description: 'Detailed analysis of each type of aquarium test and why most of them are unnecessary. '
          + 'Practical advice for maintaining a planted tank without using tests.',
        keywords: 'aquarium without tests, TDS meter, pH test, Kh, Gh, nitrate, phosphate, potassium, '
          + 'iron, drop checker, CO2, planted tank, aquaristics',
      },
    },
  },
};
