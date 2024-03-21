CREATE TABLE "donation_records" (
	"id"			INTEGER PRIMARY KEY,
	"fk_personId"	INTEGER NOT NULL, --foreign key
	"amount"		REAL DEFAULT 0 NOT NULL,
	"date"			TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,

	"isDeleted"		INTEGER DEFAULT 0 NOT NULL,
	"createdAt" 	TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deletedAt" 	TEXT DEFAULT '' NOT NULL,
	FOREIGN KEY("fk_personId") REFERENCES person("id")
);