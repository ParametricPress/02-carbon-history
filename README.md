# Article Title

TK short description of article.

## Local Setup

To run the article locally, make sure you have NodeJS and NPM installed. Then clone or download this repository. The main file is [index.idyll](index.idyll), this file defines the article using [Idyll markdown](https://idyll-lang.org/docs/syntax).

### Installing dependencies

1. Install local dependencies: `npm install`

### Running local dev server

1. Run `npm start` in the root of this project.

## How do I...

### Import a dataset?

- Add your data to the `data` folder, either as a CSV or JSON file.

Then use the `[data /]` tag to load it as a variable. For example to
load a dataset and provide it as input to a table component:

```
[data name:"myDatasetName" source:"my-dataset-file.csv"  /]

[Table data:myDatasetName /]
```

### Make a custom component?

- Add your component to the `components` folder. Use either of the existing components in there as a guide. If you're familiar with React, start with `custom-component.js`, otherwise if you are more comfortable using a tool like D3 where you manually handle updates / redraws, start with `custom-d3-component.js`.

- Any component that you put in that folder will immediately be available in the Idyll markup. Files named like `custom-component.js` can be imported as `[CustomComponent /]`.



### Learn more about existing components

All of Idyll's standard components are available [docs here](https://idyll-lang.org/docs/components).

Additionally, custom Parametric components can be found [here](https://github.com/ParametricPress/parametric-components/tree/master/src/issue-02).

### Modify existing components

To make changes to standard components, copy the source from `node_modules` to the `components` folder.

For example if you wanted to customize the `[Caption /]` component you could run `cp node_modules/parametric-components/src/issue-02/caption.js components/`.

Similarly, to modify a built-in Idyll component you can run e.g. `cp node_modules/idyll-components/src/button.js components/`.
