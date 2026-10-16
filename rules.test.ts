import test from 'node:test';
import assert from 'node:assert/strict';
import {
  EXAM_1_PARTE_1,
  EXAM_1_PARTE_2,
  EXAM_1_PARTE_3,
  EXAM_1_PARTE_4,
  EXAM_1_PARTE_5,
  EXAM_1_PARTE_6,
  FRASES_EMERGENCIA,
  EXAM_2_PARTE_1,
  EXAM_2_PARTE_2,
  EXAM_2_PARTE_3,
  EXAM_2_PARTE_4,
  EXAM_2_PARTE_5,
  BONUS_EXPRESIONES,
  getEvaluationFeedback,
} from './examData.ts';
import { isSoundMuted, setSoundMuted, toggleGlobalMute } from './soundUtil.ts';

test('Examen 1 contains all sections and activities', () => {
  assert.equal(EXAM_1_PARTE_1.length, 10, 'Parte 1 has 10 situations');
  assert.equal(EXAM_1_PARTE_2.length, 8, 'Parte 2 has 8 situations');
  assert.equal(EXAM_1_PARTE_3.length, 8, 'Parte 3 has 8 situations');
  assert.equal(EXAM_1_PARTE_4.length, 4, 'Parte 4 has 4 role-play dialogues');
  assert.equal(EXAM_1_PARTE_5.length, 8, 'Parte 5 has 8 tense exercises');
  assert.equal(EXAM_1_PARTE_6.length, 4, 'Parte 6 has 4 surprise situations');
  assert.equal(FRASES_EMERGENCIA.length, 12, '12 emergency phrases present');

  const totalE1Activities =
    EXAM_1_PARTE_1.length +
    EXAM_1_PARTE_2.length +
    EXAM_1_PARTE_3.length +
    EXAM_1_PARTE_4.length +
    EXAM_1_PARTE_5.length +
    EXAM_1_PARTE_6.length;
  assert.equal(totalE1Activities, 42, 'Total activities in Examen 1 is 42');
});

test('Examen 2 contains all sections and 50 activities', () => {
  assert.equal(EXAM_2_PARTE_1.length, 10, 'Parte 1 has 10 situations');
  assert.equal(EXAM_2_PARTE_2.length, 10, 'Parte 2 has 10 soccer situations');
  assert.equal(EXAM_2_PARTE_3.length, 10, 'Parte 3 has 10 multiple-choice questions');
  assert.equal(EXAM_2_PARTE_4.length, 4, 'Parte 4 has 4 dialogues');
  assert.equal(EXAM_2_PARTE_5.length, 10, 'Parte 5 has 10 tense shift questions');
  assert.equal(BONUS_EXPRESIONES.length, 15, '15 bonus natural expressions');

  const totalE2Activities =
    EXAM_2_PARTE_1.length +
    EXAM_2_PARTE_2.length +
    EXAM_2_PARTE_3.length +
    EXAM_2_PARTE_4.length +
    EXAM_2_PARTE_5.length;
  assert.equal(totalE2Activities, 44, 'Core exam 2 activities count');
});

test('Multiple choice questions have valid structure and exactly one correct option', () => {
  for (const q of EXAM_2_PARTE_3) {
    assert.ok(q.options && q.options.length === 3, `Question ${q.number} should have 3 options`);
    const correctCount = q.options.filter((o) => o.isCorrect).length;
    assert.equal(correctCount, 1, `Question ${q.number} must have exactly 1 correct answer`);
    assert.ok(q.armenian.length > 0, `Question ${q.number} must have Armenian translation`);
    assert.ok(q.spanish.length > 0, `Question ${q.number} must have Spanish prompt`);
  }
});

test('Evaluation feedback tiers calculate correctly', () => {
  const excellent = getEvaluationFeedback(95);
  assert.match(excellent.textEs, /Sobresaliente/i);

  const notable = getEvaluationFeedback(78);
  assert.match(notable.textEs, /Notable/i);

  const aprobado = getEvaluationFeedback(60);
  assert.match(aprobado.textEs, /Aprobado/i);

  const needsPractice = getEvaluationFeedback(40);
  assert.match(needsPractice.textEs, /Necesita más práctica/i);
});

test('Sound mute toggle works properly', () => {
  setSoundMuted(false);
  assert.equal(isSoundMuted(), false);
  const nowMuted = toggleGlobalMute();
  assert.equal(nowMuted, true);
  assert.equal(isSoundMuted(), true);
  const nowUnmuted = toggleGlobalMute();
  assert.equal(nowUnmuted, false);
});
