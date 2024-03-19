CREATE TABLE "person" (
	"id"		INTEGER PRIMARY KEY,
	"firstName"	TEXT DEFAULT '' NOT NULL,
	"lastName"	TEXT DEFAULT '' NOT NULL,
	"phone1"	TEXT DEFAULT '' NOT NULL,
	"phone2"	TEXT DEFAULT '' NOT NULL,

	"isDeleted"	INTEGER DEFAULT 0 NOT NULL,
	"createdAt" TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deletedAt" TEXT DEFAULT '' NOT NULL,	
);

CREATE TABLE "address" (
    "id"			INTEGER PRIMARY KEY,
    "fk_personId" 	INTEGER DEFAULT 0 REFERENCES Person(ID)NOT NULL 
    "address1"		TEXT DEFAULT '' NOT NULL,
	"address2"		TEXT DEFAULT '' NOT NULL,
	"address3"		TEXT DEFAULT '' NOT NULL,
	"city"			TEXT DEFAULT '' NOT NULL,
	"province"		TEXT DEFAULT '' NOT NULL,
	"country"		TEXT DEFAULT '' NOT NULL,
	"postalCode"	TEXT DEFAULT '' NOT NULL,

    "isDeleted"		INTEGER DEFAULT 0 NOT NULL,
	"createdAt" 	TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deletedAt" 	TEXT DEFAULT '' NOT NULL,
);

CREATE TABLE "donation_records" (
	"id"			INTEGER PRIMARY KEY,
	"fk_PersonId"	INTEGER DEFAULT 0 REFERENCES Person(ID) NOT NULL, --foreign key
	"amount"		REAL DEFAULT 0 NOT NULL,
	"date"			TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL

	"isDeleted"		INTEGER DEFAULT 0 NOT NULL,
	"createdAt" 	TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deletedAt" 	TEXT DEFAULT '' NOT NULL,
);


CREATE TABLE "receipt_records" (
    "id"			INTEGER PRIMARY KEY,
    "fk_PersonId" 	INTEGER DEFAULT 0 REFERENCES Person(ID)NOT NULL,
    "amount" 		REAL DEFAULT 0 NOT NULL ,
    "datePrinted"	TEXT DEFAULT '' NOT NULL,
    "isPrinted" 	INTEGER DEFAULT 0 NOT NULL,

	"isDeleted"		INTEGER DEFAULT 0 NOT NULL,
	"createdAt" 	TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deletedAt" 	TEXT DEFAULT '' NOT NULL,
);