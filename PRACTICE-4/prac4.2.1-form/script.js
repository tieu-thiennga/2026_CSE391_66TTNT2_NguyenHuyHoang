const form = document.getElementById('registerForm');
const successDiv = document.getElementById('successMsg');

const REGEX = {
    NAME: /^[a-zA-ZÀ-ỹ\s]{3,}$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^0[0-9]{9}$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
};

function showError(fieldId, message) {
    const field = document.getElementById(fieldId) || document.getElementsByName(fieldId)[0];
    const parent = field.closest('.form-group');
    parent.classList.add('invalid');
    parent.classList.remove('valid');
    parent.querySelector('.error-msg').innerText = message;
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId) || document.getElementsByName(fieldId)[0];
    const parent = field.closest('.form-group');
    parent.classList.remove('invalid');
    parent.classList.add('valid');
    parent.querySelector('.error-msg').innerText = '';
}

function validateName() {
    const val = document.getElementById('fullname').value.trim();
    if (!REGEX.NAME.test(val)) {
        showError('fullname', 'Họ tên từ 3 ký tự, chỉ chứa chữ cái.');
        return false;
    }
    clearError('fullname');
    return true;
}

function validateEmail() {
    const val = document.getElementById('email').value.trim();
    if (!REGEX.EMAIL.test(val)) {
        showError('email', 'Email không đúng định dạng.');
        return false;
    }
    clearError('email');
    return true;
}

function validatePhone() {
    const val = document.getElementById('phone').value.trim();
    if (!REGEX.PHONE.test(val)) {
        showError('phone', 'SĐT phải có 10 số và bắt đầu bằng số 0.');
        return false;
    }
    clearError('phone');
    return true;
}

function validatePassword() {
    const val = document.getElementById('password').value;
    if (!REGEX.PASSWORD.test(val)) {
        showError('password', 'Mật khẩu ≥ 8 ký tự, có chữ hoa, thường và số.');
        return false;
    }
    clearError('password');
    return true;
}

function validateConfirm() {
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    if (confirm !== pass || confirm === "") {
        showError('confirmPassword', 'Mật khẩu xác nhận không khớp.');
        return false;
    }
    clearError('confirmPassword');
    return true;
}

function validateGender() {
    const checked = document.querySelector('input[name="gender"]:checked');
    if (!checked) {
        showError('gender', 'Vui lòng chọn giới tính.');
        return false;
    }
    clearError('gender');
    return true;
}

function validateTerms() {
    const checked = document.getElementById('terms').checked;
    if (!checked) {
        showError('terms', 'Bạn phải đồng ý với điều khoản.');
        return false;
    }
    clearError('terms');
    return true;
}

const fields = ['fullname', 'email', 'phone', 'password', 'confirmPassword'];
fields.forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('blur', () => {
        if (id === 'fullname') validateName();
        if (id === 'email') validateEmail();
        if (id === 'phone') validatePhone();
        if (id === 'password') validatePassword();
        if (id === 'confirmPassword') validateConfirm();
    });
    el.addEventListener('input', () => clearError(id));
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPassValid = validatePassword();
    const isConfirmValid = validateConfirm();
    const isGenderValid = validateGender();
    const isTermsValid = validateTerms();

    if (isNameValid && isEmailValid && isPhoneValid && isPassValid && isConfirmValid && isGenderValid && isTermsValid) {
        form.style.display = 'none';
        successDiv.style.display = 'block';
        document.getElementById('regName').innerText = document.getElementById('fullname').value;
    }
});