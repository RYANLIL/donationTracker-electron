CREATE TABLE "donation_records" (
	"id"			INTEGER PRIMARY KEY,
	"fk_PersonId"	INTEGER DEFAULT 0 REFERENCES Person(ID) NOT NULL, --foreign key
	"amount"		REAL DEFAULT 0 NOT NULL,
	"date"			TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL

	"isDeleted"		INTEGER DEFAULT 0 NOT NULL,
	"createdAt" 	TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deletedAt" 	TEXT DEFAULT '' NOT NULL,
);