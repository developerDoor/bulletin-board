const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT number, name, duty, age, phone_number 
    FROM intern LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(board) {
  const result = await db.query(
    `INSERT INTO intern 
        (name, duty, age, phone_number) 
        VALUES 
        ("${board.name}", "${board.duty}", ${board.age}, "${board.phone_number}")`
  );

  let message = "Error in creating board";

  if (result.affectedRows) {
    message = "board created successfully";
  }

  return { message };
}

async function update(number, board) {
  const result = await db.query(
    `UPDATE intern 
    SET name="${board.name}", duty="${board.duty}", age=${board.age}, phone_number=${board.phone_number}
    WHERE number=${number}`
  );

  let message = "Error in updating board";

  if (result.affectedRows) {
    message = "board updated successfully";
  }

  return { message };
}

async function remove(number) {
  const result = await db.query(`DELETE FROM intern WHERE number=${number}`);

  let message = "Error in deleting board";

  if (result.affectedRows) {
    message = "board deleted successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
};
