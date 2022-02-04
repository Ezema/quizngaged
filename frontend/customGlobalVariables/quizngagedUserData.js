/* eslint-disable import/no-anonymous-default-export */
export default {
    quizngagedUserData: {
        "uid":null,
        "userType":null,
        "email":null,
        "photoURL":null,
        "name":null,
        "phone":null,
        "classrooms":[
            {
                id:0,
                name:'My first classroom',
                isDeleted:false,
                pastQuizzes:[                
                ],
                ongoingLiveQuizzes:[                
                ],
                classroomStatistics:{},
                classroomSettings:{}
            },
            {
                id:1,
                isDeleted:false,
                name:'My Second classroom',
                pastQuizzes:[                    
                ],
                ongoingLiveQuizzes:[                
                ],
                classroomStatistics:{},
                classroomSettings:{}
            }
        ],
        "quizzes":
        [
            {
                id:0,
                isDeleted:false,
                quizTitle:"my quiz number 1",
                quizTopic:"geography",
                questions:[                    
                ]
            },
            {
                id:1,
                isDeleted:false,
                quizTitle:"my quiz number 2",
                quizTopic:"geography",                
                questions:[                    
                ]
            },
        ],
        "questions":[
            {
                id:0,            
                isDeleted:false,
                questionType:'Multiple Choice',
                questionBaselineBody:'baseline question',
                questionBaselineAnswers:[
                    {   id:0,
                        parentQuestionId:1,
                        body:'baseline answer 1'
                    },
                    {   id:1,
                        parentQuestionId:1,
                        body:'baseline answer 2'
                    },
                ],
                questionEasierBody:'easy question',
                questionEasierAnswers:[
                    {   id:0,
                        parentQuestionId:1,
                        body:'easy answer 1'
                    },
                    {   id:1,
                        parentQuestionId:1,
                        body:'easy answer 2'
                    },
                ],
                questionHarderBody:'hard question',
                questionHarderAnswers:[
                    {   id:0,
                        parentQuestionId:1,
                        body:'hard answer 1'
                    },
                    {   id:1,
                        parentQuestionId:1,
                        body:'hard answer 2'
                    },
                ],

            },
            {
                id:1,            
                isDeleted:false,
                questionType:'Multiple Choice',
                questionBaselineBody:'baseline question',
                questionBaselineAnswers:[
                    {   id:0,
                        parentQuestionId:1,
                        body:'baseline answer 1'
                    },
                    {   id:1,
                        parentQuestionId:1,
                        body:'baseline answer 2'
                    },
                ],
                questionEasierBody:'easy question',
                questionEasierAnswers:[
                    {   id:0,
                        parentQuestionId:1,
                        body:'easy answer 1'
                    },
                    {   id:1,
                        parentQuestionId:1,
                        body:'easy answer 2'
                    },
                ],
                questionHarderBody:'hard question',
                questionHarderAnswers:[
                    {   id:0,
                        parentQuestionId:1,
                        body:'hard answer 1'
                    },
                    {   id:1,
                        parentQuestionId:1,
                        body:'hard answer 2'
                    },
                ],

            }
        ],
    }
};