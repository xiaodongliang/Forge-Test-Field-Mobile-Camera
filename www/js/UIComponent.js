
//define the extension for custom button

function MyUIExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
}
MyUIExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
MyUIExtension.prototype.constructor = MyUIExtension;
 
MyUIExtension.prototype.createUI = function() {

     this._panel = new Panel(this.viewer);
     this._panel.setVisible(true);
 
};

MyUIExtension.prototype.load = function() {

    var viewer = this.viewer; 
    this.createUI();
    
    return true;
};

MyUIExtension.prototype.unload = function() {

    this.viewer.toolbar.removeControl(this.subToolbar);

    return true;
};

Autodesk.Viewing.theExtensionManager.registerExtension('MyUIExtension', MyUIExtension);

Panel = function (theViewer) {

    var baseID  =Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5); 

    this.content = document.createElement('div');

    this.content.id = baseID + 'PanelContentId';
    this.content.className = 'uicomponent-panel-content';

    Autodesk.Viewing.UI.DockingPanel.call(this, theViewer.container, baseID, 
    'Field Image',{shadow: true});


    this.container.style.right = "0px";
    this.container.style.top = "0px";

    this.container.style.width = "380px";
    this.container.style.height = "500px";

    this.container.style.resize = "auto"; 

    //produce the layout of the panel
    var html = [
        '<div class="uicomponent-panel-container">',
  
            '<button  id="refresh_image" class="btn btn-primary">Refresh Image</button>',
            '<img class = "mypanelimage" id="currentImage"/>',
     '</div>'
    ].join('\n');

    $('#' + baseID + 'PanelContentId').html(html); 

    $("#refresh_image").click(function () {
        $.get('/ForgeRoute/getImage', function(blob) {  
                 
                 document.getElementById('currentImage').src =blob; 
        }); 
    });
}

Panel.prototype = Object.create(Autodesk.Viewing.UI.DockingPanel.prototype);
Panel.prototype.constructor = Panel;
Panel.prototype.initialize = function () {

    this.title = this.createTitleBar(
        this.titleLabel ||
        this.container.id);

    this.closer = this.createCloseButton();

    this.container.appendChild(this.title);
    this.title.appendChild(this.closer);
    this.container.appendChild(this.content);

    this.initializeMoveHandlers(this.title);
    this.initializeCloseHandler(this.closer);
};

