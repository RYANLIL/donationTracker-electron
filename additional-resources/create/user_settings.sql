CREATE TABLE "user_settings" (
	"id"			    INTEGER PRIMARY KEY,
	"backupLocation"    TEXT DEFAULT '' NOT NULL,
    "lastBack"          TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "backupIntervalHr"  TEXT DEFAULT '6' NOT NULL,
	"lastUpdated" 	    TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
);