CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS problems (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    title_slug TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    mastered boolean
);

CREATE TABLE IF NOT EXISTS problem_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    problem_id UUID NOT NULL REFERENCES problems (id),
    note jsonb NOT NULL
);

CREATE INDEX problem_notes_pidx on problem_notes(problem_id);

CREATE TYPE code_lang AS ENUM ('python', 'rust', 'golang');

CREATE TABLE IF NOT EXISTS problem_implementations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    problem_id UUID NOT NULL REFERENCES problems (id),
    lang code_lang,
    implementation jsonb NOT NULL
);

CREATE TABLE IF NOT EXISTS problem_attr (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    problem_id UUID NOT NULL REFERENCES problems (id),
    classification TEXT NOT NULL
);

CREATE UNIQUE INDEX problem_attr_uidx on problem_attr (problem_id, classification);
CREATE INDEX problem_attr_index on problem_attr (classification);
CREATE INDEX problem_attr_problem_idx on problem_attr(problem_id);

CREATE TABLE IF NOT EXISTS company (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS problem_to_company (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    problem_id UUID REFERENCES problems (ID),
    company_id UUID REFERENCES company (id)
);

