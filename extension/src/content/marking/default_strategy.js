import Utils from "../../utils";

export default class DefaultStrategy {
  constructor({ startNode, endNode, startOffset, endOffset, inBetweeners }) {
    this.startNode = startNode;
    this.endNode = endNode;
    this.startOffset = startOffset;
    this.endOffset = endOffset;
    this.inBetweeners = inBetweeners;
  }

  markAll() {
    Utils.rangeWrap({
      startNode: this.startNode,
      startOffset: this.startOffset,
      endNode: this.startNode,
      endOffset: this.startNode.data.length - 1,
      wrapper: "mark"
    });

    this.inBetweeners.map(textNode => {
      Utils.wrap(textNode, "mark", Utils.markClasslist);
    });

    Utils.rangeWrap({
      startNode: this.endNode,
      startOffset: 0,
      endNode: this.endNode,
      endOffset: this.endOffset,
      wrapper: "mark"
    });
  }
}
