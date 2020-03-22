import React, { Component } from "react";
import { Form, Icon, Input, Button } from "antd";
import * as styles from "./LoginForm.module.scss";

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.submitToParent(values);
      }
    });
  };

  toParentGoSignup = () => {
    const { goSignup } = this.props;
    goSignup();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles["login-form"]}>
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "请输入用户名！" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="帐号"
              autoComplete="on"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "请输入密码！" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="密码"
              autoComplete="on"
            />
          )}
        </Form.Item>
        <Form.Item>
          <span style={{ color: "#eee" }} onClick={this.toParentGoSignup}>
            现在注册！
          </span>
          <span className={styles["login-form-button"]}>忘记密码</span>
          <Button
            type="primary"
            htmlType="submit"
            className={styles["login-form-button"]}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create({ name: "normal_login" })(LoginForm);

export default WrappedLoginForm;
