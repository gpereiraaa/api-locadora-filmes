CREATE DATABASE db_locadora_filme_ds2t_25_2;

USE db_locadora_filme_ds2t_25_2;

CREATE TABLE tbl_filme (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome VARCHAR(100) NOT NULL,
	sinopse TEXT NULL,
	data_lancamento DATE NULL,
	duracao TIME NOT NULL,
	orcamento DECIMAL(11,2) NOT NULL,
	trailer VARCHAR(200) NULL,
	capa VARCHAR(200) NOT NULL
);

INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
 VALUES ('Velozes & Furiosos 7', 'Velozes e Furiosos 7 acompanha Dom (Vin Diesel), Brian (Paul Walker), Letty (Michelle Rodriguez) e o resto da equipe após os acontecimentos em Londres. Apesar de terem suas chances de voltar para os Estados Unidos e recomeçarem suas vidas, a tranquilidade do grupo é destruída quando Deckard Shaw (Jason Statham), um assassino profissional, quer vingança pela morte de seu irmão. Agora, a equipe tem que se reunir para impedir este novo vilão. Mas dessa vez, não é só sobre ser veloz. A luta é pela sobrevivência.', 
 '2015-04-02', '02:20:00', 190000000.00, 'https://www.adorocinema.com/filmes/filme-198750/trailer-19542058/', 'https://br.web.img3.acsta.net/c_310_420/pictures/15/03/30/21/19/054397.jpg');
 
 
 
 INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
 VALUES ('Os Vingadores - The Avengers', 'Loki (Tom Hiddleston) retorna à Terra enviado pelos chitauri, uma raça alienígena que pretende dominar os humanos. Com a promessa de que será o soberano do planeta, ele rouba o cubo cósmico dentro de instalações da S.H.I.E.L.D. e, com isso, adquire grandes poderes. Loki os usa para controlar o dr. Erik Selvig (Stellan Skarsgard) e Clint Barton/Gavião Arqueiro (Jeremy Renner), que passam a trabalhar para ele. No intuito de contê-los, Nick Fury (Samuel L. Jackson) convoca um grupo de pessoas com grandes habilidades, mas que jamais haviam trabalhado juntas: Tony Stark/Homem de Ferro (Robert Downey Jr.), Steve Rogers/Capitão América (Chris Evans), Thor (Chris Hemsworth), Bruce Banner/Hulk (Mark Ruffalo) e Natasha Romanoff/Viúva Negra (Scarlett Johansson). Só que, apesar do grande perigo que a Terra corre, não é tão simples assim conter o ego e os interesses de cada um deles para que possam agir em grupo.', 
 '2012-04-27', '02:23:00', 220000000.00, 'https://www.adorocinema.com/filmes/filme-130440/trailer-19315928/', 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/89/43/82/20052140.jpg');
 
 SELECT * FROM tbl_filme;

  
CREATE TABLE tbl_genero (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(200) NOT NULL,
    descricao TEXT NULL
 );
 
INSERT INTO tbl_genero (nome, descricao) VALUES ('Terror', 'Filme que causa muitos sustos nas pessoas e deixa com muito medo');
 
SELECT * FROM tbl_genero;
 
DESC tbl_genero;


CREATE TABLE tbl_ator (
	id_ator INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(200) NOT NULL,
    nacionalidade VARCHAR(100) NOT NULL,
    sexo VARCHAR(30) NOT NULL,
    data_nascimento DATE NULL,
    foto VARCHAR(200) NULL,
    altura DECIMAL(5,2) NULL,
    biografia TEXT NULL
);

INSERT INTO tbl_ator (nome, nacionalidade, sexo, data_nascimento, foto, altura, biografia) VALUES ('Vin Diesel', 'Americano', 'Masculino', NULL, NULL, NULL, NULL);
 
SELECT * FROM tbl_ator;

DESC tbl_ator;

create table tbl_produtora (
	id_produtora INT primary KEY NOT NULL auto_increment,
    nome varchar(200) NOT NULL,
    pais varchar(200) null,
    data_fundacao date null,
    descricao text null,
    site varchar(200) null
);

INSERT INTO tbl_produtora (nome, pais, data_fundacao, descricao, site) VALUES ('Produtora A', 'Estados Unidos', '1990-05-12', 'Produtora do velozes e furiosos', 'www.produtoraA.com');

SELECT * FROM tbl_produtora ORDER BY id_produtora DESC;

DESC tbl_produtora;

CREATE TABLE tbl_personagem (
	id_personagem INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(200) NOT NULL,
    nacionalidade VARCHAR(100) NULL,
    apelido VARCHAR(100) NULL,
    descricao TEXT NULL,
    biografia TEXT NULL,
    sexo VARCHAR(30) NULL,
    foto VARCHAR(200) NULL
);

INSERT INTO tbl_personagem (nome, nacionalidade, apelido, descricao, biografia, sexo, foto) VALUES ('Batman', 'Americano', 'Morcego', NULL, NULL, 'Masculino', NULL);

SELECT * FROM tbl_personagem ORDER BY id_personagem DESC;



CREATE TABLE tbl_diretor (
	id_diretor INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(200) NOT NULL,
    nacionalidade VARCHAR(100) NOT NULL,
    sexo VARCHAR(30) NOT NULL,
    data_nascimento DATE NULL,
    foto VARCHAR(200) NULL,
    altura DECIMAL(5,2) NULL,
    biografia TEXT NULL
);

INSERT INTO tbl_diretor (nome, nacionalidade, sexo, data_nascimento, foto, altura, biografia) VALUES ('Vin Diesel', 'Americano', 'Masculino', NULL, NULL, NULL, NULL);

INSERT INTO tbl_diretor (nome, nacionalidade, sexo, data_nascimento, foto, altura, biografia) VALUES ('Paul Walker', 'Americano', 'Masculino', '1975-04-12', 'aaaaaaaaaaaaaaaaa', '1.75', 'aaaaaaaaaaaaaaaaaaaa');
 
SELECT * FROM tbl_diretor;

SELECT * FROM tbl_diretor ORDER BY id_diretor DESC;

DESC tbl_diretor;

Create table tbl_filme_genero(
	id int not null primary key auto_increment,
    id_filme int not null,
    id_genero int not null,
    
    constraint FK_FILME_FILME_GENERO # Nome da relação
    foreign key(id_filme) # Qual a chave estrangeira
    references tbl_filme(id), # De onde vem a FK
    
    constraint FK_GENERO_FILME_GENERO
    foreign key(id_genero)
    references tbl_genero(id)
);

select * from tbl_filme_genero;


CREATE TABLE tbl_filme_ator (
	id int not null primary key auto_increment,
    id_filme int not null,
    id_ator int not null,
    
    constraint FK_FILME_FILME_ATOR
    foreign key (id_filme)
    references tbl_filme(id),
    
    constraint FK_ATOR_FILME_ATOR
    foreign key (id_ator)
    references tbl_ator(id_ator)
);


CREATE TABLE tbl_filme_ator_personagem (
	id int not null primary key auto_increment,
    id_filme int not null,
    id_ator int not null,
    id_personagem int not null,
    
    constraint FK_FILME_FILME_ATOR_PERSONAGEM
    foreign key (id_filme)
    references tbl_filme(id),
    
    constraint FK_ATOR_FILME_ATOR_PERSONAGEM
    foreign key (id_ator)
    references tbl_ator(id_ator),
    
    constraint FK_PERSONAGEM_FILME_ATOR_PERSONAGEM
    foreign key (id_personagem)
    references tbl_personagem(id_personagem)
);