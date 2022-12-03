var express = require('express');
var router = express.Router();
const yup = require('yup');

const { validateSchema } = require('../schemas');

var passport = require('passport');
var jwt = require('jsonwebtoken');
const jwtSettings = require('../constants/jwtSettings');
const { findDocuments } = require('../helpers/MongoDbHelper');

// LOGIN STATIC ---------- //
router.post('/login-static', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log('* username: ', username);
  console.log('* password: ', password);
  if (username === 'admin' && password === '123456789') {
    res.send({ message: 'Login success!' });
    return;
  }

  res.status(401).send({ message: 'Login failed!' });
});
// ----------------------------------------------- //

// LOGIN VALIDATE | TEST LOGIN WITH BODY  ---------- //
const loginSchema = yup.object({
  body: yup.object({
    username: yup.string().email().required(),
    password: yup.string().required(() => {
      return 'Lỗi ....';
    }),
  }),
});

router.post(
  '/login-validate',
  validateSchema(loginSchema),
  (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log('* username: ', username);
    console.log('* password: ', password);
    if (username === 'admin@gmail.com' && password === '123456789') {
      res.send({ message: 'Login success!' });
      return;
    }

    res.status(401).send({ message: 'Login failed!' });
  }
);
// ----------------------------------------------- //

// TEST LOGIN WITH PARAMS ---------- //
const getByIdSchema = yup.object({
  params: yup.object({
    id: yup.number().required(),
  }),
});
router.get('/users/:id', validateSchema(getByIdSchema), (req, res, next) => {
  res.send('OK');
});
// ----------------------------------------------- //

// TEST LOGIN WITH QUERY STRING ---------- //
const findSchema = yup.object({
  query: yup.object({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
  }),
});
router.get('/users-find', validateSchema(findSchema), (req, res, next) => {
  res.send('OK');
});
// ----------------------------------------------- //

// TEST LOGIN WITH JWT ---------- //
router.post(
  '/login-jwt',
  validateSchema(loginSchema),
  async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log('* username: ', username);
    console.log('* password: ', password);

    const found = await findDocuments(
      {
        query: {
          username: username,
          password: password,
        },
      },
      'login'
    );
    // console.log(found);

    if (found && found.length > 0) {
      const id = found[0]._id.toString();
      // login: OK
      // jwt | token grant
      var payload = {
        // thông tin trong biến này sẽ được in khi cấp token
        user: {
          username: username,
          fullName: 'End User',
        },
        application: 'ecommerce',
      };

      var secret = jwtSettings.SECRET;

      var token = jwt.sign(payload, secret, {
        expiresIn: 86400, // expires in 24 hours (24 x 60 x 60)
        audience: jwtSettings.AUDIENCE,
        issuer: jwtSettings.ISSUER,
        subject: id, // Thường dùng để kiểm tra JWT lần sau
        algorithm: 'HS512',
      });

      res.send({ message: 'Login success!', token });
      return;
    }
    res.status(401).send({ message: 'Login failed!' });
  }
);

router.get(
  '/authentication',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.send('Authentication OK');
  }
);
// ----------------------------------------------- //

module.exports = router;
