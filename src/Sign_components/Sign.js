import { Link } from 'react-router-dom';
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";
import axios from 'axios';

const LOGIN_URL = 'http://127.0.0.1:8000/user/signin/';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();


    //이메일 이름 비밀번호
    const [email, setEmail] = useState('');
    const [nickname, setName] = useState('');
    const [password, setPwd] = useState('');

    //성공실패 여부
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();

    }, [])
    useEffect(() => {
        setErrMsg('');
    }, [email, nickname, password])

    const handleSubmit = async (e) => {
        e.preventDefault(); {/*(e)코드를 작동하지 못하게 하는 메서드*/ }

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, nickname, password }), {
                headers: {
                    "Content-Type": 'application/json',
                },
            });
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const token = response?.data?.token;
            const roles = response?.data?.roles;
            setAuth({ email, nickname, password, roles, token });
            setEmail('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            }
            else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            }
            else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            }
            else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }
    return (
        <Link to="/sign">
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <div className="sign_container">
                    <section className='login_section'>
                        <p ref={errRef} className={errMsg ? "errmsg" :
                            "offscreen"} aria-live="assertive">{errMsg}</p>
                        <div className='sign_border'>
                            <img className='sign_img' width="185" height="70" src="./image/pngegg.png"></img>
                            <div className="sign">
                                <form onSubmit={handleSubmit}> {/*form전송을 하기 전 입력된 데이터의 유효성 체크하는 것*/}
                                    <div className="email">
                                        <label htmlFor="useremail"></label>
                                        <input
                                            className='sign_input'
                                            type="text"
                                            id="useremail"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            required
                                            placeholder="휴대폰 번호 또는 이메일 주소"
                                        />
                                    </div>
                                    <div className="nickname">
                                        <label htmlFor="nickname"></label>
                                        <input
                                            className='sign_input'
                                            type="nickname"
                                            id="nickname"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setName(e.target.value)}
                                            value={nickname}
                                            required
                                            placeholder="성명"
                                        />
                                    </div>
                                    <div className="pwd">
                                        <label htmlFor="password"></label>
                                        <input
                                            className='login_input'
                                            type="password"
                                            id="password"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setPwd(e.target.value)}
                                            value={password}
                                            required
                                            placeholder="비밀번호"
                                        />
                                    </div>
                                    <button className='sign_button'>Sign In</button>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </Link>
    )
}

export default Login
