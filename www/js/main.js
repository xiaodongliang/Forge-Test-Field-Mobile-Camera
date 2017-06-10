
var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6eGlhb2RvbmctcGVyc2lzdGVudC1idWNrZXQtZ2UvUmV2aXROYXRpdmUucnZ0';
var _viewer  = null;
  
  
function onDocumentLoadSuccess(doc) {

    // A document contains references to 3D and 2D viewables.
    var viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {'type':'geometry'}, true);
    if (viewables.length === 0) {
        console.error('Document contains no viewables.');
        return;
    }

    // Choose any of the avialble viewables
    var initialViewable = viewables[0];
    var svfUrl = doc.getViewablePath(initialViewable);
    var modelOptions = {
        sharedPropertyDbPath: doc.getPropertyDbPath()
    };

    var viewerDiv= document.getElementById('viewer3D');
    _viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv,{
                    extensions: ['MyUIExtension']});
    _viewer.start(svfUrl, modelOptions, onLoadModelSuccess, onLoadModelError); 
}

 
function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}
 
function onLoadModelSuccess(model) {
    console.log('onLoadModelSuccess()!');  
 }

 
function onLoadModelError(viewerErrorCode) {
    console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
}
   
$(document).ready (function () {

   //load viewer
   $.get('/api/token', function(tokenResponse) {

        token  = JSON.parse(tokenResponse).access_token; 
        var options = {
                    env: 'AutodeskProduction',
                    accessToken: token
                };

         Autodesk.Viewing.Initializer(options, function onInitialized(){
            Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
         });
    }); 

 
}) ;


