/* Part B implementation of tables in the target DBMS*/
create database TeleMedicine;
use TeleMedicine;

create table Account(
	Email VARCHAR(50) NOT NULL,
	PhoneNumber CHAR(10),
	Password VARCHAR (15),
	Address VARCHAR (30),
	AccountType CHAR(1),
	Verified Boolean,
	sid INT,
	PRIMARY KEY(Email)
	);	

create table Patient(
	ID INT NOT NULL,
	Name VARCHAR (15),
	Sex CHAR,
	Weight DECIMAL,
	Height DECIMAL,
	Age INT,
	Email VARCHAR(50),
	PRIMARY KEY (ID),
	FOREIGN KEY (Email) references Account(Email) on delete cascade on update cascade
	);

create table InsuranceInfo(
	InsuranceNumber INT NOT NULL,
	Insurer VARCHAR(15) NOT NULL,
	P_ID INT,
	PRIMARY KEY(InsuranceNumber, Insurer),
	FOREIGN KEY (P_ID) references Patient(ID) on delete cascade on update cascade
	);

create table BankInfo(
	ID INT NOT NULL,
	AccountNumber VARCHAR(17) NOT NULL,
	RoutingNumber CHAR(9) NOT NULL,
	P_ID INT,
	PRIMARY KEY (ID),
	FOREIGN KEY (P_ID) references Patient(ID) on delete cascade on update cascade

	);

create table CreditInfo(
	ID INT NOT NULL,
	CardNumber VARCHAR(16),
	P_ID INT,
	PRIMARY KEY(ID),
	FOREIGN KEY (P_ID) references Patient(ID) on delete cascade on update cascade
	);

create table SystemUser(
	System_User_Id INT NOT NULL,
	Email VARCHAR(50),
	PRIMARY KEY (System_User_Id),
	FOREIGN KEY (Email) references Account(Email) on update cascade on delete cascade
	);

create table Doctor(
	ID INT not NULL,
	Name varchar(15),
	info varchar(15),
	website varchar(50),
	Email varchar(50),
	PRIMARY KEY(ID),
	FOREIGN KEY (Email) references Account(Email) on delete cascade on update cascade
	);

create table Service(
	Name VARCHAR(15) NOT NULL,
	Description VARCHAR(100),
	PRIMARY KEY (Name)
	);

create table Office(
	ID INT NOT NULL, 
	Address VARCHAR(30) UNIQUE,
	Name VARCHAR(15),
	PRIMARY KEY(ID)
	);

create table OnlineLocation(
	ID INT NOT NULL,
	URL VARCHAR(20) UNIQUE,
	PRIMARY KEY(ID)
	);

create table Appointment(
	Appointment_ID INT not NULL,
	Date_Time TIMESTAMP,  
	Notes VARCHAR(50),
	isValid Boolean,
	P_ID INT,
	D_ID INT,
	URL VARCHAR(20),
	ServiceName VARCHAR(15),
	pidname VARCHAR(20),
	didname VARCHAR(20),
	location VARCHAR(20),
	PRIMARY KEY(Appointment_ID),
	FOREIGN KEY (P_ID) references Patient(ID) on delete cascade on update cascade,
	FOREIGN KEY (D_ID) references Doctor(ID) on delete cascade on update cascade,
	FOREIGN KEY (URL) references OnlineLocation(URL) on delete cascade on update cascade,
	FOREIGN KEY (ServiceName) references Service(Name) on update cascade
	);

create table HasOffice(
	Address VARCHAR(30),
	D_ID INT,
	FOREIGN KEY (D_ID) references Doctor(ID),
	FOREIGN KEY (Address) references Office(Address)
	);

create table ProvidesService(
	Sname VARCHAR(15),
	D_ID INT,
	FOREIGN KEY (Sname) references Service(Name) on delete cascade on update cascade
	);

create table Review(
	Date_Time TIMESTAMP NOT NULL,
	Comments VARCHAR(50),
	Rating INT,
	P_ID INT,
	D_ID INT,
	FOREIGN KEY (P_ID) references Patient(ID) on delete cascade on update cascade,
	FOREIGN KEY (D_ID) references Doctor(ID) on delete cascade on update cascade
	);


