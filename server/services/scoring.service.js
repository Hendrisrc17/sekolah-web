export function scoreAttempt(questions, submittedAnswers = {}) {
  const answers = {}; let totalScore = 0; let maxScore = 0; let correctCount = 0; let wrongCount = 0; let unansweredCount = 0;
  for (const question of questions) {
    const rawSelected = submittedAnswers[question.id];
    const selectedIds = Array.isArray(rawSelected) ? rawSelected : rawSelected ? [rawSelected] : [];
    const options = question.options || [];
    const max = Math.max(0, ...options.map((option) => Number(option.point) || 0));
    maxScore += question.type === 'allCorrect' ? options.reduce((sum, option) => sum + Math.max(0, Number(option.point) || 0), 0) : max;
    if (!selectedIds.length) { unansweredCount += 1; answers[question.id] = { questionId: question.id, selectedOptionId: null, pointEarned: 0, isCorrect: false }; continue; }
    const selectedOptions = selectedIds.map((id) => options.find((item) => item.id === id));
    if (selectedOptions.some((option) => !option)) throw new Error(`Opsi jawaban tidak valid untuk soal ${question.id}.`);
    const point = selectedOptions.reduce((sum, option) => sum + Math.max(0, Number(option.point) || 0), 0);
    const isCorrect = question.type === 'allCorrect'
      ? selectedOptions.every((option) => option.isCorrect) && selectedOptions.length === options.filter((option) => option.isCorrect).length
      : selectedIds.length === 1 && Boolean(selectedOptions[0].isCorrect);
    totalScore += point; isCorrect ? correctCount += 1 : wrongCount += 1;
    answers[question.id] = { questionId: question.id, selectedOptionId: Array.isArray(rawSelected) ? selectedIds : selectedIds[0], pointEarned: point, isCorrect };
  }
  return { answers, totalScore, maxScore, percentage: maxScore ? Math.round((totalScore / maxScore) * 10000) / 100 : 0, correctCount, wrongCount, unansweredCount, totalQuestions: questions.length };
}
