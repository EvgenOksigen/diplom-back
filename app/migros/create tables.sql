create table users(
  id_user serial not null,
  email varchar(255) NOT NULL UNIQUE,
  first_name varchar(50) not null,
  last_name varchar(90) not null,
  father_name varchar(50),
  birth_date date,
  primary key(id_user)
)
/*-------------------------*/
/*------DEPARTMENTS--------*/
/*-------------------------*/
create table departments(
  id_department serial not null,
  code int not null,
  title varchar(255) not null,
  primary key(id_department)
)
/*-------------------------*/
/*--------PROFILES---------*/
/*-------------------------*/
create table profiles(
  id_profile serial not null,
  p_year int,
  p_role int not null,
  department_ID int,
  user_ID int,
  primary key (id_profile),
  foreign key (department_ID) references departments(id_department),
  foreign key (user_ID) references users(id_user)
)