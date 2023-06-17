INSERT INTO user (username, fullname, email, password, role)
VALUES
  ('test', 'teste', 'teste@t.t', 'pbkdf2:sha256:50000$TCI4GzcX$0de171a4f4dac32e3364c7ddc7c14f3e2fa61f2d17574483f7ffbb431b4acb2f', 'user'),
  ('other', 'other', 'other@t.t', 'pbkdf2:sha256:50000$kJPKsz6N$d2d4784f1b030a9761f5ccaeeaca413f27f2ecb76d6168407af962ddce849f79', 'user');

INSERT INTO image (filename, path_name, user_id)
VALUES
  ('email18.gif', '/home/luis/Documents/eqp3/djavu/static/images/email18.gif', 1),
  ('paidforsurf.gif', '/home/luis/Documents/eqp3/djavu/static/images/paidforsurf.gif', 1),
  ('file.gif', '/home/luis/Documents/eqp3/djavu/static/images/file.gif', 2),
  ('hello_kitty.gif', '/home/luis/Documents/eqp3/djavu/static/images/hello_kitty.gif', 2);