create table Bill(
	AppointmentId INT NOT NULL,
	Amount INT,
	isPaid Boolean,
	isVerified Boolean,
	Suser_ID INT,
	FOREIGN KEY (AppointmentID) references Appointment(Appointment_ID) on delete cascade on update cascade,
	FOREIGN KEY (Suser_ID) references SystemUser(System_User_Id) on delete cascade on update cascade
	);
	
-- /* Part C SQL statements for database construction and data population*/
INSERT INTO Account
VALUES ('RermondDober@gmail.com', '6821122334', 'password123', '1234 Makebelieve Rd', 'P', TRUE, 111111);
INSERT INTO Account
VALUES ('PAA@gmail.com', '6821122334', 'PAApassword123', '1234 PAAMakebelieve Rd', 'P', TRUE, 111112);
INSERT INTO Account
VALUES ('PAB@gmail.com', '6821122334', 'PABpassword123', '1234 PABMakebelieve Rd', 'P', TRUE, 111113);
INSERT INTO Account
VALUES ('PAC@gmail.com', '6821122334', 'PACpassword123', '1234 PACMakebelieve Rd', 'P', TRUE, 111114);
INSERT INTO Account
VALUES ('PAD@gmail.com', '6821122334', 'PADpassword123', '1234 PADMakebelieve Rd', 'P', TRUE, 111115);
INSERT INTO Account
VALUES ('PAE@gmail.com', '6821122334', 'PAEpassword123', '1234 PAEMakebelieve Rd', 'P', TRUE, 111116);
INSERT INTO Account
VALUES ('PAF@gmail.com', '6821122334', 'PAFpassword123', '1234 PAFMakebelieve Rd', 'P', TRUE, 111117);

INSERT INTO Account
VALUES ('RichardBenson@RavfordHospita.com', '0123456789', 'password123', '1234 Makebelieve Rd', 'S', TRUE, 211111);
INSERT INTO Account
VALUES ('SAA@RavfordHospita.com', '0123456789', 'SAApassword123', '1234 SAAMakebelieve Rd', 'S', TRUE, 211112);
INSERT INTO Account
VALUES ('SAB@RavfordHospita.com', '0123456789', 'SABpassword123', '1234 SABMakebelieve Rd', 'S', TRUE, 211113);
INSERT INTO Account
VALUES ('SAC@RavfordHospita.com', '0123456789', 'SACpassword123', '1234 SACMakebelieve Rd', 'S', TRUE, 211114);
INSERT INTO Account
VALUES ('SAD@RavfordHospita.com', '0123456789', 'SADpassword123', '1234 SADMakebelieve Rd', 'S', TRUE, 211115);
INSERT INTO Account
VALUES ('SAE@RavfordHospita.com', '0123456789', 'SAEpassword123', '1234 SAEMakebelieve Rd', 'S', TRUE, 211116);
INSERT INTO Account
VALUES ('SAF@RavfordHospita.com', '0123456789', 'SAFpassword123', '1234 SAFMakebelieve Rd', 'S', TRUE, 211117);


INSERT INTO Account
VALUES ('BensonRichard@RavfordHospita.com', '0123456789', 'password123', '1234 Makebelieve Rd', 'D', TRUE, 311111);
INSERT INTO Account
VALUES ('DAA@RavfordHospita.com', '0123456789', 'DAApassword123', '1234 DAAMakebelieve Rd', 'D', TRUE, 311112);
INSERT INTO Account
VALUES ('DAB@RavfordHospita.com', '0123456789', 'DABpassword123', '1234 DABMakebelieve Rd', 'D', TRUE, 311113);
INSERT INTO Account
VALUES ('DAC@RavfordHospita.com', '0123456789', 'DACpassword123', '1234 DACMakebelieve Rd', 'D', TRUE, 311114);
INSERT INTO Account
VALUES ('DAD@RavfordHospita.com', '0123456789', 'DADpassword123', '1234 DADMakebelieve Rd', 'D', TRUE, 311115);
INSERT INTO Account
VALUES ('DAE@RavfordHospita.com', '0123456789', 'DAEpassword123', '1234 DAEMakebelieve Rd', 'D', TRUE, 311116);
INSERT INTO Account
VALUES ('DAF@RavfordHospita.com', '0123456789', 'DAFpassword123', '1234 DAFMakebelieve Rd', 'D', TRUE, 311117);


