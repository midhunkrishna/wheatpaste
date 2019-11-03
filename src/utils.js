const Utils = {
  wrap: (node, wrapper) => {
    // wrap
    // - node: html node object
    // - wrapper: text representation of node, eg: 'div', 'mark'

    const parent = node.parentNode;
    const realizedWrapper = document.createElement(wrapper);
    const nextSibling = node.nextElementSibling;

    if (nextSibling) {
      parent.insertBefore(realizedWrapper, nextSibling);
    } else {
      parent.insertBefore(realizedWrapper, null);
    }

    realizedWrapper.appendChild(node);
    return wrapper;
  },

  markAll: ({ startNode, endNode, startOffset, endOffset, inBetweeners }) => {
    // debugger;
    window.a = {
      startNode,
      endNode,
      inBetweeners
    };
    console.log("running markall");

    inBetweeners.map(textNode => {
      Utils.wrap(textNode, "mark");
    });
  },

  getInlineNodes: ({ within, startNode, endNode }) => {
    let pastStartNode = false,
      reachedEndNode = false,
      nodeList = [];

    const whiteListed = node => {
      console.log(node);
      return node.nodeName === "#text" && node.textContent.trim() !== "";
    };

    const fetchNodes = ({ within }) => {
      if (within == startNode) {
        pastStartNode = true;
      } else if (within == endNode) {
        reachedEndNode = true;
      } else if (whiteListed(within)) {
        if (pastStartNode && !reachedEndNode) {
          nodeList.push(within);
        }
      } else {
        for (
          let i = 0, len = within.childNodes.length;
          !reachedEndNode && i < len;
          ++i
        ) {
          fetchNodes({ within: within.childNodes[i] });
        }
      }
    };

    fetchNodes({ within });
    window.nl = nodeList;
    return nodeList;
  },

  getNodeFromXpath: xpath => {
    if (typeof $x === "function") {
      return $x(xpath)[0];
    } else {
      const nodeList = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.ANY_TYPE,
        null
      );
      return nodeList.iterateNext();
    }
  },

  getAbsoluteXPath: element => {
    var comp,
      comps = [];
    var parent = null;
    var xpath = "";
    var getPos = function(element) {
      var position = 1,
        curNode;
      if (element.nodeType == Node.ATTRIBUTE_NODE) {
        return null;
      }
      for (
        curNode = element.previousSibling;
        curNode;
        curNode = curNode.previousSibling
      ) {
        if (curNode.nodeName == element.nodeName) {
          ++position;
        }
      }
      return position;
    };

    if (element instanceof Document) {
      return "/";
    }

    for (
      ;
      element && !(element instanceof Document);
      element =
        element.nodeType == Node.ATTRIBUTE_NODE
          ? element.ownerElement
          : element.parentNode
    ) {
      comp = comps[comps.length] = {};
      switch (element.nodeType) {
        case Node.TEXT_NODE:
          comp.name = "text()";
          break;
        case Node.ATTRIBUTE_NODE:
          comp.name = "@" + element.nodeName;
          break;
        case Node.PROCESSING_INSTRUCTION_NODE:
          comp.name = "processing-instruction()";
          break;
        case Node.COMMENT_NODE:
          comp.name = "comment()";
          break;
        case Node.ELEMENT_NODE:
          comp.name = element.nodeName;
          break;
      }
      comp.position = getPos(element);
    }

    for (var i = comps.length - 1; i >= 0; i--) {
      comp = comps[i];
      xpath += "/" + comp.name.toLowerCase();
      if (comp.position !== null) {
        xpath += "[" + comp.position + "]";
      }
    }
    return xpath;
  }
};

export default Utils;
