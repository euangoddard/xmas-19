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
  return {
    statusCode: 200,
    body: 'Looking great',
  };
}
