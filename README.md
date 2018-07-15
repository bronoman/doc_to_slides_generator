# Google Document to Slide Generator
Google apps script which automatically generates Google Slides from Google Document input file. Requires input google document to contain an outline with title, optional: subtitle, heading1/2/3, normal text, bullet lists and/or inline images.
## Functionality
The apps script will read the input file (based on url) and generate a slide for the title/subtitle and one an additional slide for each heading.
## Usage
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
* Name of presentation hardcoded, see line 7

Initial beta version. Feel free to PR.
## License
MIT
