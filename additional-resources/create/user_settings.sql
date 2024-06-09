CREATE TABLE "user_settings" (
	"id"			    INTEGER PRIMARY KEY,
	"backupLocation"    TEXT DEFAULT '' NOT NULL,
    "lastBackUp"          TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "numOfBackUpsToKeep"INTEGER DEFAULT 10 NOT NULL,
	"lastUpdated" 	    TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
);