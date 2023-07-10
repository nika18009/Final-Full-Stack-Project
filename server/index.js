const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;

const URI = process.env.DB_CONNECTION;

const dbName = process.env.DB_NAME;

const app = express();

app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect(); // prisijungiame prie duomenų bazės
    const data = await con.db(dbName).collection('users').find().toArray(); // išsitraukiame duomenis iš duomenų bazęs
    await con.close(); // uždarom prisijungimą prie duomenų bazės
    res.send(data);
  } catch (error) {
    // 500 statusas - internal server error - serveris neapdorojo arba nežino kas per klaida
    res.status(500).send(error);
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = req.body;
    const con = await client.connect();
    const data = await con.db(dbName).collection('users').insertOne(user); // prideda vieną objektą
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// app.get('/questions', async (req, res) => {
//   try {
//     const con = await client.connect(); // prisijungiame prie duomenų bazės
//     const data = await con.db(dbName).collection('questions').find().toArray();
//     await con.close(); // uždarom prisijungimą prie duomenų bazės
//     res.send(data);
//   } catch (error) {
//     // 500 statusas - internal server error - serveris neapdorojo arba nežino kas per klaida
//     res.status(500).send(error);
//   }
// });

app.post('/questions', async (req, res) => {
  try {
    const question = req.body;
    question.user_id = new ObjectId(question.user_id);
    question.createdAt = new Date(); // Add the createdAt field with the current date
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('questions')
      .insertOne(question);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/answers', async (req, res) => {
  try {
    const con = await client.connect(); // prisijungiame prie duomenų bazės
    const data = await con.db(dbName).collection('answers').find().toArray(); // išsitraukiame duomenis iš duomenų bazęs
    await con.close(); // uždarom prisijungimą prie duomenų bazės
    res.send(data);
  } catch (error) {
    // 500 statusas - internal server error - serveris neapdorojo arba nežino kas per klaida
    res.status(500).send(error);
  }
});

app.post('/answers', async (req, res) => {
  try {
    const answer = req.body;
    answer.question_id = new ObjectId(answer.question_id);
    answer.createdAt = new Date();
    const con = await client.connect();
    const data = await con.db(dbName).collection('answers').insertOne(answer);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// app.get('/questions', async (req, res) => {
//   try {
//     const con = await client.connect();
//     const data = await con
//       .db(dbName)
//       .collection('questions')
//       .aggregate([
//         {
//           $lookup: {
//             from: 'answers',
//             let: { questionId: '$_id' },
//             pipeline: [
//               {
//                 $match: {
//                   $expr: {
//                     $eq: ['$question_id', '$$questionId'],
//                   },
//                 },
//               },
//             ],
//             as: 'answers',
//           },
//         },
//       ])
//       .toArray();
//     await con.close();
//     res.send(data);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

app.get('/questions', async (req, res) => {
  try {
    const { sort, filter } = req.query;
    const sortOrder = sort === 'asc' ? 1 : -1;

    const con = await client.connect();
    let pipeline = [
      {
        $lookup: {
          from: 'answers',
          let: { questionId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$question_id', '$$questionId'],
                },
              },
            },
          ],
          as: 'answers',
        },
      },
      {
        $addFields: {
          answerCount: { $size: '$answers' },
        },
      },
    ];

    if (filter === 'withAnswers') {
      pipeline = [
        ...pipeline,
        {
          $match: {
            answerCount: { $gt: 0 },
          },
        },
      ];
    } else if (filter === 'withoutAnswers') {
      pipeline = [
        ...pipeline,
        {
          $match: {
            answerCount: 0,
          },
        },
      ];
    }

    if (!filter || filter === 'showAll') {
      pipeline = [
        ...pipeline,
        {
          $sort: {
            answerCount: sortOrder,
          },
        },
      ];
    }

    const data = await con
      .db(dbName)
      .collection('questions')
      .aggregate(pipeline)
      .toArray();
    await con.close();

    // Apply sorting manually when filter is not "showAll"
    if ((filter === 'withAnswers' || filter === 'withoutAnswers') && sort) {
      data.sort((a, b) => {
        if (sort === 'asc') {
          return a.answerCount - b.answerCount;
        }
        return b.answerCount - a.answerCount;
      });
    }

    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/questionswithAnswers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect(); // prisijungiame prie duomenų bazės
    const data = await con
      .db(dbName)
      .collection('questions')
      .aggregate([
        {
          $match: { _id: new ObjectId(id) },
        },
        {
          $lookup: {
            from: 'answers',
            localField: '_id',
            foreignField: 'question_id',
            as: 'answers',
          },
        },
        {
          $unwind: '$answers',
        },
        {
          $group: {
            _id: '$_id',
            title: { $first: '$title' },
            description: { $first: '$description' },
            answers: { $push: '$answers' },
          },
        },
      ])
      .toArray(); // išsitraukiame duomenis iš duomenų bazęs
    await con.close(); // uždarom prisijungimą prie duomenų bazės
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get('/question/:id/answer', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('answers')
      .findOne(new ObjectId(id));

    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/answers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAnswer = { ...req.body };
    updatedAnswer.updatedAt = new Date();
    updatedAnswer.question_id = new ObjectId(updatedAnswer.question_id);
    updatedAnswer.user_id = new ObjectId(updatedAnswer.user_id);

    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('answers')
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedAnswer });

    await con.close();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('questions')
      .findOne(new ObjectId(id)); // Retrieve the question using its ID
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuestion = req.body;
    updatedQuestion.user_id = new ObjectId(updatedQuestion.user_id);
    updatedQuestion.updatedAt = new Date(); // Add the updatedAt field with the current date
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('questions')
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedQuestion });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// can be used for guestions/:id/answers
// app.get('/questions/:id/users', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const con = await client.connect();
//     const question = await con
//       .db(dbName)
//       .collection('questions')
//       .findOne({ _id: new ObjectId(id) });

//     if (!question) {
//       res.status(404).send('Question not found');
//       return;
//     }

//     const data = await con
//       .db(dbName)
//       .collection('users')
//       .aggregate([
//         {
//           $match: { _id: new ObjectId(question.user_id) },
//         },
//       ])
//       .toArray();

//     await con.close();
//     res.send(data);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
app.delete('/answers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('answers')
      .deleteOne({ _id: new ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('questions')
      .deleteOne({ _id: new ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
