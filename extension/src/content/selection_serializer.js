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
    return {
      ...this._extractNodeInformation(this.range.startContainer),
      parentNode: this._extractNodeInformation(
        this.range.startContainer.parentNode
      )
    };
  }

  endContainer() {
    return {
      ...this._extractNodeInformation(this.range.endContainer),
      parentNode: this._extractNodeInformation(
        this.range.endContainer.parentNode
      )
    };
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

  _classList(node) {
    // #text.classList = undefined
    return node.classList || [];
  }

  _extractNodeInformation(node) {
    const classList = [];
    this._classList(node).forEach(item => {
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
