const Cattle = require('../models/Cattle');

const HEALTH = ['Excellent', 'Good', 'Fair', 'Poor'];
const GENDER = ['Female', 'Male'];

// Returns an error message, or null when the payload is valid
const validate = (b) => {
  if (b.health && !HEALTH.includes(b.health)) return 'Invalid health status';
  if (b.gender && !GENDER.includes(b.gender)) return 'Invalid gender';
  if (b.date_of_birth && Number.isNaN(Date.parse(b.date_of_birth))) return 'Invalid date of birth';
  if (b.date_of_birth && new Date(b.date_of_birth) > new Date()) return 'Date of birth cannot be in the future';
  return null;
};

const isDuplicate = (err) => err && err.code === 'ER_DUP_ENTRY';

exports.createCattle = async (req, res) => {
  try {
    const problem = validate(req.body);
    if (problem) return res.status(400).json({ error: problem });
    const id = await Cattle.createCattle(req.body, req.user.userId);
    res.status(201).json({ cattle_id: id });
  } catch (err) {
    if (isDuplicate(err)) return res.status(409).json({ error: 'That tag number is already in use' });
    console.error(err);
    res.status(500).json({ error: 'Could not add cattle' });
  }
};

exports.getAllCattle = async (req, res) => {
  try {
    res.json(await Cattle.getAllCattle());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load cattle' });
  }
};

exports.getCattleById = async (req, res) => {
  try {
    const cattle = await Cattle.getCattleById(req.params.id);
    if (!cattle) return res.status(404).json({ error: 'Cattle not found' });
    res.json(cattle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load cattle' });
  }
};

exports.updateCattle = async (req, res) => {
  try {
    if (!req.body.tag_number) return res.status(400).json({ error: 'Tag number is required' });
    const problem = validate(req.body);
    if (problem) return res.status(400).json({ error: problem });
    const changed = await Cattle.updateCattle(req.params.id, req.body);
    if (!changed) return res.status(404).json({ error: 'Cattle not found' });
    res.json({ message: 'Cattle updated successfully' });
  } catch (err) {
    if (isDuplicate(err)) return res.status(409).json({ error: 'That tag number is already in use' });
    console.error(err);
    res.status(500).json({ error: 'Could not update cattle' });
  }
};

exports.deleteCattle = async (req, res) => {
  try {
    const removed = await Cattle.deleteCattle(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Cattle not found' });
    res.json({ message: 'Cattle deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not delete cattle' });
  }
};
