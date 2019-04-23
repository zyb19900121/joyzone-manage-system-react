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
const Option = Select.Option;

@connect(({ game, type, loading }) => ({
  game,
  type,
  submitting: loading.effects["form/submitRegularForm"]
}))
@Form.create()
class CreateGame extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "type/fetch",
      payload: { isFilter: 1 }
    });
  }

  handleCancel() {
    router.push({
      pathname: "/gamemanage/game"
      // state: {
      //   account
      // }
    });
  }

  handleSubmit() {}

  render() {
    const {
      form,
      submitting,
      type: { data }
      // register: { submit }
    } = this.props;
    const { getFieldDecorator } = form;

    let typeOptions = [];
    if (data && data.list.length) {
      typeOptions = data.list.map((item, index) => (
        <Option key={item.type_name_cn}>{item.type_name_cn}</Option>
      ));
    }

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
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
      <PageHeaderWrapper title="添加游戏">
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
                ]
              })(<Input placeholder="请输入" allowClear />)}
            </FormItem>

            <FormItem {...formItemLayout} label="游戏名称（英文）">
              {getFieldDecorator("game_name_en", {
                rules: [
                  {
                    max: 64,
                    message: "不得超过64个字符"
                  }
                ]
              })(<Input placeholder="请输入" allowClear />)}
            </FormItem>

            <FormItem {...formItemLayout} label="游戏平台">
              {getFieldDecorator("platform", {})(
                <Select placeholder="请选择" allowClear>
                  <Option value="PlayStation4">PlayStation4</Option>
                  <Option value="Nintendo Switch">Nintendo Switch</Option>
                  <Option value="Xbox One">Xbox One</Option>
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="游戏类型">
              {getFieldDecorator("game_type", {})(
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
              {getFieldDecorator("game_language", {})(
                <Select mode="multiple" placeholder="请选择" allowClear>
                  <Option value="中文">中文</Option>
                  <Option value="英文">英文</Option>
                  <Option value="日文">日文</Option>
                </Select>
              )}
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
