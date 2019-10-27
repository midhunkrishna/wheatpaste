import Utils from "./../utils";

class SelectionSerializer {
  constructor(selection) {
    this.selection = selection;
    this.range = selection.getRangeAt(0);
  }

  commonAncestorContainer() {
    const commonAncestor = this.range.commonAncestorContainer;
    return this._extractNodeInformation(commonAncestor);
  }

  startContainer() {
    const parentNode = this.range.startContainer.parentNode;
    return this._extractNodeInformation(parentNode);
  }

  endContainer() {
    const parentNode = this.range.endContainer.parentNode;
    return this._extractNodeInformation(parentNode);
  }

  text() {
    return this.range.toString();
  }

  toJson() {
    if (this.selection.type === "Range") {
      return {
        type: this.selection.type,
        text: this.text(),
        commonAncestor: this.commonAncestorContainer(),
        startContainer: this.startContainer(),
        endContainer: this.endContainer(),
        startOffset: this.range.startOffset,
        endOffset: this.range.endOffset
      };
    } else {
      return {
        type: this.selection.type
      };
    }
  }

  _extractNodeInformation(node) {
    const classList = [];
    node.classList.forEach(item => {
      classList.push(item);
    });

    return {
      id: node.id,
      classList: classList,
      tagName: node.tagName,
      xpath: Utils.getAbsoluteXPath(node)
    };
  }
}

export default SelectionSerializer;
