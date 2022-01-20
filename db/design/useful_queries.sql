# query relationships between users

select a.username, b.username, c.relationship
from users a, users b, user_relations c
where a.user_id = c.first_user_id
and b.user_id = c.second_user_id;

# quiz and questions

select a.quiz_id, a.quiz_type, a.quiz_title, 
b.question_id, b.question_text, b.question_type, b.difficulty_level
from quizzes a, questions b, quiz_questions c
where a.quiz_id = c.quiz_id
and b.question_id = c.question_id;

# quiz, question and answers in order 

select a.quiz_title, b.question_text, d.answer_id, d.display_order, d.answer_text
from quizzes a, questions b, quiz_questions c, question_answers d
where a.quiz_id = c.quiz_id
and b.question_id = c.question_id
and d.question_id = b.question_id
order by d.question_id, d.display_order;

# questions and correct answers

select b.question_text, d.answer_text
from questions b, question_answers d
where d.question_id = b.question_id
and b.correct_answer_id = d.answer_id;

# quiz events and questions

select a.quiz_event_id, a.quiz_type, a.quiz_title, a.quiz_state, b.event_question_id
from quiz_events a, event_questions b
where a.quiz_event_id = b.quiz_event_id;

# students in quiz events

select a.username, b.quiz_title
from users a, quiz_events b, student_quizzes c
where a.user_id = c.student_user_id
and b.quiz_event_id = c.quiz_event_id;

# student responses

select a.username, d.event_question_id, d.raw_score
from users a, quiz_events b, student_quizzes c, student_responses d
where a.user_id = c.student_user_id
and b.quiz_event_id = c.quiz_event_id
and d.quiz_event_id = c.quiz_event_id
and d.student_user_id = c.student_user_id;


