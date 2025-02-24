// elemen input dan list container
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Fungsi untuk menampilkan notifikasi
function showNotification(message, type = "success") {
    const notification = document.getElementById("notification");
    notification.textContent = message;

    if (type === "success") {
        notification.style.background = "#4CAF50"; 
    } else if (type === "error") {
        notification.style.background = "#FF5733"; 
    }

    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000); 
}
// Fungsi untuk menambahkan tugas
function addTask() {
    let taskText = inputBox.value.trim(); 

    if (taskText === "") {
        showNotification("Anda harus menulis sesuatu!", "error");
        return;  
    }

    // Buat elemen <li> untuk tugas baru
    let li = document.createElement("li");
    li.innerHTML = `<span class="task-text">${taskText}</span>`;
    

    li.addEventListener("click", function () {
        this.classList.toggle("checked");
        saveData();
    });
    

    // Buat tombol Edit
    let editButton = document.createElement("button");
    editButton.classList.add("edit");
    let editIcon = document.createElement("img");
    editIcon.src = "edit.png";  
    editIcon.alt = "Edit";
    editIcon.width = 20;  
    editButton.appendChild(editIcon);
    editButton.onclick = () => editTask(li);

    // Buat tombol Hapus
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    let deleteIcon = document.createElement("img");
    deleteIcon.src = "delete.png";  
    deleteIcon.alt = "Delete";
    deleteIcon.width = 20;  
    deleteButton.appendChild(deleteIcon);
    deleteButton.onclick = () => deleteTask(li);

    // Tambahkan tombol ke dalam <li>
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    listContainer.appendChild(li);  

    inputBox.value = "";  
    saveData();  
    showNotification("List berhasil ditambahkan!", "success");
}

// Fungsi untuk mengedit tugas
function editTask(taskElement) {
    let newText = prompt("Edit tugas:", taskElement.querySelector(".task-text").textContent);
    if (newText !== null && newText.trim() !== "") {
        taskElement.querySelector(".task-text").textContent = newText.trim();
        saveData();  
        showNotification("List berhasil diedit!", "success");
    } else {
        showNotification("Edit dibatalkan atau input kosong!", "error");
    }
}

// Fungsi untuk menghapus tugas dengan konfirmasi
function deleteTask(taskElement) {
    if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
        taskElement.remove();
        saveData();  
        showNotification("List berhasil dihapus!", "success");
    }
}

// Fungsi untuk menyimpan data ke localStorage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Fungsi untuk menampilkan tugas yang tersimpan
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";

    
    document.querySelectorAll("li").forEach(li => {
        if (!li.dataset.listener) {  
            li.addEventListener("click", function () {
                this.classList.toggle("checked");
                saveData();
            });
            li.dataset.listener = "true"; 
        }
    });
    

    document.querySelectorAll(".edit").forEach(button => {
        button.onclick = function () {
            editTask(this.parentElement);
        };
    });

    document.querySelectorAll(".delete").forEach(button => {
        button.onclick = function () {
            deleteTask(this.parentElement);
        };
    });
}

// Panggil fungsi showTask() saat halaman dimuat
showTask();

// Tambahkan event listener untuk tombol Add
document.getElementById("add-btn").addEventListener("click", addTask);

// Tambahkan event listener untuk menekan "Enter" di input
inputBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});


const editModal = document.getElementById("edit-modal");
const deleteModal = document.getElementById("delete-modal");
const editInput = document.getElementById("edit-input");
const saveEditBtn = document.getElementById("save-edit");
const cancelEditBtn = document.getElementById("cancel-edit");
const confirmDeleteBtn = document.getElementById("confirm-delete");
const cancelDeleteBtn = document.getElementById("cancel-delete");

let currentTask = null; 


function editTask(taskElement) {
    currentTask = taskElement;
    editInput.value = taskElement.querySelector(".task-text").textContent;
    editModal.style.display = "flex"; 
}

// Simpan perubahan saat tombol "Simpan" ditekan
saveEditBtn.onclick = () => {
    if (currentTask) {
        currentTask.querySelector(".task-text").textContent = editInput.value.trim();
        saveData();
        showNotification("Tugas berhasil diperbarui!", "success");
    }
    editModal.style.display = "none"; 
};

// Tutup modal edit jika klik "Batal"
cancelEditBtn.onclick = () => {
    editModal.style.display = "none";
};

// Fungsi untuk menampilkan modal hapus
function deleteTask(taskElement) {
    currentTask = taskElement;
    deleteModal.style.display = "flex"; 
}

// Hapus tugas saat tombol "Hapus" diklik
confirmDeleteBtn.onclick = () => {
    if (currentTask) {
        currentTask.remove();
        saveData();
        showNotification("Tugas berhasil dihapus!", "success");
    }
    deleteModal.style.display = "none"; 
};

// Tutup modal hapus jika klik "Batal"
cancelDeleteBtn.onclick = () => {
    deleteModal.style.display = "none";
};
