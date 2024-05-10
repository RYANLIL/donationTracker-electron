CREATE TABLE "user_settings" (
	"id"			    INTEGER PRIMARY KEY,
	"backupLocation"    TEXT DEFAULT '' NOT NULL,
    "lastBack"          TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "numOfBackUpsToKeep"INTEGER DEFAULT 20 NOT NULL,
	"lastUpdated" 	    TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
);