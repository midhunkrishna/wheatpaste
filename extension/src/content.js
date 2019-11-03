import SelectionSerializer from "./content/selection_serializer";
import RangeMarker from "./content/range_marker";

document.addEventListener("mouseup", function() {
  window.s = window.getSelection();

  //debugger;
  if (window.s.type === "Range") {
    //    console.debug("serialized", serialized);

    setTimeout(() => {
      let serialized = new SelectionSerializer(window.s).toJson();
      new RangeMarker(serialized).markText();
    }, 4);
  }
});
