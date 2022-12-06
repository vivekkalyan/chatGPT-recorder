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
  chrome.storage.local.get("treeData2", function(items) {
    message.textContent = "Downloading data!"
    message.hidden = false;
  });
}

function clearMessage() {
  message.hidden = true;
  message.textContent = "";
}
