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
  return {
    statusCode: 200,
    body: JSON.stringify({ questions: [{ id: 1, emojis: 'ABC' }, { id: 2, emojis: 'DEF' }] }),
  };
}

function checkQuestion(event) {
  return {
    statusCode: 200,
    body: 'Looking great',
  };
}
