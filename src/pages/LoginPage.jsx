import { Link } from 'react-router-dom';
import './LoginPage.css';
import { useEffect , useRef } from 'react';

function LoginPage() {
    
    const handleSubmit = (e) => {
    e.preventDefault();  
  };

    const inputRef = useRef(null)
    useEffect(()=>{
      inputRef.current.focus();
    },[])
  
    return (
    <div className="login-page">
      <Link to="/" className="back-link">← Back to main page</Link>
      
      <div className="login-container">
        <h2>Enter an acc</h2>
        
        <form onSubmit={handleSubmit}>  
          <div className="form-group">
            <label>Email</label>
            <input ref={inputRef} type="email" placeholder="example@mail.com" />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          
          <button type="submit" className="login-button">
            Enter
          </button>
        </form>
        
        <p className="register-link">
          Don't have an acc? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;