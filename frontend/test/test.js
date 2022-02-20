// run with : npm test

const chai = require('chai');
const assert = require('assert');
const { doesNotMatch } = require('assert');
const validator = require('../customFunctions/formValidation.js');

describe("Set of validation tests", () => {
    
  describe("Mandatory text cannot be null", () => {
    let isValid = validator.isValidMandatoryText();
    it("should fail if null", () => {
      assert.equal(isValid, false);
    });
  });

  describe("Mandatory text cannot be empty", () => {
    let isValid = validator.isValidMandatoryText('');
    it("should fail if empty", () => {
      assert.equal(isValid, false);
    });
  });

  describe("Mandatory text cannot be spaces", () => {
    let isValid = validator.isValidMandatoryText('   ');
    it("should fail if just spaces", () => {
      assert.equal(isValid, false);
    });
  });

  describe("Mandatory text may have text", () => {
    let isValid = validator.isValidMandatoryText('222');
    it("should pass if string with value", () => {
      assert.equal(isValid, true);
    });
  });

  describe("Mandatory array cannot be null", () => {
    let isValid = validator.isValidNonEmptyArray();
    it("should fail if null", () => {
      assert.equal(isValid, false);
    });
  });

  describe("Mandatory array must have at least one element", () => {
    let isValid = validator.isValidNonEmptyArray(new Array(0));
    it("should fail if empty", () => {
      assert.equal(isValid, false);
    });
  });

  describe("Mandatory array must have at least one element", () => {
    let isValid = validator.isValidNonEmptyArray(new Array(1));
    it("should pass if has one value", () => {
      assert.equal(isValid, true);
    });
  });

  describe("Mandatory array can have more elements", () => {
    let isValid = validator.isValidNonEmptyArray([1,2,3]);
    it("should pass if has >1 value", () => {
      assert.equal(isValid, true);
    });
  });

  describe("Check option choice with no arguments fails", () => {
    let isValid = validator.isValidEntryChoice();
    it("should fail with no arguments", () => {
      assert.equal(isValid, false);
    });
  });

  describe("Check array for option choice is not null", () => {
    let isValid = validator.isValidEntryChoice('x', null);
    it("should fail with null array", () => {
      assert.equal(isValid, false);
    });
  });

  describe("Check option choice from array is not null", () => {
    let isValid = validator.isValidEntryChoice(null, [1,2,3]);
    it("should fail with just one parameter", () => {
      assert.equal(isValid, false);
    });
  });

  describe("Check array for option choice is not empty", () => {
    let isValid = validator.isValidEntryChoice('x', []);
    it("should fail with zero length array", () => {
      assert.equal(isValid, false);
    });
  });

  describe("Check option choice is not in the array", () => {
    let isValid = validator.isValidEntryChoice('x', ['y']);
    it("should fail with invalid choice", () => {
      assert.equal(isValid, false);
    });
  });

  describe("Check option choice is only element in the array", () => {
    let isValid = validator.isValidEntryChoice('x', ['x']);
    it("should pass with valid choice", () => {
      assert.equal(isValid, true);
    });
  });

  describe("Check option choice is not first element in the array", () => {
    let isValid = validator.isValidEntryChoice('x', ['y', 'x']);
    it("should pass with valid choice", () => {
      assert.equal(isValid, true);
    });
  });

  describe("Check option choice is not first or last element in the array", () => {
    let isValid = validator.isValidEntryChoice('x', ['y', 'x', 'z']);
    it("should pass with valid choice", () => {
      assert.equal(isValid, true);
    });
  });

  describe("Check option choice is not in the array with many elements", () => {
    let isValid = validator.isValidEntryChoice('x', ['y', 'a', 'z', 'b']);
    it("should fail with invalid choice", () => {
      assert.equal(isValid, false);
    });
  });

});
