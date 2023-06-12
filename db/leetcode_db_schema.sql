--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.8 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: code_lang; Type: TYPE; Schema: public; Owner: coder
--

CREATE TYPE public.code_lang AS ENUM (
    'python',
    'rust',
    'golang',
    'typescript',
    'kotlin'
);


ALTER TYPE public.code_lang OWNER TO coder;

--
-- Name: topic_type; Type: TYPE; Schema: public; Owner: coder
--

CREATE TYPE public.topic_type AS ENUM (
    'algorithm',
    'concept'
);


ALTER TYPE public.topic_type OWNER TO coder;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: company; Type: TABLE; Schema: public; Owner: coder
--

CREATE TABLE public.company (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.company OWNER TO coder;

--
-- Name: problem_category; Type: TABLE; Schema: public; Owner: coder
--

CREATE TABLE public.problem_category (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    problem_id uuid NOT NULL,
    category text NOT NULL
);


ALTER TABLE public.problem_category OWNER TO coder;

--
-- Name: problem_implementations; Type: TABLE; Schema: public; Owner: coder
--

CREATE TABLE public.problem_implementations (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    problem_id uuid NOT NULL,
    lang public.code_lang,
    implementation jsonb NOT NULL
);


ALTER TABLE public.problem_implementations OWNER TO coder;

--
-- Name: problem_notes; Type: TABLE; Schema: public; Owner: coder
--

CREATE TABLE public.problem_notes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    problem_id uuid NOT NULL,
    note jsonb NOT NULL
);


ALTER TABLE public.problem_notes OWNER TO coder;

--
-- Name: problem_to_company; Type: TABLE; Schema: public; Owner: coder
--

CREATE TABLE public.problem_to_company (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    problem_id uuid,
    company_id uuid
);


ALTER TABLE public.problem_to_company OWNER TO coder;

--
-- Name: problems; Type: TABLE; Schema: public; Owner: coder
--

CREATE TABLE public.problems (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title text NOT NULL,
    title_slug text NOT NULL,
    difficulty text NOT NULL,
    mastered boolean,
    bookmarked boolean
);


ALTER TABLE public.problems OWNER TO coder;

--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: coder
--

CREATE TABLE public.schema_migrations (
    version bigint NOT NULL,
    dirty boolean NOT NULL
);


ALTER TABLE public.schema_migrations OWNER TO coder;

--
-- Name: topic; Type: TABLE; Schema: public; Owner: coder
--

CREATE TABLE public.topic (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    kind public.topic_type NOT NULL,
    name text NOT NULL,
    description text,
    topic_category text NOT NULL,
    note jsonb
);


ALTER TABLE public.topic OWNER TO coder;

--
-- Name: company company_pkey; Type: CONSTRAINT; Schema: public; Owner: coder
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);


--
-- Name: problem_category problem_category_pkey; Type: CONSTRAINT; Schema: public; Owner: coder
--

ALTER TABLE ONLY public.problem_category
    ADD CONSTRAINT problem_category_pkey PRIMARY KEY (id);


--
-- Name: problem_implementations problem_implementations_pkey; Type: CONSTRAINT; Schema: public; Owner: coder
--

ALTER TABLE ONLY public.problem_implementations
    ADD CONSTRAINT problem_implementations_pkey PRIMARY KEY (id);


--
-- Name: problem_notes problem_notes_pkey; Type: CONSTRAINT; Schema: public; Owner: coder
--

ALTER TABLE ONLY public.problem_notes
    ADD CONSTRAINT problem_notes_pkey PRIMARY KEY (id);


--
-- Name: problem_to_company problem_to_company_pkey; Type: CONSTRAINT; Schema: public; Owner: coder
--

ALTER TABLE ONLY public.problem_to_company
    ADD CONSTRAINT problem_to_company_pkey PRIMARY KEY (id);


--
-- Name: problems problems_pkey; Type: CONSTRAINT; Schema: public; Owner: coder
--

ALTER TABLE ONLY public.problems
    ADD CONSTRAINT problems_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: coder
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: topic topic_pkey; Type: CONSTRAINT; Schema: public; Owner: coder
--

ALTER TABLE ONLY public.topic
    ADD CONSTRAINT topic_pkey PRIMARY KEY (id);


--
-- Name: problem_category_index; Type: INDEX; Schema: public; Owner: coder
--

CREATE INDEX problem_category_index ON public.problem_category USING btree (category);


--
-- Name: problem_category_problem_idx; Type: INDEX; Schema: public; Owner: coder
--

CREATE INDEX problem_category_problem_idx ON public.problem_category USING btree (problem_id);


--
-- Name: problem_category_uidx; Type: INDEX; Schema: public; Owner: coder
--

CREATE UNIQUE INDEX problem_category_uidx ON public.problem_category USING btree (problem_id, category);


--
-- Name: problem_notes_pidx; Type: INDEX; Schema: public; Owner: coder
--

CREATE INDEX problem_notes_pidx ON public.problem_notes USING btree (problem_id);


--
-- Name: problem_category problem_category_problem_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coder
--

ALTER TABLE ONLY public.problem_category
    ADD CONSTRAINT problem_category_problem_id_fkey FOREIGN KEY (problem_id) REFERENCES public.problems(id);


--
-- Name: problem_implementations problem_implementations_problem_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coder
--

ALTER TABLE ONLY public.problem_implementations
    ADD CONSTRAINT problem_implementations_problem_id_fkey FOREIGN KEY (problem_id) REFERENCES public.problems(id);


--
-- Name: problem_notes problem_notes_problem_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coder
--

ALTER TABLE ONLY public.problem_notes
    ADD CONSTRAINT problem_notes_problem_id_fkey FOREIGN KEY (problem_id) REFERENCES public.problems(id);


--
-- Name: problem_to_company problem_to_company_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coder
--

ALTER TABLE ONLY public.problem_to_company
    ADD CONSTRAINT problem_to_company_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.company(id);


--
-- Name: problem_to_company problem_to_company_problem_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coder
--

ALTER TABLE ONLY public.problem_to_company
    ADD CONSTRAINT problem_to_company_problem_id_fkey FOREIGN KEY (problem_id) REFERENCES public.problems(id);


--
-- PostgreSQL database dump complete
--

