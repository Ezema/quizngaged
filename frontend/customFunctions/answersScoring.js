// encapsulates scoring algorithm applied to a set of student answers

const validator = require('./formValidation.js');

function analyseAnswer(answerJson) {
  let posedBody = answerJson.difficulty == 'base' 
      ? answerJson.questiondata.questionBaselineBody
      : answerJson.difficulty == 'easy'
      ? answerJson.questiondata.questionEasierBody
      : answerJson.questiondata.questionHarderBody;
  
  let options = answerJson.difficulty == 'base' 
  ? answerJson.questiondata.questionBaselineAnswers
  : answerJson.difficulty == 'easy'
  ? answerJson.questiondata.questionEasierAnswers
  : answerJson.questiondata.questionHarderAnswers;

  let isFreeText = answerJson.qtype == 'Text Response';
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
    correctAnswer: correctAnswer,
    givenAnswer: givenAnswer,
    isGivenCorrect: isGivenCorrect,
    difficulty: answerJson.difficulty,
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
