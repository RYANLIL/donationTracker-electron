CREATE TABLE "address" (
	"id"			INTEGER PRIMARY KEY,
	"fk_personId" 	INTEGER NOT NULL,
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
	FOREIGN KEY("fk_personId") REFERENCES person("id")
);