INSERT INTO Patient
VALUES (111111, 'Rermond', 'M', 183.2, 100.2, 26, 'RermondDober@gmail.com');
INSERT INTO Patient
VALUES (111112, 'Alber', 'M', 183.2, 100.2, 26, 'PAA@gmail.com');
INSERT INTO Patient
VALUES (111113, 'Bob', 'M', 183.2, 100.2, 26, 'PAB@gmail.com');
INSERT INTO Patient
VALUES (111114, 'Cat', 'F', 183.2, 100.2, 26, 'PAC@gmail.com');
INSERT INTO Patient
VALUES (111115, 'Duglus', 'M', 183.2, 100.2, 26, 'PAD@gmail.com');
INSERT INTO Patient
VALUES (111116, 'Fernado', 'F', 183.2, 100.2, 26, 'PAE@gmail.com');
INSERT INTO Patient
VALUES (111117, 'Eddie', 'M', 183.2, 100.2, 26, 'PAF@gmail.com');

INSERT INTO InsuranceInfo
VALUES (111111, 'Lois Insurer', 111111);
INSERT INTO InsuranceInfo
VALUES (111112, 'Frog Insurer', 111112);
INSERT INTO InsuranceInfo
VALUES (111113, 'Teller Insurer', 111113);
INSERT INTO InsuranceInfo
VALUES (111114, 'DRG Insurer', 111114);
INSERT INTO InsuranceInfo
VALUES (111115, 'FLS Insurer', 111115);
INSERT INTO InsuranceInfo
VALUES (111116, 'NON Insurer', 111116);
INSERT INTO InsuranceInfo
VALUES (111117, 'LST Insurer', 111117);

INSERT INTO BankInfo
VALUES (111111, '111111', '111111111', 111111);
INSERT INTO BankInfo
VALUES (111112, '121212', '121212121', 111112);
INSERT INTO BankInfo
VALUES (111113, '131313', '131313131', 111113);
INSERT INTO BankInfo
VALUES (111114, '141414', '141414141', 111114);
INSERT INTO BankInfo
VALUES (111115, '151515', '151515151', 111115);
INSERT INTO BankInfo
VALUES (111116, '161616', '161616161', 111116);
INSERT INTO BankInfo
VALUES (111117, '171717', '171717171', 111117);

INSERT INTO CreditInfo
VALUES (111111, '1234123412341234', 111111);
INSERT INTO CreditInfo
VALUES (111112, '1234123412341234', 111112);
INSERT INTO CreditInfo
VALUES (111113, '1234123412341234', 111113);
INSERT INTO CreditInfo
VALUES (111114, '1234123412341234', 111114);
INSERT INTO CreditInfo
VALUES (111115, '1234123412341234', 111115);
INSERT INTO CreditInfo
VALUES (111116, '1234123412341234', 111116);
INSERT INTO CreditInfo
VALUES (111117, '1234123412341234', 111117);

INSERT INTO SystemUser
VALUES (211111, 'RichardBenson@RavfordHospita.com');
INSERT INTO SystemUser
VALUES (211112, 'SAA@RavfordHospita.com');
INSERT INTO SystemUser
VALUES (211113, 'SAB@RavfordHospita.com');
INSERT INTO SystemUser
VALUES (211114, 'SAC@RavfordHospita.com');
INSERT INTO SystemUser
VALUES (211115, 'SAD@RavfordHospita.com');
INSERT INTO SystemUser
VALUES (211116, 'SAE@RavfordHospita.com');
INSERT INTO SystemUser
VALUES (211117, 'SAF@RavfordHospita.com');

