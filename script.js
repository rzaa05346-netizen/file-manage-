async function uploadFile() {

    const fileInput = document.getElementById("fileInput");

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    await fetch("/upload", {
        method: "POST",
        body: formData
    });

    alert("File Uploaded Successfully");
    loadFiles();
}

async function loadFiles() {

    const res = await fetch("/files");
    const files = await res.json();

    const list = document.getElementById("fileList");
    list.innerHTML = "";

    files.forEach(file => {

        const li = document.createElement("li");

        li.innerHTML = `
            ${file}
            <a href="/uploads/${file}" download>Download</a>
            <button onclick="deleteFile('${file}')">Delete</button>
        `;

        list.appendChild(li);
    });
}

async function deleteFile(name) {

    await fetch(`/delete/${name}`, {
        method: "DELETE"
    });

    loadFiles();
}

loadFiles();