import React, { Component } from "react";
import { connect } from "dva";
import { formatMessage, FormattedMessage } from "umi/locale";
import Link from "umi/link";
import router from "umi/router";
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Popover,
  Progress,
  Alert
} from "antd";
import styles from "./Register.less";

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="validation.password.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="validation.password.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="validation.password.strength.short" />
    </div>
  )
};

const passwordProgressMap = {
  ok: "success",
  pass: "normal",
  poor: "exception"
};

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects["register/submit"]
}))
@Form.create()
class Register extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: "",
    prefix: "86"
  };

  componentDidUpdate() {
    const { form, register } = this.props;
    const account = form.getFieldValue("mail");
    if (register.status === "ok") {
      router.push({
        pathname: "/user/register-result",
        state: {
          account
        }
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    const { dispatch, form } = this.props;
    form.validateFields(["mobile"], (err, values) => {
      if (!err) {
        dispatch({
          type: "register/getCaptcha",
          payload: {
            mobile: values.mobile,
            type: "register"
          }
        });
        this.captchaCountDown();
      }
    });
  };

  captchaCountDown = () => {
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue("password");
    if (value && value.length > 9) {
      return "ok";
    }
    if (value && value.length > 5) {
      return "pass";
    }
    return "poor";
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
			console.log('values: ', values);
      if (!err) {
        const { prefix } = this.state;
        dispatch({
          type: "register/submit",
          payload: {
            ...values,
            prefix
          }
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback(formatMessage({ id: "validation.password.twice" }));
    } else {
      callback();
    }
  };

  checkExist = (rule, value, callback) => {
    const { dispatch, form, register } = this.props;
    dispatch({
      type: "register/checkExist",
      payload: {
        username: value,
        type: "register"
      },
      callback: response => {
        if (response.isExist) {
          callback("该邮箱已被注册！");
        } else {
          callback();
        }
      }
    });
  };

  checkMobileExist = (rule, value, callback) => {
    const { dispatch, form, register } = this.props;
    dispatch({
      type: "register/checkMobileExist",
      payload: {
        mobile: value,
        type: "register"
      },
      callback: response => {
        if (response.isExist) {
          callback("该手机号已被注册！");
        } else {
          callback();
        }
      }
    });
  };

  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;
    if (!value) {
      this.setState({
        help: formatMessage({ id: "validation.password.required" }),
        visible: !!value
      });
      callback("error");
    } else {
      this.setState({
        help: ""
      });
      if (!visible) {
        this.setState({
          visible: !!value
        });
      }
      if (value.length < 6) {
        callback("error");
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(["confirm"], { force: true });
        }
        callback();
      }
    }
  };

  changePrefix = value => {
    this.setState({
      prefix: value
    });
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue("password");
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  renderMessage = () => {
    return <Alert message="输入的验证码有误！" type="error" showIcon />;
  };

  render() {
    const {
      form,
      submitting,
      register: { submit }
    } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix, help, visible } = this.state;
    return (
      <div className={styles.main}>
        <h3>
          <FormattedMessage id="app.register.register" />
        </h3>
        {submit === "error" && this.renderMessage()}
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: "validation.email.required" })
                },
                {
                  type: "email",
                  message: formatMessage({
                    id: "validation.email.wrong-format"
                  })
                },
                {
                  validator: this.checkExist
                }
              ]
            })(
              <Input
                size="large"
                placeholder={formatMessage({ id: "form.email.placeholder" })}
              />
            )}
          </FormItem>
          <FormItem help={help}>
            <Popover
              getPopupContainer={node => node.parentNode}
              content={
                <div style={{ padding: "4px 0" }}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    <FormattedMessage id="validation.password.strength.msg" />
                  </div>
                </div>
              }
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={visible}
            >
              {getFieldDecorator("password", {
                rules: [
                  {
                    validator: this.checkPassword
                  }
                ]
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder={formatMessage({
                    id: "form.password.placeholder"
                  })}
                />
              )}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: "validation.confirm-password.required"
                  })
                },
                {
                  validator: this.checkConfirm
                }
              ]
            })(
              <Input
                size="large"
                type="password"
                placeholder={formatMessage({
                  id: "form.confirm-password.placeholder"
                })}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("nickname", {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: "validation.nickname.required"
                  })
                },
                {
                  max: 6,
                  message: formatMessage({
                    id: "validation.nickname.wrong-format"
                  })
                }
              ]
            })(
              <Input
                size="large"
                placeholder={formatMessage({
                  id: "form.nickname.placeholder"
                })}
              />
            )}
          </FormItem>
          <FormItem>
            <InputGroup compact>
              <Select
                size="large"
                value={prefix}
                onChange={this.changePrefix}
                style={{ width: "20%" }}
              >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
              </Select>
              {getFieldDecorator("mobile", {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: "validation.phone-number.required"
                    })
                  },
                  {
                    pattern: /^\d{11}$/,
                    message: formatMessage({
                      id: "validation.phone-number.wrong-format"
                    })
                  },
                  {
                    validator: this.checkMobileExist
                  }
                ]
              })(
                <Input
                  size="large"
                  style={{ width: "80%" }}
                  placeholder={formatMessage({
                    id: "form.phone-number.placeholder"
                  })}
                />
              )}
            </InputGroup>
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator("captcha", {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({
                        id: "validation.verification-code.required"
                      })
                    }
                  ]
                })(
                  <Input
                    size="large"
                    placeholder={formatMessage({
                      id: "form.verification-code.placeholder"
                    })}
                  />
                )}
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={count}
                  className={styles.getCaptcha}
                  onClick={this.onGetCaptcha}
                >
                  {count
                    ? `${count} s`
                    : formatMessage({
                        id: "app.register.get-verification-code"
                      })}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <FormattedMessage id="app.register.register" />
            </Button>
            <Link className={styles.login} to="/User/Login">
              <FormattedMessage id="app.register.sign-in" />
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Register;
