import "./scss/signin.css";
import { useState } from "react";
import axios from "axios";
import Header from "../../components/header/header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/slices/authSlice";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [isLoading,setIsLoading] = useState(false)
  const dispatch = useDispatch();

  // const auth = useSelector((state, action) => {
  //   console.log(state.auth);
  // });


const errorEmail = document.querySelector('.emailError_div')
const errorPassword= document.querySelector('.passowrdError_div')


  const signin = async () => {
    // setIsLoading(true)
    const url = "http://localhost:4000/signin";
    try {
      const user = await axios.post(url, {
        Email: email,
        Password: password,
      });

      dispatch(
        authActions.setCredentials({
          user: user.data.user,
          token: user.data.token,
        })
      );
      
      localStorage.setItem('user',JSON.stringify({
        valid:true,
        user:user.data.user,
        token:user.data.token
      }))
      navigate("/");
      
    } catch (err) {
      // setIsLoading(false)
      if(err.response.data.includes('password'))
      errorPassword.textContent =err.response.data
      else if(err.response.data.includes('email'))
      errorEmail.textContent =err.response.data
      console.log(err);
    }
   

  };


  if(isLoading){

    return <h1>'loading please wait...'</h1> 
  } 
  return (
    <div className="signup">
      <Header />
      {}
      <div className="signin_div">
        <div className="form_div">
          <h1 className="form_header">signIn</h1>
          <form onSubmit={(e) => e.preventDefault()} className={"sign_form"}>
           
            <div className="form_input_div">
              {/* <label htmlFor="email">email: </label> */}
              <input
                type="email"
                name={"email"}
                value={email}
                className="input_text"
                onChange={(e) => setEmail((state) => (state = e.target.value))}
                placeholder={"Enter email"}
              />
            </div>
            <div className="emailError_div"></div>
            <div className="form_input_div">
              {/* <label htmlFor="password">password: </label> */}
              <input
                type="password"
                name={"password"}
                value={password}
                className="input_text"
                onChange={(e) =>
                  setPassword((state) => (state = e.target.value))
                }
                placeholder={"Enter password"}
              />
            </div>
            <div className="passowrdError_div"></div>

            <div className="form_input_div">
              <input
                type={"submit"}
                onClick={signin}
                className={"input_submit"}
              />
            </div>
          </form>
          {/* /*<HiArrowSmRight className="arrowIcon"/>*/}
          <div className="login_div">
            <p>Dont have an account?</p>
          </div>
          <a onClick={() => navigate("/signup")} className={"login_tag"}>
            signUp Now!
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
