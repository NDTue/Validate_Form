import React, { useState } from 'react';
import PropTypes from 'prop-types';

// setActive -> khi click button register sẽ chuyển qua form register
function LoginForm({setActive}) {
    // 'input' có thể là email hoặc username
    const [form, setForm] = useState({ input: '', password: '' }) // chứa tất cả dữ liệu người dùng nhập.
    const [errors, setErrors] = useState({}) // object lưu các thông báo lỗi

    // Hàm xử lý thay đổi Input
    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev,
            [name]: value //Dùng name của input để xác định ô nào đang thay đổi (email hay password).
        }))

        // Nếu có lỗi và người dùng gõ lại thì xóa lỗi ở trường đó
        setErrors(prevErr => ({
            ...prevErr,
            [name]: ''  // sẽ xóa lỗi cho đúng ô đang nhập
        }))
    }

    // Hàm kiểm tra dữ liệu hợp lệ. Nếu không có lỗi, sẽ trả về object rỗng.
    const validate = () => {
        const newErr = {}

        if (!form.input.trim())  // Nếu ô Email || Username rỗng
            newErr.input = 'Email or Username is required'
        if (!form.password.trim())
            newErr.password = 'Password is required'
        return newErr
    }

    // Hàm xử lý submit
    const handleSubmit = (e) => {
        e.preventDefault() // Ngăn form reload trang
        const errorFound = validate()

        // Nếu có lỗi ô input rỗng
        if (Object.keys(errorFound).length > 0) {
            setErrors(errorFound) // Lưu các lỗi này vào state errors để hiển thị lên giao diện
            return  // dừng chương trình vì lỗi
        }

        // Nếu ko có lỗi ô input rỗng -> Ktra thông tin từ localStorage
        const users = JSON.parse(localStorage.getItem('users')) ?? []

        const user = users.find(u => //Tìm user khớp email hoặc username:
            u.email === form.input || u.userName === form.input
        )

        // Nếu thông tin nhập vào sai
        if (!user) {
            setErrors({ input: 'Invalid email or username' })
            return
        }
        if (user.password !== form.password) {
            setErrors({ password: 'Incorrect password' })
            return
        }
        setErrors({})
        alert('Login successful')
    }

    return (
        <div className='mt-3 px-5 pb-5 pt-2 rounded'>
            <form onSubmit={handleSubmit}>
                <div className='text-center'>
                    <h5>Sign in with:</h5>
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
                    <input className={`form-control ${errors.input ? 'is-invalid' : ''}`}
                        type="text" name='input' placeholder='Email or username' value={form.input}
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingInput">Email or username</label>
                    {errors.input && (
                        <div className='invalid-feedback ms-1 mt-1'>{errors.input}</div>
                    )}
                </div>
                <div className="form-floating mb-3">
                    <input className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        type="password" name='password' placeholder='Password' value={form.password}
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingInput">Password</label>
                    {errors.password && (
                        <div className='invalid-feedback ms-1 mt-1'>{errors.password}</div>
                    )}
                </div>

                {/* Remember & Forgot */}
                <div className='d-flex justify-content-around'>
                    <div className='form-check d-flex justify-content-center'>
                        <input className="form-check-input me-2 border-2" type="checkbox"
                            name=''
                        />
                        <label className='fw-semibold'>Remember me</label>
                    </div>
                    <p><a className="link-offset-2 link-underline link-underline-opacity-0" href="#">Forgot password?</a></p>
                </div>

                <button className='btn btn-primary w-100 mt-3'>SIGN IN</button>

                <div className='d-flex justify-content-center mt-4'>
                    <span className='fw-semibold'>Not a member?</span>
                    {/* <span><a href='' className="ms-2 link-offset-2 link-underline link-underline-opacity-0">Register</a></span> */}
                    <span style={{position: 'relative', top: '-3px'}}>
                        <button
                            className="ms-2 btn btn-link p-0 link-offset-2 link-underline link-underline-opacity-0"
                            type="button"
                            onClick={() => setActive('register')}
                        >
                            Register
                        </button>
                    </span>

                </div>
            </form>
        </div>
    );
}

export default LoginForm;