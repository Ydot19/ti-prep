CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS problems (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    tile_slug TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    mastered boolean
);

CREATE TABLE IF NOT EXISTS problem_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    problem_id UUID NOT NULL REFERENCES problems (id),
    note jsonb NOT NULL
);

CREATE TABLE IF NOT EXISTS problem_attr (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    problem_id UUID NOT NULL REFERENCES problems (id),
    classification TEXT NOT NULL
);

CREATE UNIQUE INDEX problem_attr_uidx on problem_attr (problem_id, classification);

CREATE TABLE IF NOT EXISTS company (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS problem_to_company (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    problem_id UUID REFERENCES problems (ID),
    company_id UUID REFERENCES company (id)
);