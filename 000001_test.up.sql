INSERT INTO `users` (email, first_name, last_name, salt, hashed_password)
VALUES ('author@example.com', 'Author', '', '$2b$10$LPWgQolfuVYRiZ9wQAtPnO', '$2b$10$LPWgQolfuVYRiZ9wQAtPnOKMcoi2EhwYTm..MmQLIKtJ/PpXtNZym');

INSERT INTO `images` (`id`, `original_url`, `thumbnail_url`, `alt`, `height`, `width`)
VALUES (UUID_TO_BIN('660b8122-ac8f-11ed-8805-80e82cb6b6a3'), 'http://example.com/original.jpg', 'http://example.com/thumbnail.jpg', 'Example', 1200, 630);

INSERT INTO `articles` (`slug`, `title`, `content`, `excerpt`, `image_id`, `author_email`, `tags`, `is_published`)
VALUES ('this-is-title', 'This is title', '<p>This is content.</p>', 'This is excerpt.', UUID_TO_BIN('660b8122-ac8f-11ed-8805-80e82cb6b6a3'), 'author@example.com', 'tag1,tag2,tag3', TRUE);
INSERT INTO `articles` (`slug`, `title`, `content`, `excerpt`, `image_id`, `author_email`, `tags`, `is_published`)
VALUES ('this-is-title-2', 'This is title 2', '<p>This is content.</p>', 'This is excerpt 2.', UUID_TO_BIN('660b8122-ac8f-11ed-8805-80e82cb6b6a3'), 'author@example.com', 'tag1,tag2,tag3', TRUE);
INSERT INTO `articles` (`slug`, `title`, `content`, `excerpt`, `image_id`, `author_email`, `tags`, `is_published`)
VALUES ('this-is-title-3', 'This is title 3', '<p>This is content.</p>', 'This is excerpt 3.', UUID_TO_BIN('660b8122-ac8f-11ed-8805-80e82cb6b6a3'), 'author@example.com', 'tag1,tag2,tag3', TRUE);