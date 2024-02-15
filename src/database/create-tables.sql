-- cria tabela Users se ela nao existir

CREATE TABLE IF NOT EXISTS Users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255),
    username VARCHAR(50),
    document VARCHAR(50) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

-- Cria tabela bookings se ela nao existir
CREATE TABLE IF NOT EXISTS Bookings (
    id VARCHAR(36) PRIMARY KEY,
    room_id VARCHAR(255),
    guest_name VARCHAR(255),
    document VARCHAR(50),
    phone_number VARCHAR(25),
    check_in_date DATE,
    check_out_date DATE,
    user_id VARCHAR(36),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);