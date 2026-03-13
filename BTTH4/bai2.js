const form = document.getElementById("registerForm")

function showError(id,msg){
document.getElementById(id+"Error").textContent = msg
}

function clearError(id){
document.getElementById(id+"Error").textContent = ""
}

function validateFullname(){
let name = fullname.value.trim()

let regex = /^[A-Za-zÀ-ỹ\s]{3,}$/

if(!regex.test(name)){
showError("fullname","Tên phải ≥3 ký tự và chỉ chứa chữ")
return false
}

clearError("fullname")
return true
}

function validateEmail(){
let value = email.value.trim()

let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!regex.test(value)){
showError("email","Email không hợp lệ")
return false
}

clearError("email")
return true
}

function validatePhone(){
let value = phone.value.trim()

let regex = /^0\d{9}$/

if(!regex.test(value)){
showError("phone","SĐT phải 10 số và bắt đầu bằng 0")
return false
}

clearError("phone")
return true
}

function validatePassword(){
let value = password.value

let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

if(!regex.test(value)){
showError("password","≥8 ký tự, có hoa, thường, số")
return false
}

clearError("password")
return true
}

function validateConfirm(){
if(confirm.value !== password.value){
showError("confirm","Mật khẩu không khớp")
return false
}

clearError("confirm")
return true
}

function validateGender(){

let gender = document.querySelector('input[name="gender"]:checked')

if(!gender){
showError("gender","Chọn giới tính")
return false
}

clearError("gender")
return true
}

function validateTerms(){

if(!terms.checked){
showError("terms","Phải đồng ý điều khoản")
return false
}

clearError("terms")
return true
}

form.addEventListener("submit",function(e){

e.preventDefault()

let valid =
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirm() &
validateGender() &
validateTerms()

if(valid){

form.style.display="none"

success.textContent = "Đăng ký thành công 🎉 Xin chào " + fullname.value

}

})

document.querySelectorAll("input").forEach(el=>{

el.addEventListener("blur",function(){

if(this.id==="fullname") validateFullname()
if(this.id==="email") validateEmail()
if(this.id==="phone") validatePhone()
if(this.id==="password") validatePassword()
if(this.id==="confirm") validateConfirm()

})

el.addEventListener("input",function(){
clearError(this.id)
})

})