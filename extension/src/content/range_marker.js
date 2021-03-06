import Utils from "./../utils";
import DefaultStrategy from "./marking/default_strategy";

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
      const strategy = new DefaultStrategy({
        startNode: startNode,
        startOffset: this.range.startOffset,
        endNode: endNode,
        endOffset: this.range.endOffset,
        inBetweeners: Utils.getInlineNodes({
          within: commonAncestor,
          startNode: startNode,
          endNode: endNode
        })
      });

      strategy.markAll();
    } else {
      console.log("try css path or id");
    }
  }
}

export default RangeMarker;
