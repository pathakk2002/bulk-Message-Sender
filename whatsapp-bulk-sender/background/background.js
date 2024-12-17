chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "sendMessages") {
        const { csvFile, message, mediaFile, sendDelay } = request.data;
        
        // Process CSV file, extract phone numbers (This will be a basic CSV reader for demo purposes)
        const reader = new FileReader();
        reader.onload = function() {
            const csvData = reader.result.split("\n").slice(1);  // Remove header line
            const numbers = csvData.map(line => line.trim()).filter(line => line);
            
            // Iterate through phone numbers and send messages
            numbers.forEach((number, index) => {
                setTimeout(() => {
                    sendMessageToWhatsApp(number, message, mediaFile);
                }, index * sendDelay * 1000);  // Delay between each message
            });
        };

        reader.readAsText(csvFile);
    }
});

function sendMessageToWhatsApp(number, message, mediaFile) {
    const phoneNumber = encodeURIComponent(number);
    const msg = encodeURIComponent(message);
    let url = `https://wa.me/${phoneNumber}?text=${msg}`;

    if (mediaFile) {
        // Handle media sending (if you choose to implement media uploading)
        console.log("Sending media:", mediaFile);
        // For now, we can skip media and send only the message
    }

    // Open the WhatsApp web link to send the message
    chrome.tabs.create({ url });
}
