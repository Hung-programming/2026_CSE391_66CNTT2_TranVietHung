let students = []
let filteredStudents = []

let sortAsc = true

const nameInput = document.getElementById("name")
const scoreInput = document.getElementById("score")
const addBtn = document.getElementById("addBtn")

const searchInput = document.getElementById("search")
const filterSelect = document.getElementById("filter")

const scoreHeader = document.getElementById("scoreHeader")

const tbody = document.getElementById("tableBody")
const noResult = document.getElementById("noResult")
const stats = document.getElementById("stats")

function getRank(score){

if(score >= 8.5) return "Giỏi"
if(score >= 7) return "Khá"
if(score >= 5) return "Trung bình"
return "Yếu"

}

function addStudent(){

let name = nameInput.value.trim()
let score = parseFloat(scoreInput.value)

if(name === ""){
alert("Họ tên không được trống")
return
}

if(isNaN(score) || score < 0 || score > 10){
alert("Điểm phải từ 0 đến 10")
return
}

students.push({
name:name,
score:score
})

nameInput.value=""
scoreInput.value=""

nameInput.focus()

applyFilters()

}

function applyFilters(){

let keyword = searchInput.value.toLowerCase()
let filterRank = filterSelect.value

filteredStudents = students.filter(sv => {

let matchName = sv.name.toLowerCase().includes(keyword)

let rank = getRank(sv.score)

let matchRank = filterRank === "all" || rank === filterRank

return matchName && matchRank

})

sortStudents()

renderTable()

updateStats()

}

function sortStudents(){

filteredStudents.sort((a,b)=>{

if(sortAsc){
return a.score - b.score
}else{
return b.score - a.score
}

})

scoreHeader.textContent = sortAsc ? "Điểm ▲" : "Điểm ▼"

}

function renderTable(){

tbody.innerHTML=""

if(filteredStudents.length === 0){
noResult.textContent="Không có kết quả"
return
}

noResult.textContent=""

filteredStudents.forEach((sv,index)=>{

let tr=document.createElement("tr")

if(sv.score < 5){
tr.classList.add("low-score")
}

tr.innerHTML=`
<td>${index+1}</td>
<td>${sv.name}</td>
<td>${sv.score}</td>
<td>${getRank(sv.score)}</td>
<td><button data-index="${index}">Xóa</button></td>
`

tbody.appendChild(tr)

})

}

function updateStats(){

let total = students.length

let avg = 0

if(total > 0){

let sum = students.reduce((acc,sv)=>acc + sv.score,0)

avg = (sum / total).toFixed(2)

}

stats.textContent = `Tổng sinh viên: ${total} | Điểm trung bình: ${avg}`

}

tbody.addEventListener("click",function(e){

if(e.target.tagName === "BUTTON"){

let index = e.target.dataset.index

let student = filteredStudents[index]

let realIndex = students.indexOf(student)

students.splice(realIndex,1)

applyFilters()

}

})

addBtn.addEventListener("click",addStudent)

scoreInput.addEventListener("keypress",function(e){

if(e.key === "Enter"){
addStudent()
}

})

searchInput.addEventListener("input",applyFilters)

filterSelect.addEventListener("change",applyFilters)

scoreHeader.addEventListener("click",function(){

sortAsc = !sortAsc

applyFilters()

})

applyFilters()