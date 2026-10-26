import { db, admin } from '../config/firebaseAdmin.js';
export function quizStatus(quiz, now = new Date()) { const open = quiz.openAt?.toDate?.() || new Date(quiz.openAt); const close = quiz.closeAt?.toDate?.() || new Date(quiz.closeAt); return now < open ? 'upcoming' : now < close ? 'open' : 'closed'; }
export async function publicQuizzes() { const snap = await db().collection('quizzes').where('isPublished', '==', true).get(); return snap.docs.map((doc) => ({ id: doc.id, ...doc.data(), status: quizStatus(doc.data()) })); }
export async function loadQuestions(quizId) { const snap = await db().collection('quizzes').doc(quizId).collection('questions').orderBy('order').get(); return snap.docs.map((doc) => ({ id: doc.id, ...doc.data(), options: (doc.data().options || []).map((option) => ({ id: option.id, text: option.text })) })); }
export const timestamp = () => admin.firestore.Timestamp.now();
