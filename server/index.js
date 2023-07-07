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
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('questions')
      .insertOne(question); // prideda vieną objektą
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
    const con = await client.connect();
    const data = await con.db(dbName).collection('answers').insertOne(answer);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/questions', async (req, res) => {
  try {
    const con = await client.connect(); // prisijungiame prie duomenų bazės
    const data = await con
      .db(dbName)
      .collection('questions')
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: `_id`,
            as: 'user_info',
          },
        },
        {
          $unwind: '$user_info',
        },
      ])
      .toArray(); // išsitraukiame duomenis iš duomenų bazęs
    await con.close(); // uždarom prisijungimą prie duomenų bazės
    res.send(data);
  } catch (error) {
    // 500 statusas - internal server error - serveris neapdorojo arba nežino kas per klaida
    res.status(500).send(error);
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
