
/**
 * Set drag delay so that the stickers are scrollable on mobile devices
 */
interact(".sticker")
  .draggable({
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "body",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },

    onstart: dragStartListener,
    onmove: dragMoveListener,
    onend: dragEndListener
  })

/**
 * If a sticker is dropped in the dock, delete it
 */
interact("#dock")
  .dropzone({
    accept: '.sticker-draggable',
    overlap: 0.50,

    ondragenter: function (event) {
      var draggableSticker = event.relatedTarget;
      $(draggableSticker).addClass("sticker-remove");
    },
    ondragleave: function (event) {
      $(event.relatedTarget).removeClass("sticker-remove");
    },
    ondrop: function (event) {
      $(event.relatedTarget).remove();
    }
  });

/*
$(".sticker-in-dock").on("mousedown", function createNewDockSticker(event) {
  var element = $(event.target);
  element.removeClass("sticker-in-dock");
  element.addClass("sticker-draggable");

  var newDockSticker = $("<img class='sticker sticker-in-dock src='"
    + element.attr("src") + "'/>");
  element.parent().append(newDockSticker);
})*/

function dragStartListener(event) {
  var element = $(event.target);
  element.addClass("sticker-is-dragging");
}

function dragMoveListener (event) {
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

function dragEndListener(event) {
  $(event.target).removeClass("sticker-is-dragging");
}
