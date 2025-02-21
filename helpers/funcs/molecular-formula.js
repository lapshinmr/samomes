import ELEMENTS from '~/helpers/constants/elements';

export default class MolecularFormula {
  constructor(formula) {
    this.formulaInit = formula;
  }

  static replaceSupAndSub(formula) {
    return formula.replace(
      /[⁰¹²³⁴-⁹₀-₉]/g,
      (char) => char.charCodeAt(0).toString(16).slice(-1),
    );
  }

  static isLowerCase(char) {
    return /^[a-z]$/.test(char);
  }

  static isUpperCase(char) {
    return /^[A-Z]$/.test(char);
  }

  static isNumber(char) {
    return /^\d+$/.test(char);
  }

  get mass() {
    let mass = 0.0;
    this.composition.forEach((key) => {
      mass += (ELEMENTS[key] * this.composition[key]);
    });
    return mass;
  }

  get formula() {
    return MolecularFormula.replaceSupAndSub(this.formulaInit);
  }

  get composition() {
    const formulaCleaned = MolecularFormula.cleanParentheses(this.formula);
    return MolecularFormula.formulaToJson(formulaCleaned);
  }

  get simplifiedFormula() {
    return this.createSimplifiedFormula();
  }

  static createComposition(elemList) {
    /**
     * Converts an array of element-count pairs into a JSON object representing the element composition.
     *
     * @param {Array} elemList - An array of element-count pairs. Each pair is an array, where:
     *    - The first element is a string representing the element (e.g., "H", "O", "C").
     *    - The second element is a string convertible to a number representing the count of the element.
     *    Example: [["H", 2], ["O", 1]] for H2O
     *
     * @returns {Object} - A JSON object where keys are element symbols and values are their corresponding counts.
     *    Example: { H: 2, O: 1 } for H2O
     */
    const json = {};
    elemList.forEach(([element, count]) => {
      if (element in json) {
        json[element] += +count;
      } else {
        json[element] = +count;
      }
    });
    return json;
  }

  static getParenthesisGroups(formula) {
    const openIndex = [];
    const groups = [];

    formula.forEach((i) => {
      const c = formula[i];
      if (c === '(') {
        openIndex.push(i);
      }
      if (c === ')') {
        groups.push([openIndex.pop(), i]);
      }
    });
    return groups;
  }

  static createElemList(formula) {
    const lettersAndDigits = formula.split('');
    let currentElem = '';
    let currentCount = '';
    const elemList = [];

    lettersAndDigits.forEach((char) => {
      if (currentElem.length === 0 && MolecularFormula.isUpperCase(char)) {
        currentElem = char;
      } else if (currentElem.length === 1 && MolecularFormula.isLowerCase(char)) {
        currentElem += char;
      } else if (currentElem.length > 0) {
        if (MolecularFormula.isNumber(char)) {
          currentCount += char;
        } else if (MolecularFormula.isUpperCase(char)) {
          if (currentCount.length === 0) {
            currentCount = '1';
          }
          elemList.push([currentElem, currentCount]);
          currentElem = '';
          currentCount = '';
        }
      }
    });
    if (currentCount.length === 0) {
      currentCount = '1';
    }
    elemList.push([currentElem, currentCount]);
    return elemList;
  }

  static cleanParentheses(formula) {
    if (!formula.includes('(')) {
      return formula;
    }
    const innerGroup = MolecularFormula.getParenthesisGroups(formula)[0];
    const [startIndex, stopIndex] = innerGroup;

    let c = '';
    let i = 1;
    while (MolecularFormula.isNumber(formula[stopIndex + i])) {
      c += formula[stopIndex + i];
      i += 1;
    }
    if (c.length === 0) {
      c = '1';
    }
    const multiplier = +c;
    const partial = formula.substring(startIndex + 1, stopIndex);

    const elemList = MolecularFormula.createElemList(partial);
    let newPartial = '';
    elemList.forEach(([element, count]) => {
      newPartial += element;
      newPartial += count * multiplier;
    });

    let replacePart = `(${partial})`;
    if (multiplier !== 1) {
      replacePart += multiplier;
    }
    const newFormula = formula.replace(replacePart, newPartial);
    return MolecularFormula.cleanParentheses(newFormula);
  }

  static formulaToJson(formula) {
    if (formula.length === 0) {
      return {};
    }
    const elemList = MolecularFormula.createElemList(formula);
    return MolecularFormula.createComposition(elemList);
  }

  createSimplifiedFormula() {
    let formula = '';
    this.composition.forEach((key) => {
      formula += key;
      if (this.composition[key] !== 1) {
        formula += this.composition[key];
      }
    });
    return formula;
  }
}
