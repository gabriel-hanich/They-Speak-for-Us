# They-Speak-for-Us
Full stack development for the 'They Speak for Us' project monitoring and studying news across the world.

## Scientific Analysis
Data relating to the scientific study of the dataset can be found in the ```Method``` directory.



## Dev Notes
### For data Collection
Necessary files are found in the  ```Data Collection``` folder
Node Modules are NOT included.
Only ```scraper.js``` needs to be hosted on a cloud service provider

### Data Collection Dependencies
All available via npm
1. csv-parser
2. dotenv
3. rss-parser
4. vader-sentiment
5. mongodb

### Environment Variables
in the root folder of the ```Data Collection``` folder, a ```settings.env``` file must be created.
This must contain
1. NODE_ENV=development
2. DB_URI = [DB Connection URL for MongoDB]
3. DB_NAME = [Name of DB to write to]

Furthermore in the root directory of  ```Tooling```, a  ```settings.json``` file must be made containing the data. 