INSERT INTO Doctor
VALUES (311111, 'Benson', 'Foot Doctor', 'www.BensonRichardFoot.com',  'BensonRichard@RavfordHospita.com');
INSERT INTO Doctor
VALUES (311112, 'Anna', 'Tung Doctor', 'www.AnnaTung.com',  'DAA@RavfordHospita.com');
INSERT INTO Doctor
VALUES (311113, 'Billy', 'Lung Doctor', 'www.BillyLung.com',  'DAB@RavfordHospita.com');
INSERT INTO Doctor
VALUES (311114, 'Cath', 'Ear Doctor', 'www.CathEar.com',  'DAC@RavfordHospita.com');
INSERT INTO Doctor
VALUES (311115, 'Donnus', 'Nose Doctor', 'www.DonnusNose.com',  'DAD@RavfordHospita.com');
INSERT INTO Doctor
VALUES (311116, 'Edri', 'Eye Doctor', 'www.EndriEye.com',  'DAE@RavfordHospita.com');
INSERT INTO Doctor
VALUES (311117, 'Froggo', 'Hair Doctor', 'www.FroggoHair.com',  'DAF@RavfordHospita.com');

INSERT INTO Service
VALUES ('Foot Scan', 'Scanning of foots for any diseases');
INSERT INTO Service
VALUES ('Tung Scan', 'Scanning of tung for any diseases');
INSERT INTO Service
VALUES ('Lung Scan', 'Scanning of lung for any diseases');
INSERT INTO Service
VALUES ('Ear Scan', 'Scanning of ear for any diseases');
INSERT INTO Service
VALUES ('Nose Scan', 'Scanning of nose for any diseases');
INSERT INTO Service
VALUES ('Eye Scan', 'Scanning of eye for any diseases');
INSERT INTO Service
VALUES ('Hair Scan', 'Scanning of hair for any diseases');

INSERT INTO Office
VALUES (111111, '1234 Makebelieve Rd', 'Diamon inc');

INSERT INTO OnlineLocation
VALUES (111111, 'www.Teams.com');

INSERT INTO Appointment
VALUES (111117, '2022-10-23 09:07:30', 'Appointment Hand Scan', TRUE, 111112, 311111, 'www.Teams.com', 'Lung Scan', 'Alber','Arthur','San Antonio');

INSERT INTO HasOffice
VALUES ('1234 Makebelieve Rd', 311111);

INSERT INTO ProvidesService
VALUES ('Foot Scan', 311111);
INSERT INTO ProvidesService
VALUES ('Tung Scan', 311112);
INSERT INTO ProvidesService
VALUES ('Lung Scan', 311113);
INSERT INTO ProvidesService
VALUES ('Ear Scan', 311114);
INSERT INTO ProvidesService
VALUES ('Eye Scan', 311115);
INSERT INTO ProvidesService
VALUES ('Nose Scan', 311116);
INSERT INTO ProvidesService
VALUES ('Hair Scan', 311117);

INSERT INTO Review
VALUES ('2022-10-23 09:10:30', 'AMAZING DOCTOR', 5, 111112, 311111);

INSERT INTO Bill VALUES (111117, 510, TRUE, TRUE, 311111);

SELECT * 
FROM Account

SELECT * 
FROM Patient

SELECT * 
FROM InsuranceInfo

SELECT * 
FROM BankInfo

SELECT * 
FROM CreditInfo

SELECT * 
FROM SystemUser

SELECT * 
FROM Doctor

SELECT * 
FROM Service

SELECT * 
FROM Office

SELECT * 
FROM Appointment

SELECT * 
FROM OnlineLocation

SELECT * 
FROM Bill

SELECT * 
FROM Review

SELECT P.Name
FROM Patient AS P
WHERE P.SEX = 'M'
GROUP BY Name

SELECT B.AppointmentId,B.Amount
FROM Bill AS B
WHERE B.isPaid = false
ORDER BY B.Amount

SELECT SUM(B.amount)
FROM Bill AS B
WHERE B.isVerified = true

CREATE VIEW V_PAT
AS SELECT P.ID, P.Name,P.Email
FROM Patient AS P

SELECT *
FROM V_PAT
WHERE Name = 'Bob'

CREATE VIEW V_DOC
AS SELECT D.Name, D.info, R.Rating, R.Comments
FROM Doctor D, Review R
WHERE R.D_ID = D.ID

SELECT *
FROM V_DOC

SELECT Address,Name
FROM HasOffice AS HO, Doctor AS D
WHERE HO.D_ID = D.ID

SELECT D.Name,D.website
FROM Doctor D, ProvidesService PS
WHERE D.ID = PS.D_ID AND PS.Sname = 'Foot Scan'

SELECT COUNT(*)
FROM Patient P
WHERE P.Weight > 100
