// run with : npm test

const chai = require('chai');
const assert = require('assert');
const { doesNotMatch } = require('assert');
const validator = require('../customFunctions/formValidation.js');

describe("Set of tests", () => {
    
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

});
