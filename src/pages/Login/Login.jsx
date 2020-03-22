import React from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as actionCreators from "../../store/actionCreators/index";
import LoginForm from "../../components/login/LoginForm";

import styles from "./login.module.scss";

function Login(props) {
  let history = useHistory();
  let location = useLocation();

  // 路径
  let { from } = location.state || { from: { pathname: "/" } };

  const { changeAuthStateToAuth } = props;
  // 用户登录
  let login = ({ username, password }) => {
    // 修改auth状态，并且跳转
    changeAuthStateToAuth(username, password, history);
    history.replace(from);
  };

  // 跳转到signup页面
  let goSignup = () => {
    history.push("/signup");
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles["login-box"]}>
        <h3 className={styles.title}>通用管理后台</h3>
        <LoginForm submitToParent={login} goSignup={goSignup} />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

const mapDispatchToProps = dispatch => {
  return {
    changeAuthStateToAuth(username, password, history) {
      // ajax request via redux thunk
      const action = actionCreators.login(username, password, history);
      dispatch(action);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
