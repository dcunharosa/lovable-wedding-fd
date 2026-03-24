import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, UserCheck, UserX, Send, Pencil, Trash2, Download, ArrowUpDown } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Guest {
  timestamp: string;
  name: string;
  email: string;
  attending: string;
  guests: string | number;
  dietary: string;
  message: string;
  _row: number;
}

type SortKey = "name" | "email" | "attending" | "guests" | "timestamp";

// ---------------------------------------------------------------------------
// API helpers
// ---------------------------------------------------------------------------
function getPassword() {
  return sessionStorage.getItem("admin_pw") || "";
}

async function apiFetch<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...opts,
    headers: {
      ...opts?.headers,
      Authorization: getPassword(),
      "Content-Type": "application/json",
    },
  });
  if (res.status === 401) {
    sessionStorage.removeItem("admin_pw");
    window.location.reload();
    throw new Error("Unauthorized");
  }
  return res.json();
}

// ---------------------------------------------------------------------------
// Password gate
// ---------------------------------------------------------------------------
function LoginScreen({ onLogin }: { onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(40,30%,95%)]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin(pw);
        }}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <h1 className="font-display text-3xl text-[hsl(220,30%,30%)] text-center">
          Admin
        </h1>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
          className="px-4 py-3 border border-[hsl(220,30%,80%)] rounded-sm bg-white text-[hsl(220,30%,20%)] font-body text-sm focus:outline-none focus:border-[hsl(220,30%,50%)]"
          autoFocus
        />
        <button
          type="submit"
          className="px-4 py-3 bg-[hsl(220,30%,30%)] text-white font-body text-sm tracking-widest uppercase rounded-sm hover:bg-[hsl(220,30%,25%)] transition-colors"
        >
          Log in
        </button>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stats cards
