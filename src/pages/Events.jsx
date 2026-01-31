import { useEffect, useState } from "react";
import { getEvents } from "../services/api";
import { Link } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <h1 className="text-4xl font-semibold text-slate-900">
          Discover Events
        </h1>
        <p className="mt-2 text-slate-600 max-w-xl">
          Explore meetups, workshops, and community events happening around you.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        {loading ? (
          <p className="text-slate-500">Loading events…</p>
        ) : events.length === 0 ? (
          <div className="mt-12 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-slate-600">
              No events yet. New experiences will appear here soon ✨
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="rounded-xl border border-slate-200 bg-white p-6 transition hover:border-indigo-300"
              >
                {/* Date */}
                <div className="mb-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {new Date(event.date).toDateString()}
                </div>

                {/* Title */}
                <h2 className="text-lg font-semibold text-slate-900">
                  {event.title}
                </h2>

                {/* Description */}
                <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                  {event.description}
                </p>

                {/* Creator */}
                <p className="mt-3 text-xs text-slate-500">
                  👤 Created by{" "}
                  <span className="font-medium">
                    {event.user?.name}
                  </span>
                </p>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    📍 {event.location}
                  </span>

                  <Link
                    to={`/events/${event._id}`}
                    className="text-sm font-medium text-indigo-600 hover:underline"
                  >
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
