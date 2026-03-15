import React from 'react'
import { MessageSquareDashed } from 'lucide-react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector } from 'react-redux'
import useGetRealMsgs from '../hooks/useGetRealMsgs'

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Returns "YYYY-MM-DD" string for a given Date, in local timezone. */
const toDateKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

/** Returns "Today", "Yesterday", or a long-form date string like "Month DD, YYYY". */
const formatDateLabel = (date) => {
  const today     = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (toDateKey(date) === toDateKey(today))     return 'Today';
  if (toDateKey(date) === toDateKey(yesterday)) return 'Yesterday';

  return date.toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  });
};

// ─── DateSeparator ────────────────────────────────────────────────────────────

const DateSeparator = ({ label }) => (
  <div className="flex items-center gap-3 my-4 px-2 select-none">
    {/* left line */}
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-white/10" />

    {/* pill */}
    <span className="shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide
                     text-slate-400 bg-white/5 border border-white/10
                     backdrop-blur-sm shadow-sm">
      {label}
    </span>

    {/* right line */}
    <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/10 to-white/10" />
  </div>
);

// ─── EmptyChat ───────────────────────────────────────────────────────────────

const EmptyChat = ({ username }) => (
  <div className="relative z-10 h-full w-full flex flex-col items-center justify-center gap-5 p-8 text-center select-none">
    {/* Watermark icon */}
    <div className="relative flex items-center justify-center">
      <div className="absolute w-40 h-40 rounded-full bg-indigo-500/5 blur-3xl" />
      <div className="relative p-7 rounded-full bg-white/[0.03] border border-white/10">
        <MessageSquareDashed strokeWidth={1} size={80} className="text-white opacity-10" />
      </div>
    </div>

    {/* Copy */}
    <div className="space-y-2">
      <h2 className="text-xl font-bold text-white tracking-tight">
        Start a new journey.
      </h2>
      <p className="text-slate-500 text-sm max-w-[240px] leading-relaxed">
        No messages here yet... Send a wave to{' '}
        <span className="text-indigo-400 font-medium">@{username}</span>!
      </p>
    </div>
  </div>
);

// ─── Messages ─────────────────────────────────────────────────────────────────

const Messages = () => {
  useGetMessages();
  useGetRealMsgs();
  const { messages }     = useSelector(store => store.message);
  const { selectedUser } = useSelector(store => store.user);

  // No messages yet (null, undefined, or empty array) → show empty state
  if (!Array.isArray(messages) || messages.length === 0) {
    const username = selectedUser?.username ?? selectedUser?.fullName ?? 'them';
    return <EmptyChat username={username} />;
  }

  let lastDateKey = null;

  return (
    <div className="px-4 py-3 flex-1 overflow-auto min-h-0">
      {messages.map((message) => {
        const msgDate   = new Date(message.createdAt);
        const dateKey   = toDateKey(msgDate);
        const showSep   = dateKey !== lastDateKey;   // first msg OR day changed
        lastDateKey     = dateKey;

        return (
          <React.Fragment key={message._id}>
            {showSep && <DateSeparator label={formatDateLabel(msgDate)} />}
            <Message message={message} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Messages