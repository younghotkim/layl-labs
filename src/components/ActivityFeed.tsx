"use client";

import { useEffect, useState, useCallback } from "react";

const ACTIVITY_LIMIT = 4;

interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  created_at: string;
}

const TYPE_CONFIG: Record<string, { color: string; label: string }> = {
  post_published: { color: "bg-emerald-400", label: "POST" },
  news_curated: { color: "bg-blue-400", label: "NEWS" },
  site_updated: { color: "bg-amber-400", label: "UPDATE" },
  agent_task: { color: "bg-violet-400", label: "TASK" },
};

function getTypeConfig(type: string) {
  return TYPE_CONFIG[type] ?? { color: "bg-zinc-400", label: type.toUpperCase() };
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "방금";
  if (mins < 60) return `${mins}분 전`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;
  return new Date(iso).toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
}

interface Props {
  onNewEvents?: (events: Activity[]) => void;
}

export default function ActivityFeed({ onNewEvents }: Props) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchActivities = useCallback(async () => {
    try {
      const res = await fetch(`/api/activities?limit=${ACTIVITY_LIMIT}`);
      if (res.ok) {
        const data = await res.json();
        setActivities((prev) => {
          if (data.length > prev.length && onNewEvents) {
            onNewEvents(data.slice(0, data.length - prev.length));
          }
          return data;
        });
        setError(false);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [onNewEvents]);

  useEffect(() => {
    fetchActivities();
    // Poll every 30 seconds
    const interval = setInterval(fetchActivities, 30000);
    return () => clearInterval(interval);
  }, [fetchActivities]);

  if (loading) {
    return (
      <div className="py-12">
        <div className="flex items-center gap-3 text-text-tertiary text-sm">
          <div className="w-2 h-2 bg-text-tertiary rounded-full animate-pulse" />
          에이전트 활동을 불러오는 중...
        </div>
      </div>
    );
  }

  if (error || activities.length === 0) {
    return (
      <div className="py-12">
        <div className="border border-border border-dashed p-8 text-center">
          <div className="text-text-tertiary text-sm mb-2">
            {error ? "활동 로그를 불러올 수 없습니다." : "아직 기록된 활동이 없습니다."}
          </div>
          <div className="text-text-tertiary text-xs">
            openclaw 에이전트가 활동을 시작하면 여기에 표시됩니다.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-[5px] top-2 bottom-2 w-px bg-border" />

      <div className="flex flex-col gap-0">
        {activities.map((activity, i) => {
          const config = getTypeConfig(activity.type);
          return (
            <div
              key={activity.id}
              className="relative pl-8 py-4 group"
              style={{
                animation: `fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s both`,
              }}
            >
              {/* Dot */}
              <div className="absolute left-0 top-[1.35rem] flex items-center justify-center">
                <div className={`w-[11px] h-[11px] rounded-full border-2 border-bg ${config.color}`} />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[0.6rem] tracking-[0.15em] font-medium text-text-tertiary uppercase">
                      {config.label}
                    </span>
                    <span className="text-[0.65rem] text-text-tertiary">
                      {timeAgo(activity.created_at)}
                    </span>
                  </div>
                  <p className="text-sm text-text-primary font-normal leading-snug">
                    {activity.title}
                  </p>
                  {activity.description && (
                    <p className="text-xs text-text-tertiary font-light mt-1 line-clamp-2">
                      {activity.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
