import React, { useState } from 'react';


function RegisterForm({ setActive }) {
    // chứa tất cả dữ liệu người dùng nhập.
    const [form, setForm] = useState({ // truyền vào name của các input và label
        name: '', userName: '', email: '',
        password: '', repeatPassword: '', agree: false,
    })
    const [errors, setErrors] = useState({}) // object lưu các thông báo lỗi


    // Hàm kiểm tra dữ liệu hợp lệ
    const validate = () => {
        const newErr = {}

        // Danh sách các trường bắt buộc
        const requireField = ['name', 'userName', 'email', 'password', 'repeatPassword']
        requireField.map(field => {
            if (!form[field].trim()) // Nếu chuỗi rỗng tại mỗi ô input
                newErr[field] = 'This field is required'
        })

        if (form.password !== form.repeatPassword)
            newErr.repeatPassword = 'Password does not match'
        if (!form.agree) // kiểm tra đã check agree chưa
            newErr.agree = 'You must agree to the terms'

        return newErr
    }

    // Hàm xử lý thay đổi Input
    const handleChange = (e) => { // 'checked' dành riêng cho checkbox (true/false)
        const { name, value, type, checked } = e.target
        setForm(prev => ({
            ...prev,
            // Nếu là checkbox, thì lấy checked (true/false)
            [name]: type === 'checkbox' ? checked : value
        }))

        setErrors(prevErr => ({
            ...prevErr,
            [name]: ''
        }))
    }

    // Hàm xử lý Submit
    const handleSubmit = (e) => {
        e.preventDefault() // Ngăn form reload trang

        const errorFound = validate() // Kiểm tra các lỗi

        // Nếu có lỗi (tức là errorFound không rỗng)
        if (Object.keys(errorFound).length > 0) {
            setErrors(errorFound) // Lưu các lỗi này vào state errors để hiển thị lên giao diện
            return  // Dừng lại, không thực hiện các bước tiếp theo (vì form đang bị lỗi)
        }

        setErrors({}) // Nếu hết lỗi hoặc không có lỗi -> Xóa lỗi cũ

        // Lấy danh sách users từ localStorage (nếu chưa có thì dùng mảng rỗng [])
        const users = JSON.parse(localStorage.getItem('users')) ?? []

        // Kiểm tra email hoặc username đã tồn tại chưa
        const isEmailExist = users.some(user => user.email === form.email)
        const isUserNameExist = users.some(user => user.userName === form.userName)
        if (isEmailExist || isUserNameExist) {
            const existError = {}
            if (isEmailExist) existError.email = 'Email already exists'
            if (isUserNameExist) existError.userName = 'User Name already exists'
            setErrors(existError) // Cập nhật lỗi vào state
            return // Dừng chương trình khi bị lỗi
        }


        // Nếu ko lỗi -> Thêm người dùng mới vào danh sách
        users.push({
            name: form.name,
            userName: form.userName,
            email: form.email,
            password: form.password,
        })

        // Lưu danh sách users mới vào localStorage
        localStorage.setItem('users', JSON.stringify(users))
        alert("Register successful!");

        // Set lại form sau khi đky thành công
        setForm({ name: '', userName: '', email: '', password: '', repeatPassword: '', agree: false })
        setActive('login')
    }


    return (
        <div className="mt-3 px-5 pb-5 pt-2 rounded">
            <form onSubmit={handleSubmit}>  {/* Xử lý form khi submit */}
                <div className="buttons-social text-center">
                    <h5 className='mb-2'>Sign up with:</h5>
                    {/* Social List */}
                    <button type='button' className='custom-btn__icon btn-floating mx-1'>
                        <i className="bi bi-facebook"></i>
                    </button>
                    <button type='button' className='custom-btn__icon btn-floating mx-1'>
                        <i className="bi bi-google"></i>
                    </button>
                    <button type='button' className='custom-btn__icon btn-floating mx-1'>
                        <i className="bi bi-twitter-x"></i>
                    </button>
                    <button type='button' className='custom-btn__icon btn-floating mx-1'>
                        <i className="bi bi-github"></i>
                    </button>
                    <h5>or:</h5>
                </div>

                {/* Inputs */}
                <div className="form-floating mb-3">
                    {/* Có lỗi thì thêm class 'is-invalid' */}
                    <input className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        type="text" name='name' placeholder='Name' value={form.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingInput">Name</label>
                    {errors.name && (
                        <div className='invalid-feedback ms-1 mt-1'>{errors.name}</div>
                    )}
                </div>
                <div className="form-floating mb-3">
                    {/* Có lỗi thì thêm class 'is-invalid' */}
                    <input className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
                        type="text" name='userName' placeholder='Username' value={form.userName}
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingInput">Username</label>
                    {errors.userName && (
                        <div className='invalid-feedback ms-1 mt-1'>{errors.userName}</div>
                    )}
                </div>
                <div className="form-floating mb-3">
                    {/* Có lỗi thì thêm class 'is-invalid' */}
                    <input className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        type="email" name='email' placeholder='Email' value={form.email}
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingInput">Email</label>
                    {errors.email && (
                        <div className='invalid-feedback ms-1 mt-1'>{errors.email}</div>
                    )}
                </div>
                <div className="form-floating mb-3">
                    {/* Có lỗi thì thêm class 'is-invalid' */}
                    <input className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        type="password" name='password' placeholder='Password' value={form.password}
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingInput">Password</label>
                    {errors.password && (
                        <div className='invalid-feedback ms-1 mt-1'>{errors.password}</div>
                    )}
                </div>
                <div className="form-floating mb-3">
                    {/* Có lỗi thì thêm class 'is-invalid' */}
                    <input className={`form-control ${errors.repeatPassword ? 'is-invalid' : ''}`}
                        type="password" name='repeatPassword' placeholder='Repeat password' value={form.repeatPassword}
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingInput">Confirm password</label>
                    {errors.repeatPassword && (
                        <div className='invalid-feedback ms-1 mt-1'>{errors.repeatPassword}</div>
                    )}
                </div>
                
                <div className="form-check d-flex flex-column align-items-center">
                    {/* Checkbox */}
                    <div>
                        <input
                            className={`form-check-input me-2 border-2 ${errors.agree ? 'is-invalid' : ''}`}
                            type="checkbox" name="agree" checked={form.agree}
                            onChange={handleChange}
                        />
                        <label>I have read and agree to the terms</label>
                    </div>

                    {/* Lỗi hiển thị nếu không tick */}
                    {errors.agree && (
                        <div className="invalid-feedback d-block mt-1 text-center">
                            {errors.agree}
                        </div>
                    )}
                </div>


                <button className='btn btn-primary w-100 mt-3'>SIGN UP</button>
            </form>
        </div>
    );
}

export default RegisterForm;