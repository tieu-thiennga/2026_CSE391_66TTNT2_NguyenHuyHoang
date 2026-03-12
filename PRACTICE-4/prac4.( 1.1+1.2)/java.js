let students = JSON.parse(localStorage.getItem('studentList')) || []; 
let sortDirection = 0; 

const nameInput = document.getElementById('txtName');
const scoreInput = document.getElementById('txtScore');
const tableBody = document.getElementById('tableBody');

const getGrade = (s) => s >= 8.5 ? "Giỏi" : s >= 7.0 ? "Khá" : s >= 5.0 ? "Trung bình" : "Yếu";
function saveToLocal() {
    localStorage.setItem('studentList', JSON.stringify(students));
}

function renderTable() {
    const keyword = document.getElementById('txtSearch').value.toLowerCase();
    const gradeFilter = document.getElementById('selGrade').value;

    let filtered = students.filter(s => {
        const matchName = s.name.toLowerCase().includes(keyword);
        const matchGrade = (gradeFilter === "All" || getGrade(s.score) === gradeFilter);
        return matchName && matchGrade;
    });

    if (sortDirection !== 0) {
        filtered.sort((a, b) => (a.score - b.score) * sortDirection);
    }

    tableBody.innerHTML = filtered.length ? "" : '<tr><td colspan="5" style="text-align:center">Không có kết quả</td></tr>';
    
    filtered.forEach((s, idx) => {
        const row = document.createElement('tr');
        if (s.score < 5) row.style.backgroundColor = 'yellow'; 

        row.innerHTML = `
            <td>${idx + 1}</td>
            <td><strong>${s.name}</strong></td>
            <td>${s.score}</td>
            <td>${getGrade(s.score)}</td>
            <td style="text-align:center">
                <button class="btn-delete" data-id="${s.id}">Xóa</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    updateStats(filtered);
}

function addStudent() {
    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if (!name || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập họ tên và điểm hợp lệ (0-10)!");
        return;
    }

    students.push({ id: Date.now(), name, score });
    
    saveToLocal();
    
    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();
    
    renderTable();
}

function updateStats(list) {
    const total = list.length;
    const avg = total ? (list.reduce((sum, s) => sum + s.score, 0) / total).toFixed(2) : 0;
    document.getElementById('statistics').innerText = `Tổng số: ${total} | Điểm TB: ${avg}`;
}

document.getElementById('btnAdd').onclick = addStudent;
scoreInput.onkeypress = (e) => { if(e.key === "Enter") addStudent(); };

tableBody.onclick = (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const id = parseInt(e.target.dataset.id);
        if(confirm("Bạn có chắc muốn xóa sinh viên này?")) {
            students = students.filter(s => s.id !== id);
            saveToLocal(); 
            renderTable();
        }
    }
};

document.getElementById('txtSearch').oninput = renderTable;
document.getElementById('selGrade').onchange = renderTable;

document.getElementById('sortScore').onclick = () => {
    if (sortDirection === 0 || sortDirection === -1) sortDirection = 1;
    else sortDirection = -1;
    document.getElementById('sortIcon').innerText = sortDirection === 1 ? "▲" : "▼";
    renderTable();
};
renderTable();