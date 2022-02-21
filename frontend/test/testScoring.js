// tests for correct analysis and scoring of answers

const chai = require('chai');
const assert = require('assert');
const validator = require('../customFunctions/formValidation.js');
const scorer = require('../../backend/customFunctions/answersScoring.js')

const quizAnswersString = "[{\"qid\": 2, \"qtype\": \"Multiple Choice\", \"difficulty\": \"base\", \"questiondata\": {\"id\": 2, \"questionType\": \"Multiple Choice\", \"questionEasierBody\": \"One is?\", \"questionHarderBody\": \"The cleverest animal\", \"questionBaselineBody\": \"capital of china?\", \"questionEasierAnswers\": [{\"id\": 1, \"body\": \"An integer\", \"isCorrect\": true, \"parentQuestionId\": 2}, {\"id\": 2, \"body\": \"A negative number\", \"isCorrect\": false, \"parentQuestionId\": 2}, {\"id\": 3, \"body\": \"A piece of the moon\", \"isCorrect\": false, \"parentQuestionId\": 2}], \"questionHarderAnswers\": [{\"id\": 1, \"body\": \"Elephants\", \"isCorrect\": false, \"parentQuestionId\": 2}, {\"id\": 2, \"body\": \"Dolphins\", \"isCorrect\": false, \"parentQuestionId\": 2}, {\"id\": 3, \"body\": \"Crows\", \"isCorrect\": true, \"parentQuestionId\": 2}], \"questionBaselineAnswers\": [{\"id\": 1, \"body\": \"beijing\", \"isCorrect\": true, \"isSelected\": true, \"parentQuestionId\": 2}, {\"id\": 2, \"body\": \"shanghai\", \"isCorrect\": false, \"isSelected\": false, \"parentQuestionId\": 2}, {\"id\": 3, \"body\": \"paris\", \"isCorrect\": false, \"isSelected\": false, \"parentQuestionId\": 2}]}, \"studentanswer\": 1}, {\"qid\": 3, \"qtype\": \"Binary Question\", \"difficulty\": \"base\", \"questiondata\": {\"id\": 3, \"questionType\": \"Binary Question\", \"questionEasierBody\": \"Birds eat grubs and worms\", \"questionHarderBody\": \"All birds can fly\", \"questionBaselineBody\": \"Birds are descended from dinosaurs\", \"questionEasierAnswers\": [{\"id\": 1, \"body\": \"True\", \"isCorrect\": true, \"parentQuestionId\": 3}, {\"id\": 2, \"body\": \"False\", \"isCorrect\": false, \"parentQuestionId\": 3}], \"questionHarderAnswers\": [{\"id\": 1, \"body\": \"True\", \"isCorrect\": false, \"parentQuestionId\": 3}, {\"id\": 2, \"body\": \"False\", \"isCorrect\": true, \"parentQuestionId\": 3}], \"questionBaselineAnswers\": [{\"id\": 1, \"body\": \"True\", \"isCorrect\": true, \"isSelected\": false, \"parentQuestionId\": 3}, {\"id\": 2, \"body\": \"False\", \"isCorrect\": false, \"isSelected\": true, \"parentQuestionId\": 3}]}, \"studentanswer\": 2}, {\"qid\": 4, \"qtype\": \"Text Response\", \"difficulty\": \"base\", \"questiondata\": {\"id\": 4, \"questionType\": \"Text Response\", \"questionEasierBody\": \"\", \"questionHarderBody\": \"\", \"questionBaselineBody\": \"Favourite ice-cream\", \"questionEasierAnswers\": [], \"questionHarderAnswers\": [], \"questionBaselineAnswers\": [{\"id\": 1, \"body\": \"\", \"isCorrect\": false, \"parentQuestionId\": 4}]}, \"studentanswer\": \"Choc chip\"}]";
const quizAnswersJson = JSON.parse(quizAnswersString);
const answer0 = quizAnswersJson[0];
const answer1 = quizAnswersJson[1];
const answer2 = quizAnswersJson[2];

