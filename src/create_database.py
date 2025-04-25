import sqlite3


def create_database(db_name="database/matches.db"):
    connection = sqlite3.connect(db_name)
    cursor = connection.cursor()

    # Tabelle: Matches
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS Matches (
            MatchID     INTEGER PRIMARY KEY,
            ServerType  TEXT NOT NULL,
            MatchType   TEXT NOT NULL,
            Gamemode    TEXT NOT NULL,
            Map         TEXT NOT NULL,
            Timestamp   TEXT DEFAULT (datetime('now'))
        );
    """)

    # Tabelle: KOTHData
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS KOTHData (
            MatchID     INTEGER PRIMARY KEY,
            TeamBluTime   TEXT NOT NULL,  
            TeamRedTime   TEXT NOT NULL,
            FOREIGN KEY(MatchID) REFERENCES Matches(MatchID)
        );
    """)

    # Tabelle: MapSegments (für andere Gamemodes)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS MapSegments (
            SegmentID       INTEGER PRIMARY KEY AUTOINCREMENT,
            MatchID         INTEGER NOT NULL,
            SegmentIndex    INTEGER NOT NULL,
            Time            TEXT,
            Reached         BOOLEAN NOT NULL,
            FOREIGN KEY(MatchID) REFERENCES Matches(MatchID)
        );
    """)

    connection.commit()
    connection.close()
    print(f"Database '{db_name}' created with required tables.")


def insert_koth_match(data, db_name="database/matches.db"):
    with sqlite3.connect(db_name) as conn:
        cursor = conn.cursor()

        # Insert data into matches
        cursor.execute("""
            INSERT INTO Matches (ServerType, MatchType, Gamemode, Map)
            VALUES (?, ?, ?, ?)
        """, (data['serverType'], data['casualOrComp'], data['gamemode'], data['map']))
        match_id = cursor.lastrowid

        # Insert into KOTH data
        cursor.execute("""
            INSERT INTO KOTHData (MatchID, TeamBluTime, TeamRedTime)
            VALUES (?, ?, ?)
        """, (match_id, data['remainingTimeBluKoth'], data['remainingTimeRedKoth']))

        conn.commit()
        print(f"Koth match inserted with MatchID {match_id}")


def insert_other_match(data, db_name="database/matches.db"):
    with sqlite3.connect(db_name) as conn:
        cursor = conn.cursor()

        # Insert into Matches
        cursor.execute("""
            INSERT INTO Matches (ServerType, MatchType, Gamemode, Map)
            VALUES (?, ?, ?, ?)
        """, (data['serverType'], data['casualOrComp'], data['gamemode'], data['map']))
        match_id = cursor.lastrowid

        for i, (time, held) in enumerate(zip(data['timeRemaining'], data['redHeld'])):
            if time == '':
                time = None

            cursor.execute("""
                INSERT INTO MapSegments (MatchID, SegmentIndex, Time, Reached)
                VALUES (?, ?, ?, ?)
            """, (match_id, i, time, held))

        conn.commit()
        print(f"Non-KOTH match inserted with MatchID {match_id}")
