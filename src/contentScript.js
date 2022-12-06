function updateData() {
  var divs = Array.from(document.getElementsByTagName("div"))
  var conversationItems = divs.filter(div => Array.from(div.classList).some(cls => cls.includes("ConversationItem__Message")))
  var conversationText = conversationItems.map(item => item.innerText)
  var conversationTextStr = JSON.stringify(conversationText)
  chrome.storage.local.set({ "data": conversationTextStr }, function () {
    console.log("Value is set to: " + conversationTextStr);
  });
}

function updateTree(conversationTree, conversationTexts) {
  var firstText = conversationTexts.shift();
  if (!conversationTree.map(x => x.value).includes(firstText)) {
    conversationTree.push({"value": firstText, "children": []});
  }
  var conversationBranch = conversationTree.filter(x => x.value == firstText)[0]["children"];
  if (conversationTexts.length > 0) {
    updateTree(conversationBranch, conversationTexts);
  }
}

function showData() {
  chrome.storage.local.get("data", function(items) {
    console.log("Value is get as: " + items[0]["data"]);
  });

}

setInterval(updateData, 5000);
setInterval(showData, 10000);
