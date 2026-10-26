import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../../services/api.js';

function SubjectListPage() {
  const [subjects, setSubjects] = useState(null);
  useEffect(() => { api('/admin/dashboard').then((data) => setSubjects(data.subjects || [])).catch((error) => toast.error(error.message)); }, []);
  return <main className="container"><section className="hero"><span className="pill">Rekap guru</span><h1>Hasil berdasarkan mata pelajaran</h1><p className="muted">Pilih mata pelajaran untuk melihat hasil siswa yang terpisah.</p></section>{subjects && !subjects.length ? <div className="empty">Belum ada mata pelajaran atau kuis.</div> : <div className="cards">{subjects?.map((item) => <article className="card" key={item.subject}><span className="pill">{item.subject}</span><h2>{item.subject}</h2><p className="muted">{item.totalQuizzes} kuis · {item.totalQuestions} soal</p><Link className="btn" to={`/admin/subjects/${encodeURIComponent(item.subject)}`}>Lihat hasil {item.subject}</Link></article>)}</div>}</main>;
}

export default SubjectListPage;
