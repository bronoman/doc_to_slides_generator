function convert() {
  // use VIEW - STACKDRIVER LOGGING to view logs
  // ref: https://developers.google.com/apps-script/reference
  console.time(convert);
  console.warn('START of conversion, please wait.');
  var url = 'https://docs.google.com/document/d/[...your doc...]/edit'
  var docId = openDocument(url);
  var fileName = DocumentApp.openById(docId).getName(); 
  var presId = createPresentation(fileName);
  createSlide(presId, docId);
  console.timeEnd(convert);
  console.warn('FINISHED conversion, please open most recent files in gDrive');
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
  console.info('Name: ' + presentation.getName());
  console.info('ID: ' + presentation.getId());
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
  // Define the search parameters.
  var search = DocumentApp.ElementType.LIST_ITEM;
  var searchType = DocumentApp.ElementType.PARAGRAPH;
  var searchTitle = DocumentApp.ParagraphHeading.TITLE;
  var searchSubTitle = DocumentApp.ParagraphHeading.SUBTITLE;
  var searchHeading1 = DocumentApp.ParagraphHeading.HEADING1;
  var searchHeading2 = DocumentApp.ParagraphHeading.HEADING2;
  var searchHeading3 = DocumentApp.ParagraphHeading.HEADING3;
  var searchNormal = DocumentApp.ParagraphHeading.NORMAL
  var searchResult = null;
  var slideno = null;
  var slide = null;
  var elements = null;
  var shape = null;
  //traverse through: body.findElement(searchType, searchResult).getElement().asParagraph().getText()
  var e = body.getNumChildren();
  console.info('DOCUMENT ELEMENTS FOUND: '+e);
  for( var i=0;i<e;i++) {
    // get elements
    var element = body.getChild(i).copy();
    var type = element.getType();
    // sort out elements by type
    if( type == DocumentApp.ElementType.PARAGRAPH ){
      console.log('*** PARAGRAPH ' + i);
      var children = element.getNumChildren();
      if (children >0) {
        for (var j=0;j<children;j++) {
          var subelement = element.getChild(j).copy();
          var subtype = subelement.getType();
          // update slide count
          slideno = pres.getSlides().length;
          console.log('***** SUB-ELEMENT ' + j + ":"  + subtype);          
          // check to ensure it is text
          if (subtype == DocumentApp.ElementType.TEXT) {
            //console.info(subelement.getText());
            var par = element.asParagraph()
            var elType = body.findElement(searchType, searchResult).getElement().getType()
            slideno = pres.getSlides().length;
            
            // Found title, create slide and insert text
            if (par.getHeading() == searchTitle) {
              var front = pres.appendSlide(SlidesApp.PredefinedLayout.TITLE_ONLY);
              // remove the initial slide 
              var sec = pres.getSlides()[1];
              sec.remove();
              // update slide count
              slideno = pres.getSlides().length;
              slide = pres.getSlides()[0];
              elements = slide.getPageElements();
              shape = slide.getPageElements()[0].asShape();
              shape.getText().setText( par.getText());
              console.info((slideno) +')...added title : ['+ elType +']: '+ par.getText());
            }
            
            // Found subtitle, search slide and insert text            
            if (par.getHeading() == searchSubTitle) {
              slide = pres.getSlides()[0];
              elements = slide.getPageElements();
              shape = elements[1].asShape();
              shape.getText().setText( par.getText());
              console.info((slideno) +')...added subtitle: ['+ elType +']: '+ par.getText());
            }
            
            // Found new heading1/2/3, create slide & update headline
            if (par.getHeading() == searchHeading1 || par.getHeading() == searchHeading2 || par.getHeading() == searchHeading3 ) {
              pres.appendSlide(SlidesApp.PredefinedLayout.TITLE_AND_TWO_COLUMNS);
              // update slide count
              slideno = pres.getSlides().length;
              slide = pres.getSlides()[slideno-1];
              elements = slide.getPageElements();
              shape = slide.getPageElements()[0].asShape();
              shape.getText().setText( par.getText());
              console.info((slideno) +')...added header: ['+ elType +']: '+ par.getText());
            }
            
            // Found nomal text, search slide and insert text
            if (par.getHeading() == searchNormal) {
              slide = pres.getSlides()[slideno-1];
              elements = slide.getPageElements();
              shape = elements[1].asShape();
              //check if the end of the document has been reached prematurely
              if (body.findElement(searchType, searchResult) == null) {
                return;
              }
              var exist = shape.getText().asString();
              var shapeText = shape.getText();
              // element has text already
              if (exist != '') {                  
                var pari = exist +  par.getText();// '\n'  new line not needed
                shapeText.setText(pari);
              // new virgin element
              } else {
                var pari =  par.getText();
                shapeText.setText(pari);
              }
              pari = '';
              shapeText = '';
              console.info((slideno) +')...added normal: ['+ elType +']: '+ par.getText());
            }
          }
          
          // Found image item, search slide and insert text
          if (subtype == DocumentApp.ElementType.INLINE_IMAGE) {
            var imBlo = subelement.getBlob();
            // update slide count
            slideno = pres.getSlides().length;
            slide = pres.getSlides()[slideno-1];
            // replace
            var newIm = slide.insertImage(imBlo);
            newIm.scaleHeight(0.4);
            newIm.scaleWidth(0.4);
            // add dynamic offset, if needed
            newIm.setTop(90);
            newIm.setLeft(380);
            console.info((slideno) +')...added image : ['+ elType +']: '+ par.getText());
          }          
        }
      }
    }
    else if( type == DocumentApp.ElementType.TABLE ){
      slideno = pres.getSlides().length;
      console.error((slideno) +')...Found table. NOT CONVERTED.');
    }
    // Found list item, search slide and insert text
    else if( type == DocumentApp.ElementType.LIST_ITEM ){
      slide = pres.getSlides()[slideno-1];
      elements = slide.getPageElements();
      shape = elements[1].asShape();
      var exist = shape.getText().asString();
      //console.info((slideno) +')...exist.list. : ['+ type +']: '+ exist);
      if (exist != '') {
        var pari = exist + '* '+ element.getText();
        shape.getText().setText(pari);
      } else {
        var pari = '* '+ element.getText();
        shape.getText().setText(pari);    
      }
      console.info((slideno) +')...added list. : ['+ type +']: '+ element.getText());
    }
    else if( type == DocumentApp.ElementType.INLINE_IMAGE ){
      slideno = pres.getSlides().length;
      console.error((slideno) +')...Found other image. NOT CONVERTED.');
    }
    else if( type == DocumentApp.ElementType.TABLE_OF_CONTENTS ){
      slideno = pres.getSlides().length;
      console.error((slideno) +')...Found Table of Contents. --> NOT CONVERTED.');
    }
    else {
      slideno = pres.getSlides().length;
      console.error((slideno) +')...Found unknown element: '+type + ' --> NOT CONVERTED');
      //throw new Error("ERROR: check what to do with this type of element : "+ type);
    }
  }
}
