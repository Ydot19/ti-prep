CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS problems (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    title_slug TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    mastered boolean,
    bookmarked boolean
);

CREATE TABLE IF NOT EXISTS problem_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    problem_id UUID NOT NULL REFERENCES problems (id),
    note jsonb NOT NULL
);

CREATE INDEX problem_notes_pidx on problem_notes(problem_id);

CREATE TYPE code_lang AS ENUM ('python', 'rust', 'golang', 'typescript', 'kotlin');

CREATE TABLE IF NOT EXISTS problem_implementations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    problem_id UUID NOT NULL REFERENCES problems (id),
    lang code_lang,
    implementation jsonb NOT NULL
);

CREATE TABLE IF NOT EXISTS problem_category (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    problem_id UUID NOT NULL REFERENCES problems (id),
    category TEXT NOT NULL
);

CREATE UNIQUE INDEX problem_category_uidx on problem_category (problem_id, category);
CREATE INDEX problem_category_index on problem_category (category);
CREATE INDEX problem_category_problem_idx on problem_category(problem_id);

CREATE TABLE IF NOT EXISTS company (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS problem_to_company (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    problem_id UUID REFERENCES problems (ID),
    company_id UUID REFERENCES company (id)
);
CREATE TYPE topic_type AS ENUM ('algorithm', 'concept');

CREATE TABLE IF NOT EXISTS topic (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kind topic_type NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    topic_category TEXT NOT NULL,
    note jsonb
);

