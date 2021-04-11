# Expenses

## Data
The data used for this application is stored locally in a .sqlite file. The utility [Tuql](https://github.com/bradleyboy/tuql) is used to host a local GraphQL endpoint for simple CRUD operations on the sqlite database.

The initial data for this project comes from a Google Sheet that I have been using to track my expenses for the past few years. The Google Sheet is in the below format: 

| Id | Date | Place           | Amount | Description              | Category       | Subcategory |
|----|------|-----------------|--------|--------------------------|----------------|-------------|
| 1  | 1/1  | Chipotle        | $6.86  | Burrito                  | Food/Drink     |             |
| 2  | 1/1  | REI             | $47.95 | Pants                    | Clothing       |             |
| 3  | 1/2  | Chicago Parking | $2.00  | Parking in Andersonville | Transportation | Parking     |

Download this data as a CSV by going to File, Download as, CSV in Google Sheets. Rename the file to your preference, this example uses `2021.csv` and ensure the file is in the project root directory.

Open the CSV in a text editor and make the following changes:
 - Remove any commas in any $1,000 or higher expenses
 - Remove any blank rows at the bottom of the file

Create a blank `expenses.sqlite` file:

`$ touch expenses.sqlite`

Open the sqlite file in the interactive console:

`$ sqlite3 expenses.sqlite`

Import the CSV file (do not paste the sqlite>, that's the command prompt):

`sqlite> .mode csv`

`sqlite> .import 2021.csv expenses`

Remove the dollar signs from the amount column:

`sqlite> update expenses set amount=substr(amount, 2);`

Make the ID the primary key and change the type to INTEGER

`sqlite> pragma foreign_keys=off;`

`sqlite> begin transaction;`

`sqlite> alter table expenses rename to expenses_old`


```
sqlite> CREATE TABLE expenses( <press enter>

...> id INTEGER NOT NULL PRIMARY KEY <enter>

...> date TEXT, <enter>

...> place TEXT, <enter>

...> amount TEXT, <enter>

...> description TEXT, <enter>

...> category TEXT, <enter>

...> subcategory TEXT); <enter>
```

`sqlite> insert into expenses select * from expenses_old;`

`sqlite> drop table expenses_old;`

`sqlite> commit;`

`sqlite> pragma foreign_keys=on;`

To view the table schema and print the first 10 rows:

`sqlite> .schema expenses`

`sqlite> select * from expenses limit 10;`

To exit sqlite:

`sqlite> .quit`

### How to Start GraphQL server using Tuql
Now that we have created and prepared our sqlite database, we can host it using Tuql and query it using GraphQL in our Angular application.

`tuql --db expenses.sqlite`

To enable the interactive graphiql interface, run `tuql --db expenses.sqlite --graphiql`

To print the GraphQL schema, run `tuql --db expenses.sqlite --schema`



# Generated Readme
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
