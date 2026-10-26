import { auth, db } from '../config/firebaseAdmin.js';
import { httpError } from './errorHandler.js';

export async function authenticateAdmin(req, _res, next) {
  try {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Bearer ')) throw httpError(401, 'Sesi admin tidak ditemukan.', 'UNAUTHENTICATED');
    const token = await auth().verifyIdToken(header.slice(7));
    const profile = await db().collection('users').doc(token.uid).get();
    if (!profile.exists || profile.data().role !== 'admin' || profile.data().isActive === false) throw httpError(403, 'Akses admin ditolak.', 'FORBIDDEN');
    req.admin = { uid: token.uid, email: token.email };
    next();
  } catch (error) { next(error.status ? error : httpError(401, 'Token tidak valid atau sudah kedaluwarsa.', 'UNAUTHENTICATED')); }
}
