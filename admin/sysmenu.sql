DROP TABLE IF EXISTS `dbsai`.`sysmenu`;
CREATE TABLE  `dbsai`.`sysmenu` (
  `idsysmenu` int(10) unsigned NOT NULL auto_increment,
  `nama` varchar(145) NOT NULL,
  `classname` varchar(245) NOT NULL,
  `tipe` varchar(5) NOT NULL,
  `idparent` int(10) unsigned NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY  (`idsysmenu`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

insert into sysmenu values('Financial System','app_saku_app','MAIN',0,'APP'),
('Portal Panel','app_portal_app','MAIN',0,'APP')