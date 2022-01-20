insert into institutions (institution_id, institution_name) 
values (1, 'Test School');

insert into users (user_id, username, email, password, is_teacher, institution_id) 
values (1, 'testTeacherA', 'teachera@noreply.com', 'teachera', true, 1);

insert into users (user_id, username, email, password, is_student) 
values 
(2, 'testStudentA', 'studenta@noreply.com', 'studenta', true),
(3, 'testStudentB', 'studentb@noreply.com', 'studentb', true);

insert into users (user_id, username, email, password, is_parent) 
values (4, 'testParentA', 'parenta@noreply.com', 'parenta', true);

insert into user_relations (first_user_id, second_user_id, relationship)
values (4, 2, 'PARENT');



insert into quizzes (quiz_id, teacher_user_id, quiz_type, quiz_title, quiz_topic) 
values (1, 1, 'FEEDBACK', 'Test feedback quiz', 'Test topic');

insert into questions (question_id, question_type, difficulty_level, question_text) 
values
(1, 'CHOOSE', 'BASE', 'Question one description'),
(2, 'TRUE-FALSE', 'BASE', 'Question two description');

insert into question_answers (answer_id, question_id, display_order, answer_text)
values
(1, 1, 1, 'Question one, first possible answer'),
(2, 1, 3, 'Question one, third possible answer'),
(3, 1, 2, 'Question one, second possible answer (correct one)'),
(4, 1, 4, 'Question one, forth possible answer'),
(5, 2, 1, 'Question two, first answer'),
(6, 2, 2, 'Question two, second answer (correct one)');

update questions set correct_answer_id = 3 where question_id = 1;
update questions set correct_answer_id = 6 where question_id = 2;

insert into quiz_questions (quiz_id, question_id)
values
(1, 1),
(1, 2);


insert into quiz_events (quiz_event_id, quiz_id, quiz_type, quiz_state, quiz_title, quiz_topic) 
values (1, 1, 'FEEDBACK', 'IN_REVIEW', 'Test feedback quiz', 'Test topic');

insert into event_questions (event_question_id, quiz_event_id) 
values
(1, 1),
(2, 1);

insert into student_quizzes (quiz_event_id, student_user_id) 
values 
(1, 2),
(1, 3);

insert into student_responses (quiz_event_id, student_user_id, event_question_id, given_answer_id, raw_score)
values
(1, 2, 1, 4, 0.0),
(1, 2, 2, 6, 100.0),
(1, 3, 1, 3, 100.0),
(1, 3, 2, 6, 100.0);



