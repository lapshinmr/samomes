# Changelog

## [2.0.0] - 2025-06-26

Major update with complete migration to modern technology stack and significant user interface improvements.

### License

- Version v2.0.0 is now distributed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) license
- Previous version of the project (any commits before 575ae1d427a0a57f5d52d206b1e57c4b8bf874fc from February 13, 2025) is under GPL-3.0 license

### Code

- Project migrated from Nuxt 2 to Nuxt 3
- Vuex was replaced with Pinia
- All project code was rewritten following better practices
- Data handling now uses object-oriented approach

### Interface

- Completely updated main page of the website
    - Main block features videos with beautiful plants
    - Auxiliary blocks with videos demonstrate usage examples for each tool
    - Drawer was removed from the main page
    - Control panel link appeared in the top right corner
- Drawer moved from right to left
- Website color scheme changed
- Interface icons updated
- Added "Dosing" section. Now dosage selection is one level higher. Previously, dosing was located inside the schedule creation page.
- "Remineras" section moved above the "Dosing" section
- "Water preparation" section was renamed to "Hardness"
- "Dynamics" page was removed, and its functionality was moved to a popup window on the "Dosing" page
- Removed the ability to share recipes (due to technical complexity related to adding custom reagents)

### Aquariums

- Linear dimension fields moved to a separate popup window
    - These values are no longer saved since they are not needed in other sections and only participate in aquarium volume calculation
- Removed field for water volume in substrate

### Recipes

- Formula and compounds fields combined into a single "Reagents" field
- Added ability to add custom formulas and compounds if they are missing from the general list. Now you can make fertilizers from absolutely any reagents.
- Water is now a reagent and is located in the "Reagents" field, in connection with this:
    - Removed "Enter fertilizer volume" field
    - Removed choice between "liquid" and "dry"
    - Water volume now determines the initial fertilizer volume
- Added liquid reagents:
    - For liquid reagents, an additional "Dilution" field is available. For example, when selecting nitric acid (100%), you can specify the actual product concentration (60%)
    - When adding a liquid reagent, the total fertilizer volume is displayed, allowing you to adjust the water volume
- "Element dose" renamed to "Specific concentration"
    - Reagent mass calculation is now performed in a separate popup window
- Element concentration table moved down
    - Added any element ratios
- Added calculation of chelators Trilon B and EDTA (available when selecting them from the reagent list)

### Fertilizers

- All elements are now selected from the list independently
- Added ability to choose liquid and dry fertilizer
- Added ability to add any remineral

### Remineralizers

- Added liquid reagents
- To create a liquid remineral, you need to add "Water" reagent
- New fields added for each reagent:
    - gH - when entering values, the calculator automatically calculates the required reagent mass. Field is inactive for reagents that do not affect gH
    - kH - similar to gH field
    - Lock icon allows you to fix the mass value, preventing recalculation when changing overall gH, kH, or Ca/Mg ratio of the recipe
- Overall recipe gH field now allows calculating reagent masses:
    - Editing individual reagent masses allows setting the ratio between them. When changing overall gH, the calculator automatically recalculates masses, preserving the set element ratio and calcium/magnesium ratio
    - kH works similarly to gH. When changing kH, the calcium and magnesium ratio may change
    - Adjusting calcium and magnesium ratio automatically recalculates reagent masses
- Added concentration table in solution and mixture
- Added TDS calculation
- Added anion and cation diagrams:
    - Cations: Ca, Mg, Na, K. Diagrams show percentage ratio of elements with popup tooltips about concentrations. Text information is displayed to the left of the diagram
    - Anions: SO₄, Cl, CO₃, CH₃COO, C₆H₁₁O₇. Similar display as for cations
    - Overall ionic composition diagram shows the ratio of all elements (cations and anions) in the mixture

### Dosing

- Dosage selection is now available immediately upon page navigation (previously it was hidden under the "+" button in the schedule)
- All data is saved on the page, which allows avoiding re-entering data. This simplifies obtaining reference information from other pages without data loss
    - "Reset" button removes all data from the page
- The fertilizer field now displays:
    - DIY fertilizer recipes
    - Branded fertilizers added by the user (including remineralizers)
    - Branded fertilizers from the preset list (including remineralizers)
    - DIY remineral recipes
- Concentration table now shows the overall change in ionic composition in the aquarium after adding all fertilizers and remineralizers
- Added "Aquarium parameters" button, which duplicates the functionality of the previously existing "Dynamics" page.
    - But unlike the "Dynamics" page, here an equilibrium concentration table is provided, which can be used instead of tests

### Schedule

- The schedule page also remains a widget page, but when clicking "+ Add", the user is redirected to the dosing page
- Dosage distribution table now allows distributing dosages in any quantities
- Widget was slightly changed visually
    - There is no longer an option to skip a day. You can now skip a day through schedule editing and manually moving the dosage.

### Hardness

- Added ability to select any fertilizers
- All data is saved on the page, which allows avoiding re-entering data. This simplifies obtaining reference information from other pages without data loss
    - "Reset" button removes all data from the page

### About the Project

- Completely changed page text

### Settings

- Added table for viewing and deleting custom reagents
- Removed data copying functionality

## [1.0.0] - 2025-02-13

### License
- This version is distributed under GPL-3.0 license
