const express = require('express');
const router = express.Router();
const Pmid = require('../models/Pmid');

// router.get('/', async (req, res) => {
//   try {
//     const pmids = await Pmid.find().sort('pmid');
//     res.render('index', { pmids });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching PMIDs' });
//   }
// });

router.get('/curate', async (req, res) => {
  try {
    const randomPmid = await Pmid.aggregate([
      { $match: { status: 'incomplete' } },
      { $sample: { size: 1 } }
    ]);

    if (randomPmid.length === 0) {
      return res.render('curate', { message: 'No incomplete PMIDs available.' });
    }

    res.render('curate', { pmid: randomPmid[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching random PMID' });
  }
});

router.post('/save-variation', async (req, res) => {
  try {
    const { pmid, variations, status } = req.body;
    const updatedPmid = await Pmid.findOneAndUpdate(
      { pmid: parseInt(pmid) },
      { 
        $set: { variations, status }
      },
      { new: true }
    );
    if (!updatedPmid) {
      return res.status(404).json({ message: 'PMID not found' });
    }
    res.json(updatedPmid);
  } catch (error) {
    console.error('Error saving variations:', error);
    res.status(500).json({ message: 'Error saving variations', error: error.message });
  }
});

module.exports = router;
