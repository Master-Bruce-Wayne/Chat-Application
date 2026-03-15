import React from 'react'
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

// ─── Messages ─────────────────────────────────────────────────────────────────

const Messages = () => {
  useGetMessages();
  useGetRealMsgs();
  const { messages } = useSelector(store => store.message);
  if (!messages) return null;

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