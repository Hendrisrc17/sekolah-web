import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../../services/api.js';
import { downloadCsv } from '../../utils/export.js';

function SubjectResultsPage() {
  const { subject } = useParams();
  const [items, setItems] = useState(null);
  useEffect(() => { api(`/admin/submissions?subject=${encodeURIComponent(subject)}`).then(setItems).catch((error) => toast.error(error.message)); }, [subject]);
  const rows = (items || []).map((item) => ({
    Nama: item.studentName,
    Kelas: item.studentClass,
    MataPelajaran: item.subject || subject,
    Kuis: item.quizTitle,
    Nilai: item.totalScore ?? 0,
    Persentase: `${item.percentage ?? 0}%`,
    Benar: item.correctCount ?? 0,
    Salah: item.wrongCount ?? 0,
    Kosong: item.unansweredCount ?? 0,
  }));
  const fileSubject = String(subject).replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'mata-pelajaran';
  return <main className="container"><section className="hero"><span className="pill">Mata pelajaran</span><h1>Hasil {subject}</h1><p className="muted">Rekap hanya untuk kuis mata pelajaran {subject}.</p><div className="toolbar"><Link className="btn secondary" to="/admin/subjects">Kembali ke mata pelajaran</Link><button className="btn" type="button" disabled={!items?.length} onClick={() => downloadCsv(rows, `hasil-${fileSubject}.csv`)}>Download CSV</button></div></section>{items && !items.length ? <div className="empty">Belum ada hasil untuk mata pelajaran ini.</div> : <div className="cards">{items?.map((item) => <article className="card" key={item.id}><span className="pill">{item.subject || subject}</span><h2>{item.studentName}</h2><p className="muted">{item.studentClass} · {item.quizTitle}</p><div className="meta"><span>Nilai {item.totalScore ?? 0}</span><span>{item.percentage ?? 0}%</span><span>{item.correctCount ?? 0} benar</span><span>{item.wrongCount ?? 0} salah</span></div></article>)}</div>}</main>;
}

export default SubjectResultsPage;
