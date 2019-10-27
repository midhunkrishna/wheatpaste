import SelectionSerializer from "./content/selection_serializer";
import RangeMarker from "./content/range_marker";

document.addEventListener("mouseup", function() {
  window.s = window.getSelection();

  if (window.s.type === "Range") {
    let serialized = new SelectionSerializer(window.s).toJson();
    new RangeMarker(serialized).markText();
  }
});
