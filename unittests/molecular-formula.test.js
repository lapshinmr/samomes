// This code was originally taken from the repository: https://github.com/emptyport/molecular-formula
// It has been modified by me to suit the requirements of this project.

import { describe, test, expect } from '@jest/globals';
import MolecularFormula from '../helpers/funcs/molecular-formula';

describe('Molecular Formula', () => {
  const empty = new MolecularFormula('');

  test('returns {} for composition if blank string passed in', () => {
    expect(empty.composition).toEqual({});
  });
});

describe('Simple Formula', () => {
  const formula = new MolecularFormula('H2O');

  test('formula for H2O matches', () => {
    expect(formula.formula).toEqual('H2O');
  });

  test('simplified formula for H2O matches', () => {
    expect(formula.simplifiedFormula).toEqual('H2O');
  });

  test('composition for H2O matches', () => {
    const { composition } = formula;
    expect(Object.keys(composition).length).toEqual(2);
    expect(composition.H).toEqual(2);
    expect(composition.O).toEqual(1);
    expect(formula.composition).toEqual({ H: 2, O: 1 });
  });
});

describe('CaSO4(H2O)2', () => {
  const formula = new MolecularFormula('CaSO4(H2O)2');

  test('formula for CaSO4(H2O)2 matches', () => {
    expect(formula.formula).toEqual('CaSO4(H2O)2');
  });

  test('simplified formula for CaSO4(H2O)2 matches', () => {
    expect(formula.simplifiedFormula).toEqual('CaSO6H4');
  });

  test('composition for CaSO4H4O2 matches', () => {
    const { composition } = formula;
    expect(Object.keys(composition).length).toEqual(4);
    expect(composition).toEqual({
      Ca: 1, S: 1, O: 6, H: 4,
    });
  });
});

describe('Complex Formula', () => {
  const formula = new MolecularFormula('Na2(OH)2CH4(Na(Cl)2)2U(CN)');

  test('formula for Na2(OH)2CH4(Na(Cl)2)2U(CN) matches', () => {
    expect(formula.formula).toEqual('Na2(OH)2CH4(Na(Cl)2)2U(CN)');
  });

  test('simplified formula for Na2(OH)2CH4(Na(Cl)2)2U(CN) matches', () => {
    expect(formula.simplifiedFormula).toEqual('Na4O2H6C2Cl4UN');
  });

  test('composition for Na2(OH)2CH4(Na(Cl)2)2U(CN) matches', () => {
    const { composition } = formula;
    expect(Object.keys(composition).length).toEqual(7);
    expect(composition).toEqual({
      Na: 4, O: 2, H: 6, C: 2, Cl: 4, U: 1, N: 1,
    });
  });
});

describe('Unicode Subscripts', () => {
  const formula = new MolecularFormula('Na₂(OH)₂CH₄(Na(Cl)₂)₂U(CN)');

  test('formula for Na₂(OH)₂CH₄(Na(Cl)₂)₂U(CN) matches', () => {
    expect(formula.formula).toEqual('Na2(OH)2CH4(Na(Cl)2)2U(CN)');
  });
});

describe('Multiple digits after parantheses', () => {
  const formula = new MolecularFormula('(CH2)10');

  test('parses correctly', () => {
    expect(formula.simplifiedFormula).toEqual('C10H20');
  });
});

describe('Molecular Masses', () => {
  const water = new MolecularFormula('H2O');
  const decane = new MolecularFormula('CH3(CH2)8CH3');

  test('water mass is correct', () => {
    expect(water.mass).toEqual(18.01528);
  });

  test('decane mass is correct', () => {
    expect(decane.mass).toEqual(142.28168);
  });
});
