create table actions_over_files (
    id bigint(20) not null PRIMARY KEY AUTO_INCREMENT,
    user varchar(255) not null,
    action varchar(255) not null,
    file varchar(255) not null,
    absolute_path varchar(255) not null,
    date DATETIME not null
) ENGINE=MyISAM DEFAULT CHARSET=latin1