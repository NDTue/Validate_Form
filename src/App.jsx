import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './App.css'
import RegisterForm from './components/RegisterForm'
import { useState } from 'react';
import LoginForm from './components/LoginForm';

function App() {
  // State lưu tab hiện tại đang được chọn: 'login' hoặc 'register'
  const [activeForm, setActiveForm] = useState('login')

  return (
    <div className='custom-container'>
      <div className='py-3'>
        <div className='custom-form rounded'>
          {/* Tabs - Login/Register */}
          <div className="px-5 pt-5 d-flex justify-content-center mb-2">
            <button className={`custom-btn__form mx-2 ${activeForm === 'login' ? 'custom-active' : 'btn-secondary'}`}
              onClick={() => setActiveForm('login')}
            >
              LOGIN
            </button>
            <button className={`custom-btn__form mx-2 ${activeForm === 'register' ? 'custom-active' : 'btn-secondary'}`}
              onClick={() => setActiveForm('register')}
            >
              REGISTER
            </button>
          </div>

          {activeForm === 'login' && <LoginForm setActive={setActiveForm}/> }
          {activeForm === 'register' && <RegisterForm setActive={setActiveForm}/>}

        </div>
      </div>
    </div>
  )
}

export default App