// ---------------------------------------------------------------------------
function StatsCards({ guests }: { guests: Guest[] }) {
  const confirmed = guests.filter((g) => g.attending === "yes");
  const declined = guests.filter((g) => g.attending === "no");
  const headcount = confirmed.reduce(
    (sum, g) => sum + (Number(g.guests) || 1),
    0,
  );

  const cards = [
    { label: "Confirmed", value: confirmed.length, icon: UserCheck, color: "hsl(150,40%,45%)" },
    { label: "Declined", value: declined.length, icon: UserX, color: "hsl(0,50%,55%)" },
    { label: "Total Headcount", value: headcount, icon: Users, color: "hsl(220,50%,55%)" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {cards.map((c) => (
        <div
          key={c.label}
          className="bg-white rounded-md p-5 shadow-sm flex items-center gap-4"
        >
          <c.icon size={28} style={{ color: c.color }} />
          <div>
            <p className="text-2xl font-display font-semibold text-[hsl(220,30%,20%)]">
              {c.value}
            </p>
            <p className="text-xs font-body uppercase tracking-widest text-[hsl(220,20%,55%)]">
              {c.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Edit modal
// ---------------------------------------------------------------------------
function EditModal({
  guest,
  open,
  onClose,
  onSave,
}: {
  guest: Guest | null;
  open: boolean;
  onClose: () => void;
  onSave: (g: Guest) => void;
}) {
  const [form, setForm] = useState<Guest | null>(null);

  useEffect(() => {
    setForm(guest ? { ...guest } : null);
  }, [guest]);

  if (!form) return null;

  const fieldClass =
    "w-full px-3 py-2 border border-[hsl(220,30%,80%)] rounded-sm bg-white text-[hsl(220,30%,20%)] font-body text-sm focus:outline-none focus:border-[hsl(220,30%,50%)]";
  const labelClass = "font-body text-xs uppercase tracking-widest text-[hsl(220,20%,55%)] mb-1 block";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-[hsl(40,30%,97%)] text-[hsl(220,30%,20%)] max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Edit Guest</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="space-y-4 mt-2"
        >
          <div>
            <label className={labelClass}>Name</label>
            <input className={fieldClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input className={fieldClass} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Attending</label>
            <select className={fieldClass} value={form.attending} onChange={(e) => setForm({ ...form, attending: e.target.value })}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Guests</label>
            <input className={fieldClass} type="number" min={1} max={10} value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Dietary</label>
            <input className={fieldClass} value={form.dietary} onChange={(e) => setForm({ ...form, dietary: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Message</label>
            <textarea className={`${fieldClass} min-h-[60px] resize-none`} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[hsl(220,30%,30%)] text-white font-body text-sm tracking-widest uppercase rounded-sm hover:bg-[hsl(220,30%,25%)] transition-colors"
          >
            Save
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Email composer
// ---------------------------------------------------------------------------
function EmailComposer({ guests }: { guests: Guest[] }) {
  const [audience, setAudience] = useState<"confirmed" | "declined" | "all">("confirmed");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  const recipients = useMemo(() => {
    if (audience === "confirmed") return guests.filter((g) => g.attending === "yes");
    if (audience === "declined") return guests.filter((g) => g.attending === "no");
    return guests;
  }, [guests, audience]);

  const handleSend = async () => {
    if (!subject || !body) {
      toast.error("Please fill in subject and body.");
      return;
    }
    if (!recipients.length) {
      toast.error("No recipients in this audience.");
      return;
    }

    setSending(true);
    try {
      const data = await apiFetch<{ sent?: number; total?: number }>("/api/email-send", {
        method: "POST",
        body: JSON.stringify({
          recipients: recipients.map((g) => g.email),
          subject,
          body,
        }),
      });
      toast.success(`Email sent to ${data.sent}/${data.total} recipients.`);
      setSubject("");
      setBody("");
    } catch {
      toast.error("Failed to send emails.");
    } finally {
      setSending(false);
    }
  };

  const fieldClass =
    "w-full px-3 py-2 border border-[hsl(220,30%,80%)] rounded-sm bg-white text-[hsl(220,30%,20%)] font-body text-sm focus:outline-none focus:border-[hsl(220,30%,50%)]";
  const labelClass = "font-body text-xs uppercase tracking-widest text-[hsl(220,20%,55%)] mb-1 block";

  return (
    <div className="bg-white rounded-md p-6 shadow-sm">
      <h2 className="font-display text-xl text-[hsl(220,30%,20%)] mb-4 flex items-center gap-2">
        <Send size={18} /> Send Email
      </h2>
      <div className="space-y-4">
        <div>
          <label className={labelClass}>
            To ({recipients.length} recipient{recipients.length !== 1 ? "s" : ""})
          </label>
          <select className={fieldClass} value={audience} onChange={(e) => setAudience(e.target.value as typeof audience)}>
            <option value="confirmed">All Confirmed</option>
            <option value="declined">All Declined</option>
            <option value="all">Everyone</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Subject</label>
          <input className={fieldClass} value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. RSVP Reminder" />
        </div>
        <div>
          <label className={labelClass}>Body</label>
          <textarea
            className={`${fieldClass} min-h-[120px]`}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your message..."
          />
        </div>
        <button
          onClick={handleSend}
          disabled={sending}
          className="px-6 py-2 bg-[hsl(220,30%,30%)] text-white font-body text-sm tracking-widest uppercase rounded-sm hover:bg-[hsl(220,30%,25%)] transition-colors disabled:opacity-60"
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Guest table
// ---------------------------------------------------------------------------
function GuestTable({
  guests,
  onEdit,
  onDelete,
}: {
  guests: Guest[];
  onEdit: (g: Guest) => void;
  onDelete: (g: Guest) => void;
}) {
  const [filter, setFilter] = useState<"all" | "yes" | "no">("all");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("timestamp");
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = useMemo(() => {
    let list = guests;
    if (filter !== "all") list = list.filter((g) => g.attending === filter);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.email.toLowerCase().includes(q),
      );
    }
    list = [...list].sort((a, b) => {
      const av = String(a[sortKey]).toLowerCase();
      const bv = String(b[sortKey]).toLowerCase();
      return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    return list;
  }, [guests, filter, search, sortKey, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const thClass =
    "font-body text-xs uppercase tracking-widest text-[hsl(220,20%,55%)] cursor-pointer select-none hover:text-[hsl(220,30%,30%)]";
  const fieldClass =
    "px-3 py-2 border border-[hsl(220,30%,80%)] rounded-sm bg-white text-[hsl(220,30%,20%)] font-body text-sm focus:outline-none focus:border-[hsl(220,30%,50%)]";

  return (
    <div className="bg-white rounded-md shadow-sm mb-8 overflow-hidden">
      <div className="p-4 flex flex-wrap gap-3 border-b border-[hsl(220,30%,90%)]">
        <select
          className={fieldClass}
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
        >
          <option value="all">All</option>
          <option value="yes">Confirmed</option>
          <option value="no">Declined</option>
        </select>
        <input
          className={`${fieldClass} flex-1 min-w-[180px]`}
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-[hsl(40,30%,96%)]">
            <TableHead className={thClass} onClick={() => toggleSort("name")}>
              <span className="inline-flex items-center gap-1">Name <ArrowUpDown size={12} /></span>
            </TableHead>
            <TableHead className={thClass} onClick={() => toggleSort("email")}>
              <span className="inline-flex items-center gap-1">Email <ArrowUpDown size={12} /></span>
            </TableHead>
            <TableHead className={thClass} onClick={() => toggleSort("attending")}>
              <span className="inline-flex items-center gap-1">Status <ArrowUpDown size={12} /></span>
            </TableHead>
            <TableHead className={thClass} onClick={() => toggleSort("guests")}>
              <span className="inline-flex items-center gap-1">Guests <ArrowUpDown size={12} /></span>
            </TableHead>
            <TableHead className={`${thClass} hidden md:table-cell`}>Dietary</TableHead>
            <TableHead className={`${thClass} hidden lg:table-cell`} onClick={() => toggleSort("timestamp")}>
              <span className="inline-flex items-center gap-1">Date <ArrowUpDown size={12} /></span>
            </TableHead>
            <TableHead className={thClass} />
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((g) => (
            <TableRow key={g._row} className="hover:bg-[hsl(40,30%,97%)] text-[hsl(220,30%,20%)]">
              <TableCell className="font-body text-sm">{g.name}</TableCell>
              <TableCell className="font-body text-sm">{g.email}</TableCell>
              <TableCell>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-body uppercase tracking-wider ${
                    g.attending === "yes"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {g.attending === "yes" ? "Confirmed" : "Declined"}
                </span>
              </TableCell>
              <TableCell className="font-body text-sm text-center">
                {g.attending === "yes" ? g.guests || 1 : "—"}
              </TableCell>
              <TableCell className="font-body text-sm hidden md:table-cell">
                {g.dietary || "—"}
              </TableCell>
              <TableCell className="font-body text-sm hidden lg:table-cell text-[hsl(220,20%,60%)]">
                {g.timestamp
                  ? new Date(g.timestamp).toLocaleDateString()
                  : "—"}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEdit(g)}
                    className="p-1.5 rounded hover:bg-[hsl(220,30%,92%)] transition-colors"
                    title="Edit guest"
                  >
                    <Pencil size={14} className="text-[hsl(220,30%,45%)]" />
                  </button>
                  <button
                    onClick={() => onDelete(g)}
                    className="p-1.5 rounded hover:bg-red-100 transition-colors"
                    title="Delete guest"
                  >
                    <Trash2 size={14} className="text-red-400 hover:text-red-600" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {!filtered.length && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-[hsl(220,20%,60%)] font-body text-sm">
                No guests found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Admin page
// ---------------------------------------------------------------------------
const Admin = () => {
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("admin_pw"));
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Guest | null>(null);

  const loadGuests = async () => {
    setLoading(true);
    try {
      const data = await apiFetch<{ guests: Guest[] }>("/api/guests");
      setGuests(data.guests || []);
    } catch {
      toast.error("Failed to load guests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) loadGuests();
  }, [authed]);

  const handleLogin = (pw: string) => {
    sessionStorage.setItem("admin_pw", pw);
    setAuthed(true);
  };

  const handleDelete = async (g: Guest) => {
    if (!window.confirm(`Delete ${g.name}?`)) return;
    try {
      await apiFetch("/api/guests-delete", {
        method: "POST",
        body: JSON.stringify({ row: g._row }),
      });
      toast.success("Guest deleted.");
      loadGuests();
    } catch {
      toast.error("Failed to delete guest.");
    }
  };

  const exportCsv = () => {
    const headers = ["Name", "Email", "Attending", "Guests", "Dietary", "Message", "Date"];
    const rows = guests.map((g) => [
      g.name,
      g.email,
      g.attending,
      String(g.guests || ""),
      g.dietary,
      g.message,
      g.timestamp ? new Date(g.timestamp).toLocaleDateString() : "",
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rsvp-guests-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = async (g: Guest) => {
    try {
      await apiFetch("/api/guests-update", {
        method: "POST",
        body: JSON.stringify({
          row: g._row,
          name: g.name,
          email: g.email,
          attending: g.attending,
          guests: g.guests,
          dietary: g.dietary,
          message: g.message,
        }),
      });
      toast.success("Guest updated.");
      setEditing(null);
      loadGuests();
    } catch {
      toast.error("Failed to update guest.");
    }
  };

  if (!authed) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-[hsl(40,30%,95%)]">
      <header className="bg-white border-b border-[hsl(220,30%,90%)] px-6 py-4 flex items-center justify-between">
        <h1 className="font-display text-2xl text-[hsl(220,30%,20%)]">
          Guest Management
        </h1>
        <div className="flex items-center gap-4">
          {guests.length > 0 && (
            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-1.5 font-body text-xs uppercase tracking-widest text-[hsl(220,20%,55%)] hover:text-[hsl(220,30%,30%)] transition-colors"
            >
              <Download size={14} />
              Export CSV
            </button>
          )}
          <button
            onClick={() => {
              sessionStorage.removeItem("admin_pw");
              setAuthed(false);
            }}
            className="font-body text-xs uppercase tracking-widest text-[hsl(220,20%,55%)] hover:text-[hsl(220,30%,30%)] transition-colors"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading && !guests.length ? (
          <p className="text-center font-body text-[hsl(220,20%,55%)] py-20">
            Loading...
          </p>
        ) : (
          <>
            <StatsCards guests={guests} />
            <GuestTable guests={guests} onEdit={setEditing} onDelete={handleDelete} />
            <EmailComposer guests={guests} />
          </>
        )}
      </main>

      <EditModal
        guest={editing}
        open={!!editing}
        onClose={() => setEditing(null)}
        onSave={handleSave}
      />
    </div>
  );
};

export default Admin;
