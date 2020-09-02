const { google } = require("googleapis");
const authentication = require("../auth/google-client");

exports.getAllData = async (req, res) => {
  const auth = await authentication.authenticate();
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: "11A6Pd1Zl_GrzRBWhd5PvVhng3Cs6jc5i9t8xXfBVOds",
      range: "Class Data!A2:F"
    },
    (err, resp) => {
      if (err) return res.status(400).json({ error: err });
      const rows = resp.data.values;
      if (rows.length) {
        return res.status(200).json({
          data: rows
        });
      }
    }
  );
};

exports.postData = async (req, res) => {
  var now = new Date(); // Fri Feb 20 2015 19:29:31 GMT+0530 (India Standard Time)
  var isoDate = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  ).toISOString();
  // get Auth
  const auth = await authentication.authenticate();
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets.values.append(
    {
      spreadsheetId: "11A6Pd1Zl_GrzRBWhd5PvVhng3Cs6jc5i9t8xXfBVOds",
      range: "Class Data!A2:F",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          [
            isoDate,
            req.body.username,
            req.body.password,
            req.body.phoneNumber,
            req.body.isRegister,
            req.body.ipAddess
          ]
        ]
      }
    },
    (err, resp) => {
      if (err) return res.status(400).json({ error: err });
      else {
          return res.status(200).json({
              status: 'success',
              message: 'Add data success'
          });
      }
    }
  );
};
