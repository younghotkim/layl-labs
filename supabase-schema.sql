-- ========================================
-- Layl Labs Blog Schema
-- Supabase SQL Editor에서 실행하세요
-- ========================================

-- 블로그 포스트
create table posts (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  summary text,
  category text default 'General',
  content text not null,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 댓글
create table comments (
  id uuid default gen_random_uuid() primary key,
  post_slug text not null references posts(slug) on delete cascade,
  nickname text not null,
  password_hash text not null,
  content text not null,
  created_at timestamptz default now()
);

-- 인덱스
create index idx_posts_slug on posts(slug);
create index idx_posts_published on posts(published, created_at desc);
create index idx_comments_post on comments(post_slug, created_at asc);

-- RLS (Row Level Security)
alter table posts enable row level security;
alter table comments enable row level security;

-- 포스트: 누구나 읽기 가능, 쓰기는 service_role만 (API Key로 보호)
create policy "Posts are publicly readable"
  on posts for select
  using (published = true);

-- 댓글: 누구나 읽기/쓰기 가능
create policy "Comments are publicly readable"
  on comments for select
  using (true);

create policy "Anyone can insert comments"
  on comments for insert
  with check (true);

create policy "Comments deletable by matching password (handled in API)"
  on comments for delete
  using (true);

-- 에이전트 활동 로그
create table activities (
  id uuid default gen_random_uuid() primary key,
  type text not null,          -- 'post_published', 'news_curated', 'site_updated', 'agent_task'
  title text not null,
  description text,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

create index idx_activities_created on activities(created_at desc);

alter table activities enable row level security;

create policy "Activities are publicly readable"
  on activities for select
  using (true);

-- updated_at 자동 갱신
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger posts_updated_at
  before update on posts
  for each row execute function update_updated_at();
