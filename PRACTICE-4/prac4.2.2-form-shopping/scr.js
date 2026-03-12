const prices = { "Laptop": 200000000, "Phone": 70000000, "Tablet": 35000000 };

const orderForm = document.getElementById('orderForm');
const productSelect = document.getElementById('product');
const quantityInput = document.getElementById('quantity');
const totalDisplay = document.getElementById('totalDisplay');

const today = new Date().toISOString().split("T")[0];
document.getElementById("deliveryDate").min = today;


function calculateTotal() {
    const price = prices[productSelect.value] || 0;
    const qty = parseInt(quantityInput.value) || 0;
    const total = price * qty;
    totalDisplay.innerText = total.toLocaleString('vi-VN') + "đ";
}

productSelect.addEventListener('change', calculateTotal);
quantityInput.addEventListener('input', calculateTotal);

function showError(id, msg) { document.getElementById('err-' + id).innerText = msg; }
function clearError(id) { document.getElementById('err-' + id).innerText = ""; }

orderForm.onsubmit = function(e) {
    e.preventDefault();
    let ok = true;

    if (!productSelect.value) { showError('product', 'Chưa chọn sản phẩm'); ok = false; } else clearError('product');
    if (quantityInput.value < 1) { showError('quantity', 'Số lượng ít nhất là 1'); ok = false; } else clearError('quantity');
    if (document.getElementById('address').value.length < 10) { showError('address', 'Địa chỉ quá ngắn'); ok = false; } else clearError('address');
    if (!document.getElementById('deliveryDate').value) { showError('date', 'Chưa chọn ngày'); ok = false; } else clearError('date');

    if (ok) {
        document.getElementById('summaryContent').innerHTML = `
            <p>Sản phẩm: ${productSelect.value}</p>
            <p>Tổng tiền: ${totalDisplay.innerText}</p>
        `;
        document.getElementById('confirmBox').style.display = 'flex';
    }
};

document.getElementById('btnCancel').onclick = () => document.getElementById('confirmBox').style.display = 'none';
document.getElementById('btnFinalConfirm').onclick = () => {
    alert("Bạn đã hoàn thành đơn hàng!");
    location.reload();
};