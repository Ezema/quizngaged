// encapsulates scoring algorithm applied to a set of student answers

const validator = require('../../frontend/customFunctions/formValidation.js');

function analyseAnswer(answerJson) {

  let isFreeText = answerJson.qtype == 'Text Response';

  let posedBody = answerJson.difficulty == 'base' || isFreeText
      ? answerJson.questiondata.questionBaselineBody
      : answerJson.difficulty == 'easy'
      ? answerJson.questiondata.questionEasierBody
      : answerJson.questiondata.questionHarderBody;
  
  let options = answerJson.difficulty == 'base' 
  ? answerJson.questiondata.questionBaselineAnswers
  : answerJson.difficulty == 'easy'
  ? answerJson.questiondata.questionEasierAnswers
  : answerJson.questiondata.questionHarderAnswers;

  var correctAnswer = isFreeText
      ? answerJson.studentanswer
      : null;

  var isGivenCorrect = isFreeText
      ? validator.isValidMandatoryText(correctAnswer)
      : false;

  var givenAnswer = isFreeText
      ? answerJson.studentanswer
      : null;

  if (!isFreeText) {
    for (var i = 0; i < options.length; i++) {
      if (options[i].isCorrect) {
        correctAnswer = options[i].body;
        isGivenCorrect = options[i].id == answerJson.studentanswer;
      }
      if (options[i].id == answerJson.studentanswer) {
        givenAnswer = options[i].body;
      }
    }
  }

  return {
    posedQuestion: posedBody,
    questionType: answerJson.qtype,
    difficulty: isFreeText ? 'base' : answerJson.difficulty,
    correctAnswer: correctAnswer,
    isAnswerGiven: isFreeText ? isGivenCorrect : givenAnswer != null,
    isGivenCorrect: isGivenCorrect,
    givenAnswer: givenAnswer,
  };
}

module.exports.analyseAnswer = analyseAnswer;

function computeScore(analysedAnswer, difficultyMultipliers) {
  if (analysedAnswer.isGivenCorrect) {
    return 1 * difficultyMultipliers[analysedAnswer.difficulty];
  }
  else {
    return 0;
  }
}

module.exports.computeScore = computeScore;

function analyseAnswersSet(quizAnswersString, difficultyMultipliers) {
  let summary = {
    numAnswersGiven: 0,
    numCorrectAnswers: 0,
    score: 0,
    analysedAnswers: [],
  };

  try {
    if (validator.isValidMandatoryText(quizAnswersString) && validator.isValidMandatoryText(difficultyMultipliers)) {
      const quizAnswersJson = JSON.parse(quizAnswersString);
      for (var i = 0; i < quizAnswersJson.length; i++) {
        let nextAnswer = analyseAnswer(quizAnswersJson[i]);
        if (!nextAnswer.isAnswerGiven) {
          continue;
        }
        nextAnswer.score = computeScore(nextAnswer, difficultyMultipliers);
        summary.numAnswersGiven++;
        summary.analysedAnswers.push(nextAnswer);
        if (nextAnswer.isGivenCorrect) {
          summary.numCorrectAnswers++;
          summary.score += nextAnswer.score;
        }
      }
    }
  } catch (err) {
    console.log('Exception error in data');
  }

  return summary;
}

module.exports.analyseAnswersSet = analyseAnswersSet;

function countQuestions(quizJson) {
  let numQuestions = 0;
  for (var i = 0; i < quizJson.questions.length; i++) {
    if (!quizJson.questions[i].isDeleted) {
      numQuestions++;
    }
  }  
  return numQuestions;
}

module.exports.countQuestions = countQuestions;
