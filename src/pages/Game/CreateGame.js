import React, { PureComponent, Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import router from "umi/router";
import { formatMessage, FormattedMessage } from "umi/locale";
import {
  Row,
  Col,
  List,
  Card,
  Form,
  Input,
  InputNumber,
  Switch,
  DatePicker,
  Icon,
  Button,
  Modal,
  message,
  Select
} from "antd";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import FooterToolbar from "@/components/FooterToolbar";

import styles from "./CreateGame.less";

import { baseUrl } from "@/utils/global";

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

@connect(({ game, type, company, loading }) => ({
  game,
  type,
  company,
  submitting: loading.effects["form/submitRegularForm"]
}))
@Form.create()
class CreateGame extends React.Component {
  componentDidMount() {
    const { dispatch, location } = this.props;

    dispatch({
      type: "type/fetch",
      payload: { isFilter: 1 }
    });
    dispatch({
      type: "company/fetch",
      payload: { isFilter: 1 }
    });

    location.state.id &&
      dispatch({
        type: "game/getGameDetail",
        payload: {
          id: location.state.id
        }
      });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: "game/clearGameDetail",
      payload: {}
    });
  }

  handleCancel() {
    const { dispatch } = this.props;
    dispatch({
      type: "game/clearGameDetail",
      payload: {}
    });

    if (this.props.location.state && this.props.location.state.pagination) {
      router.push({
        pathname: "/gamemanage/game/list",
        state: {
          pagination: { ...this.props.location.state.pagination }
        }
      });
    } else {
      router.push({
        pathname: "/gamemanage/game/list"
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch, location } = this.props;
    const gameId = location.state.id || undefined;
    form.validateFieldsAndScroll(
      { force: true, scroll: { offsetTop: 100 } },
      (err, values) => {
        if (!err) {
          if (gameId) {
            dispatch({
              type: "game/update",
              payload: {
								game: {id:gameId,...values},
								
              }
              // callback: () => {
              //   router.push({
              //     pathname: "/gamemanage/game"
              //   });
              //   message.success("添加成功");
              // }
            });
          } else {
            dispatch({
              type: "game/add",
              payload: {
                ...values
              },
              callback: () => {
                router.push({
                  pathname: "/gamemanage/game"
                });
                message.success("添加成功");
              }
            });
          }
        }
      }
    );
  };

  render() {
    const {
      form,
      game: { gameDetail },
      type,
      company,
      submitting,
      location
      // register: { submit }
    } = this.props;

    const gameId = location.state.id || undefined;

    const typeList = type.data.list;
    const companyList = company.data.list;
    const { getFieldDecorator } = form;

    let typeOptions,
      companyOptions = [];
    if (typeList.length) {
      typeOptions = typeList.map((item, index) => (
        <Option key={index} value={item.type_name_cn}>
          {item.type_name_cn}
        </Option>
      ));
    }

    if (companyList.length) {
      companyOptions = companyList.map((item, index) => (
        <Option key={index} value={item.company_name_en}>
          {item.company_name_en}
        </Option>
      ));
    }

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 }
      }
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 }
      }
    };
    return (
      <PageHeaderWrapper title={gameId ? "编辑游戏" : "添加游戏"}>
        <Card bordered={false}>
          {/* {submit === "error" && this.renderMessage()} */}
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="游戏名称">
              {getFieldDecorator("game_name", {
                rules: [
                  {
                    required: true,
                    message: "请输入游戏名称"
                  },
                  {
                    max: 32,
                    message: "不得超过32个字符"
                  }
                ],
                initialValue: gameDetail.game_name
              })(<Input placeholder="请输入" allowClear />)}
            </FormItem>

            <FormItem {...formItemLayout} label="游戏名称（英文）">
              {getFieldDecorator("game_name_en", {
                rules: [
                  {
                    max: 64,
                    message: "不得超过64个字符"
                  }
                ],
                initialValue: gameDetail.game_name_en
              })(<Input placeholder="请输入" allowClear />)}
            </FormItem>

            <FormItem {...formItemLayout} label="游戏平台">
              {getFieldDecorator("platform", {
                initialValue: gameDetail.platform || undefined
              })(
                <Select placeholder="请选择" allowClear>
                  <Option value="PlayStation4">PlayStation4</Option>
                  <Option value="Nintendo Switch">Nintendo Switch</Option>
                  <Option value="Xbox One">Xbox One</Option>
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="游戏类型">
              {getFieldDecorator("game_type", {
                initialValue:
                  (gameDetail.game_type && gameDetail.game_type.split(",")) ||
                  []
              })(
                <Select
                  mode="multiple"
                  showSearch
                  allowClear={true}
                  placeholder="请选择"
                >
                  {typeOptions}
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="游戏语言">
              {getFieldDecorator("game_language", {
                initialValue:
                  (gameDetail.game_language &&
                    gameDetail.game_language.split(",")) ||
                  []
              })(
                <Select mode="multiple" placeholder="请选择" allowClear>
                  <Option value="中文">中文</Option>
                  <Option value="英文">英文</Option>
                  <Option value="日文">日文</Option>
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="游戏开发商">
              {getFieldDecorator("game_developers", {
                initialValue: gameDetail.game_developers || undefined
              })(
                <Select showSearch allowClear={true} placeholder="请选择">
                  {companyOptions}
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="游戏发行商">
              {getFieldDecorator("game_publisher", {
                initialValue: gameDetail.game_publisher || undefined
              })(
                <Select showSearch allowClear={true} placeholder="请选择">
                  {companyOptions}
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="游戏评分">
              {getFieldDecorator("game_score", {
                initialValue: gameDetail.game_score || 1
              })(<InputNumber min={1} max={10} step={0.5} />)}
            </FormItem>

            <FormItem {...formItemLayout} label="已发售">
              {getFieldDecorator("is_sold", {
                initialValue: Boolean(gameDetail.is_sold) || true
              })(<Switch defaultChecked />)}
            </FormItem>

            <FormItem {...formItemLayout} label="发售时间">
              {getFieldDecorator("sale_date", {
                initialValue:
                  (gameDetail.sale_date && moment(gameDetail.sale_date)) ||
                  undefined
              })(<DatePicker format="YYYY-MM-DD" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="游戏简介">
              {getFieldDecorator("game_desc", {
                rules: [
                  {
                    max: 300,
                    message: "不得超过300个字符"
                  }
                ],
                initialValue: gameDetail.game_desc || undefined
              })(<TextArea rows={4} />)}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                保存
              </Button>
              <Button
                style={{ marginLeft: 8 }}
                onClick={() => this.handleCancel()}
              >
                取消
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CreateGame;
