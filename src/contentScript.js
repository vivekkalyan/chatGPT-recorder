function updateData() {
  var divs = Array.from(document.getElementsByTagName("div"))
  var conversationItems = divs.filter(div => Array.from(div.classList).some(cls => cls.includes("text-base")))
  let conversationTexts = [];
  for (const conversationItem of conversationItems) {
    console.log(conversationItem)
    const para_code_blocks = conversationItem.querySelectorAll(["p", "pre"]);
    if (para_code_blocks.length == 0) {
      // questions
      conversationTexts.push(conversationItem.innerText);
    } else {
      //answers
      conversationParas = [];
      for (const block of para_code_blocks) {
        console.log(block.tagName)
        if (block.tagName == "P") {
          let text = block.innerHTML;
          text = text.replace(/<\/?code>/g, "`");
          conversationParas.push(text);
        } else if (block.tagName == "PRE") {
          let text = block.innerText;
          text = text.replace(/^Copy code\n/, "```\n");
          text = text.replace(/\n$/, "\n```");
          conversationParas.push(text);
        }
      }
      console.log(conversationParas);
      conversationTexts.push(conversationParas.join("\n\n"))
    }
  }
  console.log(conversationTexts);
  chrome.storage.local.get("treeData2", function(items) {
    conversationTree = JSON.parse(items["treeData2"] || JSON.stringify([]));
    updateTree(conversationTree, conversationTexts);
    chrome.storage.local.set({ "treeData2": JSON.stringify(conversationTree) }, function () {
      console.log("Value set to: " + JSON.stringify(conversationTree));
    });
  });
}

function updateTree(conversationTree, conversationTexts) {
  if (conversationTexts.length == 0) {
    return
  }
  var firstText = conversationTexts.shift();
  if (!conversationTree.map(x => x.value).includes(firstText)) {
    conversationTree.push({"value": firstText, "children": []});
  }
  var conversationBranch = conversationTree.filter(x => x.value == firstText)[0]["children"];
  updateTree(conversationBranch, conversationTexts);
}

function showData() {
  chrome.storage.local.get("data", function(items) {
    console.log("Value is get as: " + items[0]["data"]);
  });

}

setInterval(updateData, 5000);
