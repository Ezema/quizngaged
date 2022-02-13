module.exports = {
  BASEPATH: 'http://localhost:9090/API/',
  quizDummy: {
    "id": 0, 
    "isDeleted": false,
    "quizTitle": "Geography Quiz",
    "quizTopic": "geography", 
    "questions": [
          { "id": 2,
            "questionType": "Multiple Choice",
            "questionEasierBody":   "What is the length  of the Nile (easy)",
            "questionHarderBody":   "What is the length  of the Nile (hard)",
            "questionBaselineBody": "What is the length  of the Nile (normal)",
            "questionEasierAnswers": [
                { "id": 1, 
                  "body": "553 km",
                  "isCorrect": false,
                  "isSelected": false,
                  "parentQuestionId": 2
                }, 
                { "id": 2, 
                  "body": "98730 km",
                  "isCorrect": false,
                  "isSelected": false,
                  "parentQuestionId": 2
                },
                 { "id": 3,
                   "body": "6650 km (correct)",
                   "isCorrect": true,
                   "isSelected": false,
                    "parentQuestionId": 2}
                ],
            "questionHarderAnswers": [
                { "id": 1,
                  "body": "6750 km",
                  "isCorrect": false,
                  "isSelected": false,
                  "parentQuestionId": 2
                },
                { "id": 2,
                  "body": "6850 km",
                  "isCorrect": false,
                  "isSelected": false,
                  "parentQuestionId": 2
                },
                { "id": 3,
                  "body": "6650 km (correct",
                  "isCorrect": true,
                  "isSelected": false,
                   "parentQuestionId": 2}
              ], 

              "questionBaselineAnswers": [
                  {
                     "id": 1,
                      "body": "5535 km",
                      "isCorrect": false,
                      "isSelected": false,
                      "parentQuestionId": 2
                  },
                   {
                     "id": 2,
                     "body": "6650 km (correct)",
                     "isSelected": false,
                     "isCorrect": true,
                     "parentQuestionId": 2
                    },
                   {
                     "id": 3,
                     "body": "10124 km",
                     "isSelected": false,
                     "isCorrect": false, 
                     "parentQuestionId": 2}
                  ]
                },

               {
                 "id": 5, 
                 "questionType": "Binary Question",
                 "questionEasierBody": "Queston 2. Is Nile the longest river on the Earth?",
                 "questionHarderBody": "Queston 2.  Harder. Is Nile the longest river on the Earth?",
                 "questionBaselineBody": "Queston 2. Easier. Is Nile the longest river on the Earth?",
                
                 "questionEasierAnswers": [
                  {
                    "id": 1,
                    "body": "No",
                    "isSelected": false,
                    "isCorrect": false,
                    "parentQuestionId": 5
                  }, 
                  {"id": 2,
                   "body": "Yes (correct)",
                   "isCorrect": true,
                   "isSelected": false,
                    "parentQuestionId": 5
                  }
                  ],
                   "questionHarderAnswers": [
                    {
                       "id": 1,
                       "body": "No",
                       "isSelected": false,
                       "isCorrect": false,
                       "parentQuestionId": 5
                    }, 
                    { 
                      "id": 2, 
                      "body": "Yes",
                      "isSelected": false,
                      "isCorrect": true,
                      "parentQuestionId": 5}
                   ],
                    "questionBaselineAnswers": [
                    {
                      "id": 1,
                      "body": "No",
                      "isSelected": false,
                      "isCorrect": false,
                       "parentQuestionId": 5
                    },
                    { "id": 2,
                      "body": "Yes",
                      "isSelected": false,
                       "isCorrect": true,
                       "parentQuestionId": 5}
                     ]
                  },

                  {
                    "id": 6,
                    "questionType": "Text Response",
                    "questionEasierBody": "Question 3. What is the longest river?",
                    "questionHarderBody": "",
                    "questionBaselineBody": "What is the longest river?",
                    "questionEasierAnswers": [
                    { "id": 1,
                      "body": "What is the longest river? ",
                      "isSelected": false,
                      "isCorrect": false,
                      "parentQuestionId": 6
                    },
                    { 
                      "id": 2, 
                      "body": "What is the longest river?",
                      "isCorrect": true,
                      "isSelected": false,
                      "parentQuestionId": 6}
                    ], 
                    "questionHarderAnswers": [],
                    "questionBaselineAnswers": [
                    { "id": 1,
                     "body": "What is the longest river?",
                     "isSelected": false,
                     "isCorrect": true,
                     "parentQuestionId": 6}
                    ]
                  }
    
    ]
    },
  }