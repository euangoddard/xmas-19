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

  const isCorrect = question.answer === answer;
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
