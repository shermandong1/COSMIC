-- MySQL dump 10.13  Distrib 5.5.19, for Linux (x86_64)
--
-- Host: 45.40.164.96    Database: cosmicsys577t2
-- ------------------------------------------------------
-- Server version	5.5.51-38.1-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `itemid` int(11) NOT NULL AUTO_INCREMENT,
  `hardware` tinyint(4) NOT NULL,
  `name` varchar(200) NOT NULL,
  `desc` varchar(500) NOT NULL,
  `tag1` varchar(80) DEFAULT NULL,
  `tag2` varchar(80) DEFAULT NULL,
  `tag3` varchar(80) DEFAULT NULL,
  `tag4` varchar(80) DEFAULT NULL,
  `tag5` varchar(80) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `quantityAvailable` int(11) NOT NULL,
  `quantityTotal` int(11) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `reorderThreshold` int(11) NOT NULL,
  PRIMARY KEY (`itemid`)
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,1,'Arduino Uno','Single-board microcontroller. Ages 10+. Measured in units of Arduinos..','Arduino','Computer','Microcontroller',NULL,NULL,'Available',14,14,'A125',4);
INSERT INTO `items` VALUES (15,0,'AAA Batteries','Standard batteries. Measured in units of battery.','Battery','AAA',NULL,NULL,NULL,'Available',73,113,'C101',10);
INSERT INTO `items` VALUES (32,0,'Elmer\'s School Glue','4 oz bottles of washable glue.','Glue','Crafts',NULL,NULL,NULL,'Available',4,4,'C15',5);
INSERT INTO `items` VALUES (33,0,'Color Pencils (12 Pack)','12 pack of Crayola colored pencils.','Colored Pencils','Crafts',NULL,NULL,NULL,'Available',15,15,'A305',3);
INSERT INTO `items` VALUES (45,0,'D Batteries','Standard D Batteries. Measured in units of individual battery.','Battery',NULL,NULL,NULL,NULL,'Unavailable',0,0,NULL,5);
INSERT INTO `items` VALUES (127,1,'3D Printer','3D Printer',NULL,NULL,NULL,NULL,NULL,'Available',10,10,NULL,6);
INSERT INTO `items` VALUES (128,0,'DC Motor','DC motor','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'A',1);
INSERT INTO `items` VALUES (129,0,'9 Volt Batteries','9 Volt Battery','Quantity Available TBD','Square',NULL,NULL,NULL,'Available',16,20,'A',4);
INSERT INTO `items` VALUES (130,0,'Popsicle Sticks','Popsicle Sticks','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'E',1);
INSERT INTO `items` VALUES (131,0,'Magnet Wire Spool','Magnet Wire','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'D',1);
INSERT INTO `items` VALUES (132,0,'Switch (Momentary)','Push Button Switch',NULL,NULL,NULL,NULL,NULL,'Available',1,1,'D/H',1);
INSERT INTO `items` VALUES (133,0,'Switch ( Toggle)','Toggle Switch','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'D/H',1);
INSERT INTO `items` VALUES (134,0,'Cups (Paper)','Cups',NULL,NULL,NULL,NULL,NULL,'Available',300,300,'Plastic Container',50);
INSERT INTO `items` VALUES (135,0,'Cup ( Plastic)','Cup',NULL,NULL,NULL,NULL,NULL,'Available',200,200,'Plastic Container',1);
INSERT INTO `items` VALUES (136,0,'Cup (Cone)','Cup',NULL,NULL,NULL,NULL,NULL,'Available',200,200,'Plastic Container',50);
INSERT INTO `items` VALUES (137,0,'Cup (Styrofoam)','Cup',NULL,NULL,NULL,NULL,NULL,'Available',200,200,'Plastic Container',50);
INSERT INTO `items` VALUES (138,0,'Bottle (Liter)','Liter Bottle','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'Red Tub',1);
INSERT INTO `items` VALUES (139,0,'Bottle (500 ML)','500ml Bottle','500ml',NULL,NULL,NULL,NULL,'Available',40,40,'Plastic Container',1);
INSERT INTO `items` VALUES (140,0,'Borax','Borax','Borax',NULL,NULL,NULL,NULL,'Available',4,4,'C',1);
INSERT INTO `items` VALUES (141,0,'Baking Soda','Baking Soda',NULL,NULL,NULL,NULL,NULL,'Available',7,7,'C',1);
INSERT INTO `items` VALUES (142,0,'LEDs','LEDs','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'D/H',1);
INSERT INTO `items` VALUES (143,0,'Dish Soup','Dish Soup',NULL,NULL,NULL,NULL,NULL,'Available',4,4,'C',1);
INSERT INTO `items` VALUES (144,0,'Cardstock','Cardstock','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'B',1);
INSERT INTO `items` VALUES (145,0,'Index Card','index Cards','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'G',1);
INSERT INTO `items` VALUES (146,0,'Marshmallow','Marshmallow','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'H',1);
INSERT INTO `items` VALUES (147,0,'Graphing Notebooks','Notebook','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'Plastic Container',1);
INSERT INTO `items` VALUES (148,0,'Hot Glue Sticks','Hot Glue Sticks','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,NULL,1);
INSERT INTO `items` VALUES (149,0,'Pipe Cleaners','Pipe cleaners','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'E',1);
INSERT INTO `items` VALUES (150,0,'Tape ( Masking)','Masking Tape','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'E',1);
INSERT INTO `items` VALUES (151,0,'Tape ( Electrical)','Electrical Tape','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'D',1);
INSERT INTO `items` VALUES (152,0,'Pencils','Pencils','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'G',1);
INSERT INTO `items` VALUES (153,0,'Balloons/Balloon Bags','Balloons',NULL,NULL,NULL,NULL,NULL,'Available',50,50,'G',1);
INSERT INTO `items` VALUES (154,0,'Wheels (Black)','Black Wheels for making of cars','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'Location Unknown',1);
INSERT INTO `items` VALUES (155,0,'Wooden Dowel','Wooden Dowels for Black Wheels','Dowels','Wood','Cars',NULL,NULL,'Available',1,1,'Red Bucket',20);
INSERT INTO `items` VALUES (156,0,'Paper Towel','Paper Towels','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,NULL,1);
INSERT INTO `items` VALUES (157,0,'3D Printing Filament','Filament for 3D Printers','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'I',1);
INSERT INTO `items` VALUES (158,0,'Battery Clip AA','AA battery Clip','AA Single Battery Clip',NULL,NULL,NULL,NULL,'Available',50,50,'D',1);
INSERT INTO `items` VALUES (159,0,'Solder','Solder for Soldering Iron','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'D',1);
INSERT INTO `items` VALUES (160,0,'Rubber Bands','Rubber Bands','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'E',1);
INSERT INTO `items` VALUES (161,0,'Cardboard Tube','Tube of Cardboard','Tubes',NULL,NULL,NULL,NULL,'Available',20,20,'Plastic Container',10);
INSERT INTO `items` VALUES (162,0,'Tape (Packing/Clear)','Clear Tape','Packing Tape',NULL,NULL,NULL,NULL,'Available',4,4,'E',1);
INSERT INTO `items` VALUES (163,0,'Solid Core Wire','Solid Core Wire','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'D',1);
INSERT INTO `items` VALUES (164,0,'AA Battery Holder','AA Battery Clip','Quantity Available TBD','AA','Battery Holder',NULL,NULL,'Available',200,200,'D',1);
INSERT INTO `items` VALUES (165,0,'Paperclips','Paperclip','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'G',1);
INSERT INTO `items` VALUES (166,0,'Foam Core Sheets','Foam core','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,NULL,1);
INSERT INTO `items` VALUES (167,0,'Food Dye','Food Coloring','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'C',1);
INSERT INTO `items` VALUES (168,0,'Gloves','rubber gloves','Quantity Available TBD',NULL,NULL,NULL,NULL,'Available',1,1,'TBD',1);
INSERT INTO `items` VALUES (169,0,'Straws','Straw','QUANTITY TBH',NULL,NULL,NULL,NULL,'Available',1,1,'Location Unknown',1);
INSERT INTO `items` VALUES (170,0,'Coffee Stirrer','Coffee Stirrer','Wood','Stick','Stirrer',NULL,NULL,'Available',1,1,NULL,1);
INSERT INTO `items` VALUES (171,0,'Beaker 400 ml','Beaker','Beaker','Glass','400ml',NULL,NULL,'Available',1,1,NULL,1);
INSERT INTO `items` VALUES (172,0,'Binder Clips','Binder Clip','Clips','Paper','Binder',NULL,NULL,'Available',1,1,NULL,1);
INSERT INTO `items` VALUES (173,0,'Brass Clips','Brass Clips','Brass','Clips',NULL,NULL,NULL,'Available',1,1,NULL,1);
INSERT INTO `items` VALUES (174,0,'Bucket','Bucket','Orange','Bucket',NULL,NULL,NULL,'Available',1,1,'Between I and A',1);
INSERT INTO `items` VALUES (175,0,'Light Bulbs','Light Bulbs','Small Light Bulbs','Blue wire',NULL,NULL,NULL,'Available',1,1,NULL,1);
INSERT INTO `items` VALUES (176,0,'CDs','CDs','Blank CDs',NULL,NULL,NULL,NULL,'Available',1,1,'E',1);
INSERT INTO `items` VALUES (177,0,'Drill','Drill','Drill','Tool',NULL,NULL,NULL,'Available',1,1,'B',1);
INSERT INTO `items` VALUES (178,0,'Foot Pump','Foot Air Pump','Pump','Foot','Air Pump',NULL,NULL,'Available',1,1,NULL,1);
INSERT INTO `items` VALUES (179,0,'Glass Tube','Glass Tube','Glass Tube','Test Tube','Glass','Small',NULL,'Available',1,1,'B',1);
INSERT INTO `items` VALUES (180,0,'Hot Glue Gun','Hot Glue Gun','Hot Glue Gun','Glue',NULL,NULL,NULL,'Available',1,1,'A',1);
INSERT INTO `items` VALUES (181,0,'Goggles','Goggles','Eyewear','Safety',NULL,NULL,NULL,'Available',1,1,'Plastic Container Left of Desk',1);
INSERT INTO `items` VALUES (182,0,'Hand Saw','Hand Saw','Saw','Tools','Wood',NULL,NULL,'Available',1,1,'A',1);
INSERT INTO `items` VALUES (183,0,'Hole Puncher','Hole Puncher','Paper','Hole Puncher',NULL,NULL,NULL,'Available',1,1,'G',1);
INSERT INTO `items` VALUES (184,0,'Insulated Wire','Insulated Wire','Wire','Insulated','Stranded','Multicolor',NULL,'Available',20,20,'D',1);
INSERT INTO `items` VALUES (185,0,'Magnet (Bar)','Bar Magnet','Rectangular','Magnet','Bar Magnet',NULL,NULL,'Available',100,100,'D/E',1);
INSERT INTO `items` VALUES (186,0,'Magnifying Glass','Hand Held Magnifying Glass','Lens','Magnifying Glass',NULL,NULL,NULL,'Available',50,50,'D',1);
INSERT INTO `items` VALUES (187,1,'Dell Inspiron 15 5000 Series','5 Dell computers Viterbi ID 1006263 -  1006267','Dell','Silver','Laptop','Computer',NULL,'Available',5,5,'Laptop Cart RTH 210D',0);
INSERT INTO `items` VALUES (188,1,'Dell Inspiron 15','Black Laptops. Viterbi ID Tag 1004660, 1004661, 1004665','Dell','Black','Laptop','Computer','Windows 7','Available',3,3,'Laptop Cart RTH 210D',0);
INSERT INTO `items` VALUES (189,1,'Chromebook','S/N 5CD7222SVB','Chromebook','HP','Laptop',NULL,NULL,'Available',1,1,'Laptop Cart RTH 210D',0);
INSERT INTO `items` VALUES (190,1,'Dell Inspiron 15 5000 Series - 2 in -1','10 Viterbi ID 1006679 - 1006688\nComputer ID STEM-PC-01 = STEM-PC10','Dell','2 in 1','Laptop','Computer',NULL,'Available',10,10,'Laptop Cart RTH 210D',0);
INSERT INTO `items` VALUES (192,1,'Dell Inspiron 15 5000 Series - PC100 series','10 Viterbi ID 1006719-1006728\nPC-100 - PC-109','Dell','Charcaoal','Laptop','Computer',NULL,'Available',10,10,'Laptop Cart RTH 210D',0);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items_checkedout`
--

DROP TABLE IF EXISTS `items_checkedout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items_checkedout` (
  `itemid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `return_date` varchar(80) NOT NULL,
  `checkout_user` varchar(80) NOT NULL,
  `checkout_useremail` varchar(80) NOT NULL,
  PRIMARY KEY (`itemid`,`uid`),
  KEY `uid` (`uid`),
  CONSTRAINT `items_checkedout_ibfk_1` FOREIGN KEY (`itemid`) REFERENCES `items` (`itemid`),
  CONSTRAINT `items_checkedout_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items_checkedout`
--

LOCK TABLES `items_checkedout` WRITE;
/*!40000 ALTER TABLE `items_checkedout` DISABLE KEYS */;
INSERT INTO `items_checkedout` VALUES (15,230,30);
INSERT INTO `items_checkedout` VALUES (129,230,4);
/*!40000 ALTER TABLE `items_checkedout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items_reserved`
--

DROP TABLE IF EXISTS `items_reserved`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items_reserved` (
  `itemid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `daterange` varchar(200) NOT NULL,
  `checkout_user` varchar(80) NOT NULL,
  `checkout_useremail` varchar(80) NOT NULL,
  PRIMARY KEY (`itemid`,`uid`,`quantity`,`daterange`),
  KEY `items_reserved_ibfk_2` (`uid`),
  CONSTRAINT `items_reserved_ibfk_1` FOREIGN KEY (`itemid`) REFERENCES `items` (`itemid`),
  CONSTRAINT `items_reserved_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items_reserved`
--

LOCK TABLES `items_reserved` WRITE;
/*!40000 ALTER TABLE `items_reserved` DISABLE KEYS */;
/*!40000 ALTER TABLE `items_reserved` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `superadmin`
--

DROP TABLE IF EXISTS `superadmin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `superadmin` (
  `title` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`title`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `superadmin`
--

LOCK TABLES `superadmin` WRITE;
/*!40000 ALTER TABLE `superadmin` DISABLE KEYS */;
INSERT INTO `superadmin` VALUES ('Director','Darin Gray','daring@usc.edu');
INSERT INTO `superadmin` VALUES ('Inventory Manager','Xue Fei','xuefei.lin15@gmail.com');
/*!40000 ALTER TABLE `superadmin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=340 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (230,'Darin Gray','daring@usc.edu','Admin','$2a$10$5ceb74ac06c18e4f1f786uEx5os0uCBFYQSj4cpcfsKW9uinduGAC','2017-11-19 20:42:26');
INSERT INTO `users` VALUES (334,'Ben Louie','blouie@usc.edu','Admin','$2a$10$6f136422a580198ff80ebOo2ZN/DmsFaA9ck1bLOIb6/vv55mlVUC','2017-12-06 18:13:42');
INSERT INTO `users` VALUES (335,'Rochelle Urban','rurban@usc.edu','Admin','$2a$10$83c85160edc711ea0b46cO2VbAkY9KI1Rv8sUifpV5M4AoP.8ObFq','2017-12-06 18:14:05');
INSERT INTO `users` VALUES (336,'COSMIC-System Dev Team','577devteam2@usc.edu','Admin','$2a$10$cc0be13c5af704cd50e3dO6riglTmuq3S/Ovx9kx26LuWM0BZfM32','2017-12-06 18:51:56');
INSERT INTO `users` VALUES (337,'Trent Jones','trentjon@usc.edu','Admin','$2a$10$c9641ea83f9d569a5f3e1u8ufaXs58vzQICJPnpTPfkKDwR6K2CAC','2018-01-05 16:05:55');
INSERT INTO `users` VALUES (338,'Xue Fei','xuefeili@usc.edu','Admin','$2a$10$6b37b323d9680fa525d00u96gYhRn7dB3N3Pm3kSwku3Qodi7iLjO','2018-01-10 19:07:34');
INSERT INTO `users` VALUES (339,'Ninareh Mehrabi','ninarehm@usc.edu','Admin','$2a$10$f11954d46447cfe9f4ae7u8nWHvb/eI.e5WIgzcjt7WTAwyoh1ezG','2018-01-20 01:32:04');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-30 21:06:35
