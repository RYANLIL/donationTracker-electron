CREATE TABLE "receipt_records" (
	"id"			INTEGER PRIMARY KEY,
	"fk_personId" 	INTEGER NOT NULL,
	"amount" 		REAL DEFAULT 0 NOT NULL ,
	"datePrinted"	TEXT DEFAULT '' NOT NULL,
	"isPrinted" 	INTEGER DEFAULT 0 NOT NULL,

	"isDeleted"		INTEGER DEFAULT 0 NOT NULL,
	"createdAt" 	TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deletedAt" 	TEXT DEFAULT '' NOT NULL,
	FOREIGN KEY("fk_personId") REFERENCES person("id")
);