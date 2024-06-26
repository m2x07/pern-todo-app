CREATE DATABASE todoapp;

\c todoapp;

CREATE TABLE main (id INT, data VARCHAR(32), done BOOLEAN)
INSERT INTO
	main (id, data, done)
VALUES
	(1, 'this is todo one', TRUE),
	(2, 'this is todo two', FALSE),
	(3, 'this is todo three', TRUE)
