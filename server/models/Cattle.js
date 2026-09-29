const db = require('../utils/database');

const COLUMNS =
  'cattle_id, tag_number, name, breed, health, gender, date_of_birth, notes, added_by, created_at';

exports.createCattle = async (c, addedBy) => {
  const tagNumber = c.tag_number || `CT${Date.now()}`;
  const [result] = await db.execute(
    `INSERT INTO cattle (tag_number, name, breed, health, gender, date_of_birth, notes, added_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      tagNumber,
      c.name || null,
      c.breed || null,
      c.health || 'Good',
      c.gender || 'Female',
      c.date_of_birth || null,
      c.notes || null,
      addedBy || null
    ]
  );
  return result.insertId;
};

exports.getAllCattle = async () => {
  const [rows] = await db.execute(`SELECT ${COLUMNS} FROM cattle ORDER BY created_at DESC`);
  return rows;
};

exports.getCattleById = async (id) => {
  const [rows] = await db.execute(`SELECT ${COLUMNS} FROM cattle WHERE cattle_id = ?`, [id]);
  return rows[0];
};

exports.updateCattle = async (id, c) => {
  const [result] = await db.execute(
    `UPDATE cattle SET tag_number=?, name=?, breed=?, health=?, gender=?, date_of_birth=?, notes=?
     WHERE cattle_id=?`,
    [
      c.tag_number,
      c.name || null,
      c.breed || null,
      c.health || 'Good',
      c.gender || 'Female',
      c.date_of_birth || null,
      c.notes || null,
      id
    ]
  );
  return result.affectedRows;
};

exports.deleteCattle = async (id) => {
  const [result] = await db.execute('DELETE FROM cattle WHERE cattle_id = ?', [id]);
  return result.affectedRows;
};
