CREATE TABLE stadium (
    id SERIAL PRIMARY KEY,
	name VARCHAR(200) NOT NULL
);

CREATE TABLE football_club(
	id SERIAL PRIMARY KEY,
	name VARCHAR(200) NOT NULL
);

CREATE TABLE season(
	id SERIAL PRIMARY key,
	name VARCHAR(200) NOT NULL
);

CREATE TABLE football_club_season(
	id SERIAL PRIMARY KEY,
	season_id INT REFERENCES season(id) NOT NULL,
	football_club_id INT REFERENCES football_club(id) NOT NULL
);

CREATE TABLE match(
	id SERIAL PRIMARY KEY,
	stadium INT REFERENCES stadium(id) NOT NULL,
	team1_id INT REFERENCES football_club(id) NOT NULL,
	team1_score INT NOT NULL CHECK(team1_score >= 0),
	team2_id INT REFERENCES football_club(id) NOT NULL,
	team2_score INT NOT NULL CHECK(team2_score >= 0)
);

insert into stadium(name) values ('estadio 1');
insert into stadium(name) values ('estadio 2');
insert into stadium(name) values ('estadio 3');
insert into stadium(name) values ('estadio 4');

insert into season(name) values('brasileirão 2019');
insert into season(name) values('brasileirão 2020');

insert into football_club(name) values('gremio');
insert into football_club(name) values('inter');
insert into football_club(name) values('curintia');
insert into football_club(name) values('sao paulo fc');
insert into football_club(name) values('bota-fogo');
insert into football_club(name) values('tira-fogo');
insert into football_club(name) values('cruzeiro');

insert into football_club_season(season_id, football_club_id) values(1, 1);
insert into football_club_season(season_id, football_club_id) values(1, 2);
insert into football_club_season(season_id, football_club_id) values(1, 3);
insert into football_club_season(season_id, football_club_id) values(1, 4);
insert into football_club_season(season_id, football_club_id) values(1, 5);
insert into football_club_season(season_id, football_club_id) values(1, 6);

insert into football_club_season(season_id, football_club_id) values(2, 1);
insert into football_club_season(season_id, football_club_id) values(2, 3);
insert into football_club_season(season_id, football_club_id) values(2, 5);
insert into football_club_season(season_id, football_club_id) values(2, 7);
