import Utils from "./../utils";

class RangeMarker {
  constructor(serializedRange) {
    this.range = serializedRange;
  }

  markText() {
    const startNode = Utils.getNodeFromXpath(this.range.startContainer.xpath);
    const endNode = Utils.getNodeFromXpath(this.range.endContainer.xpath);
    const commonAncestor = Utils.getNodeFromXpath(
      this.range.commonAncestor.xpath
    );

    if (startNode && endNode && commonAncestor) {
      Utils.getInlineNodes({
        within: commonAncestor,
        startNode: startNode,
        endNode: endNode
      });
    } else {
      console.log("try css path or id");
    }
  }
}

export default RangeMarker;
