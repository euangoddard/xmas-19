export async function handler(event, context) {
  console.log('EVENT', event);
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
  const questions = require('./data.json').map(({ id, emojis }) => {
    return {
      id,
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
