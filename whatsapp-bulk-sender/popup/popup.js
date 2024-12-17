// Switch between tabs (Home and Settings)
document.getElementById("home-tab").addEventListener("click", () => {
    document.getElementById("home-content").classList.add("active");
    document.getElementById("settings-content").classList.remove("active");
    document.getElementById("home-tab").classList.add("active");
    document.getElementById("settings-tab").classList.remove("active");
});

document.getElementById("settings-tab").addEventListener("click", () => {
    document.getElementById("home-content").classList.remove("active");
    document.getElementById("settings-content").classList.add("active");
    document.getElementById("home-tab").classList.remove("active");
    document.getElementById("settings-tab").classList.add("active");
});

// Download Sample CSV
document.getElementById("download-sample").addEventListener("click", () => {
    const sampleCSV = `Phone Number\n+1234567890\n+0987654321`;
    const blob = new Blob([sampleCSV], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample.csv";
    a.click();
});

// Send Messages (This would interact with background script)
document.getElementById("send-btn").addEventListener("click", () => {
    const csvFile = document.getElementById("csv-file").files[0];
    const message = document.getElementById("message").value;
    const mediaFile = document.getElementById("media-file").files[0];
    const sendDelay = document.getElementById("send-delay").value;

    if (!csvFile || !message) {
        alert("Please upload a CSV file and enter a message.");
        return;
    }

    const formData = new FormData();
    formData.append("csvFile", csvFile);
    formData.append("message", message);
    formData.append("mediaFile", mediaFile);
    formData.append("sendDelay", sendDelay);

    // Send the data to the background script for processing
    chrome.runtime.sendMessage({ action: "sendMessages", data: formData });
});
