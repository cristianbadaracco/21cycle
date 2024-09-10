-- Enable the uuid-ossp extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop tables if they exist
DROP TABLE IF EXISTS behavior_instance CASCADE;
DROP TABLE IF EXISTS behavior CASCADE;
DROP TABLE IF EXISTS cycle CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

-- Create tables with UUID primary keys
CREATE TABLE "user" (
    id uuid primary key default uuid_generate_v4(),
    name text NOT NULL,
    email text
);

CREATE TABLE cycle (
    id uuid primary key default uuid_generate_v4(),
    start_date date NOT NULL,
    end_date date NOT NULL,
    user_id uuid NOT NULL REFERENCES "user"(id),
    name text
);

CREATE TABLE behavior (
    id uuid primary key default uuid_generate_v4(),
    name text NOT NULL
);

CREATE TABLE behavior_instance (
    id uuid primary key default uuid_generate_v4(),
    date date NOT NULL,
    behavior_id uuid NOT NULL,
    cycle_id uuid NOT NULL,
    note text
);

-- Insert sample data
INSERT INTO "user" (name, email) VALUES ('Rocio', 'rocio@example.com');

INSERT INTO behavior (name) VALUES ('good'), ('bad');

INSERT INTO cycle (start_date, end_date, user_id, name) 
VALUES ('2023-09-01', '2023-09-22', (SELECT id FROM "user" WHERE name = 'Rocio'), 'Periodo 1');

INSERT INTO behavior_instance (date, behavior_id, cycle_id, note) 
VALUES 
('2023-09-02', (SELECT id FROM behavior ORDER BY random() LIMIT 1), (SELECT id FROM cycle WHERE name = 'Periodo 1'), 'Note 1'),
('2023-09-05', (SELECT id FROM behavior ORDER BY random() LIMIT 1), (SELECT id FROM cycle WHERE name = 'Periodo 1'), 'Note 2'),
('2023-09-10', (SELECT id FROM behavior ORDER BY random() LIMIT 1), (SELECT id FROM cycle WHERE name = 'Periodo 1'), 'Note 3'),
('2023-09-15', (SELECT id FROM behavior ORDER BY random() LIMIT 1), (SELECT id FROM cycle WHERE name = 'Periodo 1'), 'Note 4'),
('2023-09-20', (SELECT id FROM behavior ORDER BY random() LIMIT 1), (SELECT id FROM cycle WHERE name = 'Periodo 1'), 'Note 5');