const testDifficultyMultipliers = { base: 10, easy: 5, hard: 15};

describe("Set of scoring tests", () => {
    
  describe("Answers contains 3 questions", () => {
    let count = quizAnswersJson.length;
    it("should be length 3", () => {
      assert.equal(count, 3);
    });
  });

  describe("Answers are answer objects with a qid reference", () => {
    it("row 0 should be an object with a qid", () => {
      assert.equal(typeof(answer0.qid), 'number');
    });
    it("row 1 should be an object with a qid", () => {
      assert.equal(typeof(answer1.qid), 'number');
    });
    it("row 2 should be an object with a qid", () => {
      assert.equal(typeof(answer2.qid), 'number');
    });
  });

  describe("Answers have a valid difficulty", () => {
    it("row 0 should be base difficulty", () => {
      assert.equal(answer0.difficulty, 'base');
    });
    it("row 1 should be base difficulty", () => {
      assert.equal(answer1.difficulty, 'base');
    });
    it("row 2 should be base difficulty", () => {
      assert.equal(answer2.difficulty, 'base');
    });
  });

  describe("Answers have a expected type", () => {
    it("row 0 should be Multiple Choice", () => {
      assert.equal(answer0.qtype, 'Multiple Choice');
    });
    it("row 1 should be Binary Question", () => {
      assert.equal(answer1.qtype, 'Binary Question');
    });
    it("row 2 should be Text Response", () => {
      assert.equal(answer2.qtype, 'Text Response');
    });
  });

  describe("Answers has correct question posed", () => {
    it("row 0 should be 'capital of china?'", () => {
      assert.equal(scorer.analyseAnswer(answer0).posedQuestion, 'capital of china?');
    });
    it("row 1 should be 'Birds are descended from dinosaurs'", () => {
      assert.equal(scorer.analyseAnswer(answer1).posedQuestion, 'Birds are descended from dinosaurs');
    });
    it("row 2 should be 'Favourite ice-cream'", () => {
      assert.equal(scorer.analyseAnswer(answer2).posedQuestion, 'Favourite ice-cream');
    });
  });

  describe("Answers has correct option", () => {
    it("row 0 should be 'beijing'", () => {
      assert.equal(scorer.analyseAnswer(answer0).correctAnswer, 'beijing');
    });
    it("row 1 should be 'True'", () => {
      assert.equal(scorer.analyseAnswer(answer1).correctAnswer, 'True');
    });
    it("row 2 should be 'Choc chip'", () => {
      assert.equal(scorer.analyseAnswer(answer2).correctAnswer, 'Choc chip');
    });
  });

  describe("Student's answer is found", () => {
    it("row 0 should be correct answer 'beijing'", () => {
      assert.equal(scorer.analyseAnswer(answer0).givenAnswer, 'beijing');
    });
    it("row 1 should be incorrect answer 'False'", () => {
      assert.equal(scorer.analyseAnswer(answer1).givenAnswer, 'False');
    });
    it("row 2 should be 'Choc chip'", () => {
      assert.equal(scorer.analyseAnswer(answer2).givenAnswer, 'Choc chip');
    });
  });

  describe("Student's answer is correct", () => {
    it("row 0 should be correct answer", () => {
      assert.equal(scorer.analyseAnswer(answer0).isGivenCorrect, true);
    });
    it("row 1 should be incorrect answer", () => {
      assert.equal(scorer.analyseAnswer(answer1).isGivenCorrect, false);
    });
    it("row 2 should be correct", () => {
      assert.equal(scorer.analyseAnswer(answer2).isGivenCorrect, true);
    });
  });

  describe("Student's score is correctly computed", () => {
    it("row 0 should be 10", () => {
      assert.equal(scorer.computeScore(scorer.analyseAnswer(answer0), testDifficultyMultipliers), 10);
    });
    it("row 1 should be 0", () => {
      assert.equal(scorer.computeScore(scorer.analyseAnswer(answer1), testDifficultyMultipliers), 0);
    });
    it("row 2 should be 10", () => {
      assert.equal(scorer.computeScore(scorer.analyseAnswer(answer2), testDifficultyMultipliers), 10);
    });
  });

  describe("Free text answer empty is analysed correctly", () => {
    const freeTextNotAnswered = JSON.parse("{\"qid\": 4, \"qtype\": \"Text Response\", \"difficulty\": \"base\", \"questiondata\": {\"id\": 4, \"questionType\": \"Text Response\", \"questionEasierBody\": \"\", \"questionHarderBody\": \"\", \"questionBaselineBody\": \"Favourite ice-cream\", \"questionEasierAnswers\": [], \"questionHarderAnswers\": [], \"questionBaselineAnswers\": [{\"id\": 1, \"body\": \"\", \"isCorrect\": false, \"parentQuestionId\": 4}]}, \"studentanswer\": \" \"}");
    let analysedAnswer = scorer.analyseAnswer(freeTextNotAnswered);
    it("Empty text returns incorrect", () => {
      assert.equal(analysedAnswer.isGivenCorrect, false);
    });
    it("Empty text returns answer not given", () => {
      assert.equal(analysedAnswer.isAnswerGiven, false);
    });
    it("Empty text gets 0 score", () => {
      assert.equal(scorer.computeScore(analysedAnswer, testDifficultyMultipliers), 0);
    });
  });

  describe("Hard difficulty answer is correctly analysed", () => {
    const hardAnswer = JSON.parse("{\"qid\": 3, \"qtype\": \"Binary Question\", \"difficulty\": \"hard\", \"questiondata\": {\"id\": 3, \"questionType\": \"Binary Question\", \"questionEasierBody\": \"Birds eat grubs and worms\", \"questionHarderBody\": \"All birds can fly\", \"questionBaselineBody\": \"Birds are descended from dinosaurs\", \"questionEasierAnswers\": [{\"id\": 1, \"body\": \"True\", \"isCorrect\": true, \"parentQuestionId\": 3}, {\"id\": 2, \"body\": \"False\", \"isCorrect\": false, \"parentQuestionId\": 3}], \"questionHarderAnswers\": [{\"id\": 1, \"body\": \"True\", \"isCorrect\": false, \"parentQuestionId\": 3}, {\"id\": 2, \"body\": \"False\", \"isCorrect\": true, \"parentQuestionId\": 3}], \"questionBaselineAnswers\": [{\"id\": 1, \"body\": \"True\", \"isCorrect\": true, \"isSelected\": true, \"parentQuestionId\": 3}, {\"id\": 2, \"body\": \"False\", \"isCorrect\": false, \"isSelected\": true, \"parentQuestionId\": 3}]}, \"studentanswer\": 2}");
    let analysedAnswer = scorer.analyseAnswer(hardAnswer);
    it("Difficulty is hard", () => {
      assert.equal(analysedAnswer.difficulty, 'hard');
    });
    it("Posed question os 'All birds can fly'", () => {
      assert.equal(analysedAnswer.posedQuestion, 'All birds can fly');
    });
    it("Correct answer is 'False'", () => {
      assert.equal(analysedAnswer.correctAnswer, 'False');
    });
    it("Given answer matches the correct answer", () => {
      assert.equal(analysedAnswer.givenAnswer, 'False');
    });
    it("Is answer given is true", () => {
      assert.equal(analysedAnswer.isAnswerGiven, true);
    });
    it("Is score correct for harder answer", () => {
      assert.equal(scorer.computeScore(analysedAnswer, testDifficultyMultipliers), 15);
    });
  });

  describe("Easy difficulty answer is correctly analysed", () => {
    const hardAnswer = JSON.parse("{\"qid\": 2, \"qtype\": \"Multiple Choice\", \"difficulty\": \"easy\", \"questiondata\": {\"id\": 2, \"questionType\": \"Multiple Choice\", \"questionEasierBody\": \"One is?\", \"questionHarderBody\": \"The cleverest animal\", \"questionBaselineBody\": \"capital of china?\", \"questionEasierAnswers\": [{\"id\": 1, \"body\": \"An integer\", \"isCorrect\": true, \"parentQuestionId\": 2}, {\"id\": 2, \"body\": \"A negative number\", \"isCorrect\": false, \"parentQuestionId\": 2}, {\"id\": 3, \"body\": \"A piece of the moon\", \"isCorrect\": false, \"parentQuestionId\": 2}], \"questionHarderAnswers\": [{\"id\": 1, \"body\": \"Elephants\", \"isCorrect\": false, \"parentQuestionId\": 2}, {\"id\": 2, \"body\": \"Dolphins\", \"isCorrect\": false, \"parentQuestionId\": 2}, {\"id\": 3, \"body\": \"Crows\", \"isCorrect\": true, \"parentQuestionId\": 2}], \"questionBaselineAnswers\": [{\"id\": 1, \"body\": \"beijing\", \"isCorrect\": true, \"isSelected\": true, \"parentQuestionId\": 2}, {\"id\": 2, \"body\": \"shanghai\", \"isCorrect\": false, \"isSelected\": false, \"parentQuestionId\": 2}, {\"id\": 3, \"body\": \"paris\", \"isCorrect\": false, \"isSelected\": false, \"parentQuestionId\": 2}]}, \"studentanswer\": 1}");
    let analysedAnswer = scorer.analyseAnswer(hardAnswer);
    it("Difficulty is easy", () => {
      assert.equal(analysedAnswer.difficulty, 'easy');
    });
    it("Posed question is 'One is?'", () => {
      assert.equal(analysedAnswer.posedQuestion, 'One is?');
    });
    it("Correct answer is 'An integer'", () => {
      assert.equal(analysedAnswer.correctAnswer, 'An integer');
    });
    it("Given answer matches the correct answer", () => {
      assert.equal(analysedAnswer.givenAnswer, 'An integer');
    });
    it("Is answer given is true", () => {
      assert.equal(analysedAnswer.isAnswerGiven, true);
    });
    it("Is score correct for easier answer", () => {
      assert.equal(scorer.computeScore(analysedAnswer, testDifficultyMultipliers), 5);
    });
  });

  describe("Correct number of answers in set is detected", () => {
    it("empty arguments returns 0 answers", () => {
      assert.equal(scorer.analyseAnswersSet().numAnswersGiven, 0);
    });
    it("empty 2nd argument returns 0 answers", () => {
      assert.equal(scorer.analyseAnswersSet(quizAnswersString).numAnswersGiven, 0);
    });
    it("3 answers are found", () => {
      assert.equal(scorer.analyseAnswersSet(quizAnswersString, testDifficultyMultipliers).numAnswersGiven, 3);
    });
    it("2 answers are correct", () => {
      assert.equal(scorer.analyseAnswersSet(quizAnswersString, testDifficultyMultipliers).numCorrectAnswers, 2);
    });
    it("summary score is correct", () => {
      assert.equal(scorer.analyseAnswersSet(quizAnswersString, testDifficultyMultipliers).score, 20);
    });
    it("empty object returns 0 count", () => {
      assert.equal(scorer.analyseAnswersSet("{}", testDifficultyMultipliers).numAnswersGiven, 0);
    });
    it("invalid object returns 0 count", () => {
      assert.equal(scorer.analyseAnswersSet("}", testDifficultyMultipliers).numAnswersGiven, 0);
    });
    it("empty array returns 0 count", () => {
      assert.equal(scorer.analyseAnswersSet("[]", testDifficultyMultipliers).numAnswersGiven, 0);
    });
    it("array with empty object returns 0 count", () => {
      assert.equal(scorer.analyseAnswersSet("[{}]", testDifficultyMultipliers).numAnswersGiven, 0);
    });
    it("array with incomplete data returns 0 count", () => {
      assert.equal(scorer.analyseAnswersSet("[{\"qid\": 2}]", testDifficultyMultipliers).numAnswersGiven, 0);
    });

  });


});

