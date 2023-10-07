CREATE DATABASE dindin;

CREATE TABLE usuarios (
  id serial PRIMARY KEY,
  nome varchar(100) NOT NULL,
  email text UNIQUE NOT NULL,
  senha text NOT NULL
);

CREATE TABLE categorias (
  id serial PRIMARY KEY,
  descricao text NOT NULL
);

CREATE TABLE transacoes (
  id SERIAL PRIMARY KEY,
  descricao text,
  valor integer NOT NULL,
  data timestamp DEFAULT NOW(),
  categoria_id integer NOT NULL REFERENCES categorias(id),
  usuario_id integer NOT NULL REFERENCES usuarios(id),
  tipo text NOT NULL
);

INSERT INTO categorias 
  (descricao) 
VALUES 
  ('Alimentação'),
  ('Assinaturas e Serviços'),
  ('Casa'),
  ('Mercado'),
  ('Cuidados Pessoais'),
  ('Educação'),
  ('Família'),
  ('Lazer'),
  ('Pets'),
  ('Presentes'),
  ('Roupas'),
  ('Saúde'),
  ('Transporte'),
  ('Salário'),
  ('Vendas'),
  ('Outras receitas'),
  ('Outras despesas');
