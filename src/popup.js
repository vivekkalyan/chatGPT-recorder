const form = document.getElementById("control-row");
const message = document.getElementById("message");

form.addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();

  clearMessage();

  let message = await downloadData();
  setMessage(message);
}

async function downloadData() {
  chrome.storage.local.get("treeData", function(items) {
    const filename = "chatgpt-records_" + Date.now() + ".json";
    message.textContent = "Downloaded to " + filename;
    message.hidden = false;
    const blob = new Blob([items["treeData"]], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({
      url: url,
      filename: filename
    });
  });
}

function clearMessage() {
  message.hidden = true;
  message.textContent = "";
}
