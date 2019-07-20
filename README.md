# Google Document to Slide Generator

Google apps script which automatically generates Google Slides from Google Document input file. Requires input google document to contain an outline with title, optional: subtitle, heading1/2/3, normal text, bullet lists and/or inline images.

## Functionality

The apps script will read the google a google doc as an input file (based on url) and generate a new google slides file with a slide for the title/subtitle and one an additional slide for each heading. It will also include content from the doc in each slide.

## Getting Started

1) Open your Google source document 
2) Ensure it contains a title (menu: FORMAT -> PARAGRAPH STYLES) and headings for each chapter
3) On the menu select TOOLS -> SCRIPT EDITOR and copy the code.gs file into the code section. 
4) Copy the url of your google document and update line 6
5) Save the updated code.gs file
6) Select RUN -> RUN FUNCTION -> CONVERT from the menu
7) The script will read your input file and generate a Google Slides deck
8) Select VIEW -> STACKDRIVER LOGGING from the menu to observe the progress (press play button)

## Known Limitations

* Input URL hardcoded, see line 6
* Ignores tables, videos and other more complex content embedded in the gDocs input file

## Built With

* [Apps Script](https://developers.google.com/apps-script/) - Google Apps Script

## Contributing

Initial beta version. Feel free to PR.
Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

Current 0.1 beta

## Authors

* **bronoman** - *Initial work* - [bronoman](https://github.com/bronoman)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* coming...
