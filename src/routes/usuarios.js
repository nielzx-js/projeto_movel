const router = require('express').Router();
const Usuario = require('../model/usuario');

// READ (todos)
router.get('/', async (req, res) => {
  res.json(await Usuario.findAll());
});

// READ (um)
router.get('/:id', async (req, res) => {
  const u = await Usuario.findByPk(req.params.id);
  if (!u) return res.status(404).json({ erro: 'Usuário não encontrado' });
  res.json(u);
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const { nome, email } = req.body;
    const u = await Usuario.create({ nome, email });
    res.status(201).json(u);
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  const u = await Usuario.findByPk(req.params.id);
  if (!u) return res.status(404).json({ erro: 'Usuário não encontrado' });
  const { nome, email } = req.body;
  await u.update({ nome, email });
  res.json(u);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const u = await Usuario.findByPk(req.params.id);
  if (!u) return res.status(404).json({ erro: 'Usuário não encontrado' });
  await u.destroy();
  res.status(204).end();
});

module.exports = router;