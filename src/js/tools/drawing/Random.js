/**
 * @provide pskl.tools.drawing.RandomTool
 *
 * @require pskl.utils
 */
(function() {
  var ns = $.namespace('pskl.tools.drawing');

  ns.RandomTool = function() {
    this.superclass.constructor.call(this);

    this.toolId = 'tool-random';
    this.helpText = 'Random tool';
  };

  pskl.utils.inherit(ns.RandomTool, ns.SimplePen);

  /**
   * @override
   */
  ns.RandomTool.prototype.randomPixelLocation = function(col, row, frame, overlay) {
    var point = pskl.PixelUtils.resizePixel(col, row, 4);
    var colors = [];
    var counter = 0;

    point.forEach(function (point) {
      /* Save the color */
      colors[counter] = {x: point[0], y: point[1], col: pskl.utils.intToColor(frame.getPixel(point[0], point[1]))};
      console.log("C: " + counter + " X: " + point[0] + " Y: " + point[1] + " color: " + pskl.utils.intToColor(frame.getPixel(point[0], point[1])));
      /* Remove the color */
      //this.draw(0, point[0], point[1], frame, overlay);
      counter++;
    }.bind(this));

    console.log('Shuffel...');

    for(var i = colors.length - 1; i > 0; i--){
      /* Random the color in each position */
      var tmp_color = colors[i].col; // Save the current selected object color
      var random_index = Math.round(Math.random() * 10) % i;

      colors[i].col = colors[random_index].col; // Set the current color with random color
      colors[random_index].col = tmp_color; // Reset the color of the random object
      
      console.log(colors[i].col);
    }

    for(var i = 0; i < colors.length; i++){
      /* Redraw the color to the frame */
      this.draw(colors[i].col, colors[i].x, colors[i].y, frame, overlay);
    }
  };

  ns.RandomTool.prototype.applyToolAt = function(col, row, frame, overlay, event) {
    this.randomPixelLocation(col,row, frame, overlay);
    /*if (frame.containsPixel(col, row)) {
      var sampledColor = pskl.utils.intToColor(frame.getPixel(col, row));
      if (pskl.app.mouseStateService.isLeftButtonPressed()) {
        $.publish(Events.SELECT_PRIMARY_COLOR, [sampledColor]);
      } else if (pskl.app.mouseStateService.isRightButtonPressed()) {
        $.publish(Events.SELECT_SECONDARY_COLOR, [sampledColor]);
      }
    }*/
  };
})();
