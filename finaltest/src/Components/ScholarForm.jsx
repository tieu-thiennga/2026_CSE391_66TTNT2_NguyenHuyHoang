import { useState } from "react";

function ScholarForm({ onAdd, onClose }) {
    const [name, setName] = useState("");
    const [sponsor, setSponsor] = useState("");
    const [value, setValue] = useState("$ ");
    const [email, setEmail] = useState("");
    const [deadline, setDeadline] = useState("");

    const [errors, setErrors] = useState({});

    const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // NAME
    if (!name.trim()) {
        newErrors.name = "Scholarship name is required";
    } else if (name.length > 50) {
        newErrors.name = "Name must not exceed 50 characters";
    }

    // SPONSOR
    if (!sponsor.trim()) {
        newErrors.sponsor = "Sponsor is required";
    }

    // VALUE (phải là số dương)
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (!value.trim()) {
        newErrors.value = "Value is required";
    } else if (isNaN(numericValue) || numericValue <= 0) {
        newErrors.value = "Value must be a positive number";
    }

    // EMAIL
    if (!email.trim()) {
        newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
        newErrors.email = "Invalid email format";
    }

    // DEADLINE (không được là quá khứ)
    if (!deadline) {
        newErrors.deadline = "Deadline is required";
    } else {
        const today = new Date();
        const selectedDate = new Date(deadline);

        // reset giờ về 0 để so sánh đúng ngày
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            newErrors.deadline = "Deadline cannot be in the past";
        }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onAdd({ id: Date.now(), name, sponsor, value, email, deadline });
        setName("");
        setSponsor("");
        setValue("");
        setEmail("");
        setDeadline("");
        setErrors({});
            onClose();
        }
    };

    return (
        <div className="custom-form-container">
            <div className="custom-form-header">
                <span>Add new schoolar ship</span>
                <button type="button" className="close-x-btn" onClick={onClose}>×</button>
            </div>

            <form className="custom-form-body" onSubmit={handleSubmit}>
                <div className="custom-form-row">
                    <div className="custom-form-group">
                        <label>Scholarship name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Program title" />
                        {errors.name && <span className="error-msg">{errors.name}</span>}
                    </div>
                    <div className="custom-form-group">
                        <label>Sponsor</label>
                        <input type="text" value={sponsor} onChange={(e) => setSponsor(e.target.value)} placeholder="Company/foundation" />
                        {errors.sponsor && <span className="error-msg">{errors.sponsor}</span>}
                    </div>
                </div>

                <div className="custom-form-row">
                    <div className="custom-form-group">
                        <label>Value(USD)</label>
                        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="eg. 1200" />
                        {errors.value && <span className="error-msg">{errors.value}</span>}
                    </div>
                    <div className="custom-form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contact@example" />
                        {errors.email && <span className="error-msg">{errors.email}</span>}
                    </div>
                </div>

                <div className="custom-form-row">
                    <div className="custom-form-group">
                        <label>Deadline</label>
                        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="Nhập thời hạn" />
                        {errors.deadline && <span className="error-msg">{errors.deadline}</span>}
                    </div>
                </div>

                <div className="custom-form-footer">
                    <button type="submit" className="btn-save-green">Save</button>
                    <button type="button" className="btn-cancel-gray" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default ScholarForm;
