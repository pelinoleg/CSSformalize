[![GitHub forks](https://img.shields.io/github/forks/pelinoleg/Fillz-Forms.svg)](https://github.com/pelinoleg/Fillz-Forms/network)
[![GitHub issues](https://img.shields.io/github/issues/pelinoleg/Fillz-Forms.svg)](https://github.com/pelinoleg/Fillz-Forms/issues)
[![GitHub stars](https://img.shields.io/github/stars/pelinoleg/Fillz-Forms.svg)](https://github.com/pelinoleg/Fillz-Forms/stargazers)
# Custom Css Forms

![Dark and Light mode example for custom css forms](https://github.com/pelinoleg/Fillz-Forms/blob/master/custom_forms_demo.jpg)

### Description

This is a set of CSS rules that help you style standard Html forms without using javascript.

There are also some components here, such as grouped radio buttons, grouped checkboxes, switches and custom select

### Demo:

[https://pelinoleg.github.io/Fillz-Forms/](https://github.com/pelinoleg/Fillz-Forms)

### How to Install:

#### If you do not make changes in styles:

- Download file css/index.css and connect the file to the page.

- Styles will be applied to standard forms immediately.

If you want to use form components, you need to look at their structure in the index.html

#### If you want to change the styles of the forms:

- Clone project

- Install node.js ( [Node.js](https://nodejs.org/en/) )

- Install Gulp `sudo npm i gulp -g`

- Run inside the project: `npm install`

- Run `gulp watch` and change styles in the sass folder

- index.css file will be generated automatically
- To apply styles you need to put class `custom-form` to each element. For example: `<input type="text class="custom-form" />`

---

> **Changelog:**
>
> ##### v1.1 (07.06.2021)
>
> - Changed from global styles to class
> - Added input type list
> - bug fixes

---

> **Todo:**

> Description of styles and mixins
