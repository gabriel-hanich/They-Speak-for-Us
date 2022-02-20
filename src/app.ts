/// <reference path="../@types/vader-sentiment.d.t.s" />
import vaderSentiment from "vader-sentiment";
import csvParser from "csv-parser";
import fs from "fs";

fs.createReadStream('/data/Media Outlets.csv')
  .pipe(csvParser())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });