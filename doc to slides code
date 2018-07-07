function convertFunction() {
  var url = 'https://docs.google.com/document/d/1KuUwwmQW1nXexMP_CK3iK_WlIvehhfGlaRI4yzm0XIU/edit';
  var presName = 'MyNewPresentation';
  var docId = openDocument(url);
  var presId = createPresentation(presName);
  createSlide(presId, docId);
  Logger.log('DONE!');
}

/**
 * open source doc and return Id.
 */
function openDocument(url) {
  //to do: pop-up window to select file
  var doc = DocumentApp.openByUrl(url);
  return doc.getId();
}

/**
 * Create a new presentation and return Id.
 */
function createPresentation(presName) {
  var presentation = SlidesApp.create(presName);
  Logger.log('Name: ' + presentation.getName());
  Logger.log('ID: ' + presentation.getId());
  //Logger.log('URL: ' + presentation.getUrl());
  return presentation.getId();
}

/**
 * Search for elements in the document and create a new slides.
 */
function createSlide(presId, docId) {
  var doc = DocumentApp.openById(docId);
  var pres = SlidesApp.openById(presId);

  // Get the body section of the active document.
  var body = doc.getBody();
  //Logger.log('body: ' + body.getText());

  // Define the search parameters.
  var searchType = DocumentApp.ElementType.PARAGRAPH;
  var searchTitle = DocumentApp.ParagraphHeading.TITLE;
  var searchSubTitle = DocumentApp.ParagraphHeading.SUBTITLE;
  var searchHeading1 = DocumentApp.ParagraphHeading.HEADING1;
  var searchNormal = DocumentApp.ParagraphHeading.NORMAL
  var searchResult = null;
  var slideno = null;

  //body.findElement(searchType, searchResult).getElement().asParagraph().getText()
  
  // Search until the paragraph is found.
  while (searchResult = body.findElement(searchType, searchResult)) {
    var par = searchResult.getElement().asParagraph();
    // update slide index
    slideno = pres.getSlides().length;
    
    if (par.getHeading() == searchTitle) {
      // Found title, create slide and insert text
      var front = pres.appendSlide(SlidesApp.PredefinedLayout.TITLE_ONLY);
      // remove the initial slide 
      var sec = pres.getSlides()[1];
      sec.remove();
      // update slide count
      slideno = pres.getSlides().length;
      var slide = pres.getSlides()[0];
      var elements = slide.getPageElements();
      var shape = slide.getPageElements()[0].asShape();
      shape.getText().setText( par.getText());
      Logger.log('added title to slide ' + (slideno-1) + ' (total:' + slideno +')');
    }

    if (par.getHeading() == searchSubTitle) {
      // Found subtitle, search slide and insert text
      var slide = pres.getSlides()[0];
      var elements = slide.getPageElements();
      var shape = elements[1].asShape();
      shape.getText().setText( par.getText());
      Logger.log('added subtitle to slide ' + (slideno-1) + ' (total:' + slideno +')');
    }
    
    if (par.getHeading() == searchHeading1) {
      // Found new heading1, update
      pres.appendSlide(SlidesApp.PredefinedLayout.TITLE_AND_TWO_COLUMNS);
      slideno = pres.getSlides().length;
      var slide = pres.getSlides()[slideno-1];
      var elements = slide.getPageElements();
      var shape = slide.getPageElements()[0].asShape();
      shape.getText().setText( par.getText());
      Logger.log('added heading to slide ' + (slideno-1) + ' (total:' + slideno +')');
    }
    
    if (par.getHeading() == searchNormal) {
      // Check if text is just a blank line...
      // ...
      // Found nomal text, search slide and insert text
      var slide = pres.getSlides()[slideno-1];
      var elements = slide.getPageElements();
      var shape = elements[1].asShape();
      // Only works if there is no text existing...check for multiple lines of input text!
      shape.getText().setText( par.getText());
      Logger.log('added text to slide ' + (slideno-1) + ' (total:' + slideno +')');
    }   
    
  }

}
