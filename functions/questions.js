const levenshtein = require('js-levenshtein');

export async function handler(event, context) {
  if (event.httpMethod === 'GET') {
    return listQuestions();
  } else if (event.httpMethod === 'POST') {
    return checkQuestion(event);
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify(`Method ${event.method} not known!`),
    };
  }
}

function listQuestions() {
  const questions = require('./data.json').map(({ emojis }) => {
    return {
      emojis,
    };
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ questions }),
  };
}

function checkQuestion(event) {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid request body',
      }),
    };
  }
  const { emojis, answer } = body;
  const question = require('./data.json').find(q => q.emojis === emojis);
  if (!question) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: `Unknown emojis: ${emojis}`,
      }),
    };
  }

  const isCorrect = isAnswerCorrect(question.answer, answer);
  let response;
  if (isCorrect) {
    response = { isCorrect, answer: question.answer };
  } else {
    response = { isCorrect };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
}

function isAnswerCorrect(answer, guess) {
  const answerNormalized = normalizeAnswer(answer);
  const guessNormalized = normalizeAnswer(guess);
  const distance = levenshtein(answerNormalized, guessNormalized);
  return distance < 3;
}

function normalizeAnswer(answer) {
  if (!answer) {
    return answer;
  }
  const words = answer.toLowerCase().split(/\s+/g);
  const wordsNormalized = [];
  words.forEach(word => {
    const wordSynonym = normalizeSynonyms(word);
    const wordNormalized = wordSynonym.replace(/\W+/g, '');
    if (wordNormalized && STOPWORDS.has(wordNormalized)) {
      wordsNormalized.push(wordNormalized);
    }
  });
  return wordsNormalized.join('-');
}

function normalizeSynonyms(word) {
  return SYNONYMS[word] || word;
}

const SYNONYMS = {
  '+': 'and',
  '&': 'and',
  '1': 'one',
  '2': 'two',
  '3': 'three',
  '4': 'four',
  '5': 'five',
  '6': 'six',
  '7': 'seven',
  '8': 'eight',
  '9': 'nine',
};

const STOPWORDS = new Set(['the']);
