
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";
import axios from 'axios';

const LOGIN_URL = 'http://127.0.0.1:8000/user/signin/';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();

    }, [])
    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    // const onImgInputBtnClick = (event: any) => {
    //     event.preventDefault();
    //     logoImgInput.current.click();
    // }
    const handleSubmit = async (e) => {
        e.preventDefault(); {/*(e)코드를 작동하지 못하게 하는 메서드*/ }

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }), {
                headers: {
                    "Content-Type": 'application/json',
                },
            });

            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const token = response?.data?.token;
            const roles = response?.data?.roles;
            setAuth({ email, password, roles, token });
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
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <div className="login_container">
                    <section className='login_section'>
                        <img className="smart_img" src='https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png'></img>
                        <p ref={errRef} className={errMsg ? "errmsg" :
                            "offscreen"} aria-live="assertive">{errMsg}</p>
                        <div className='border'>
                            <img className='login_img' width="185" height="70" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"></img>
                            <div className="login">
                                <form onSubmit={handleSubmit}> {/*form전송을 하기 전 입력된 데이터의 유효성 체크하는 것*/}
                                    <div className="email">
                                        <label htmlFor="useremail"></label>
                                        <input
                                            className='login_input'
                                            type="text"
                                            id="useremail"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            required
                                            placeholder="사용자 이름 또는 이메일"
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

                                    <button className='login_button'>로그인</button>
                                </form>
                                {/* <div onSubmit={onImgInputBtnClick   }>
                                        <input
                                            ref={logoImgInput}
                                            type='file'
                                            className='imgInput'
                                            id='logoImg'
                                            accept='image/*'
                                            name='file'
                                            onChange={onImgChange} 
                                        />

                                    </div> */}
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </>
    )
}

export default Login
