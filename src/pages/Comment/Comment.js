import React, { PureComponent, Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import router from "umi/router";
import {
  Row,
  Col,
  Card,
  Form,
  Icon,
  Button,
  DatePicker,
  Modal,
  message,
  Avatar,
  Select
} from "antd";
const { MonthPicker, RangePicker } = DatePicker;
import StandardTable from "@/components/StandardTable";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";

import styles from "./Comment.less";

const { Option } = Select;
const FormItem = Form.Item;

@connect(({ comment, game, loading }) => ({
  comment,
  game,
  loading: loading.models.comment
}))
@Form.create()
class Comment extends PureComponent {
  state = {
    modalVisible: false,
    selectedRows: [],
    formValues: {}
  };

  columns = [
    {
      title: "用户姓名",
      dataIndex: "username"
    },
    {
      title: "用户头像",
      dataIndex: "user_avatar",
      render: val => <Avatar icon="user" src={val} />
    },
    {
      title: "游戏名称",
      dataIndex: "game_name"
    },
    {
      title: "评论内容",
      dataIndex: "comment_content"
    },
    {
      title: "评论时间",
      dataIndex: "create_date",
      render: val => <span>{moment(val).format("YYYY-MM-DD HH:mm:ss")}</span>
    },
    {
      title: "操作",
      render: item => (
        <Fragment>
          <a onClick={() => this.handleDelete(item.id)}>删除</a>
        </Fragment>
      )
    }
  ];

  initialParams = {
    pageSize: 10,
    current: 1
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "comment/fetch",
      payload: this.initialParams
    });
    dispatch({
      type: "game/fetch",
      payload: { isFilter: 1 }
    });
  }

  handleDatapickerChange(dates) {
    // if (!dates.length) {
    //   this.handleFormReset();
    // }
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {}
    });
    dispatch({
      type: "comment/fetch",
      payload: this.initialParams
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const rangeTimeValue = fieldsValue["range-time-picker"] || [];
      const gameId = fieldsValue["gameId"];

      const values = {
        ...this.initialParams,
        startDate: rangeTimeValue.length
          ? rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss")
          : null,
        endDate: rangeTimeValue.length
          ? rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss")
          : null,
        gameId: gameId
      };

      this.setState({
        formValues: values
      });

      dispatch({
        type: "comment/fetch",
        payload: values
      });
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
      game: { data }
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 }
      }
    };

    const options = data.list.map(game => (
      <Option key={game.id}>{game.game_name}</Option>
    ));

    return (
      <Form onSubmit={this.handleSearch}>
        <Row>
          <Col xl={8} lg={12} md={24} sm={24}>
            <FormItem label="游戏名称">
              {getFieldDecorator("gameId")(
                <Select
                  showSearch
                  allowClear={true}
                  style={{ width: 200 }}
                  placeholder="请选择一个游戏"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {options}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col xl={8} lg={12} md={14} sm={24}>
            <FormItem label="评论时间">
              {getFieldDecorator("range-time-picker")(
                <RangePicker
                  style={{ width: "100%" }}
                  onChange={dates => this.handleDatapickerChange(dates)}
                  format="YYYY-MM-DD"
                  showTime={{
                    defaultValue: [
                      moment("00:00:00", "HH:mm:ss"),
                      moment("23:59:59", "HH:mm:ss")
                    ]
                  }}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const params = {
      ...formValues,
      pageSize: pagination.pageSize,
      current: pagination.current
    };
    dispatch({
      type: "comment/fetch",
      payload: params
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows
    });
  };

  handleDelete = id => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    Modal.confirm({
      title: "删除记录",
      content: "确定删除该评论吗？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        dispatch({
          type: "comment/remove",
          payload: {
            pagination: this.props.comment.data.pagination,
            id: id,
            ...{
              startDate: formValues.startDate,
              endDate: formValues.endDate,
              gameId: formValues.gameId
            }
          },
          callback: () => {
            message.success("删除成功");
            this.setState({
              selectedRows: []
            });
          }
        });
      }
    });
  };

  render() {
    const {
      comment: { data },
      loading
    } = this.props;
    const { selectedRows } = this.state;

    return (
      <PageHeaderWrapper title="评论管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderSimpleForm()}
            </div>
            <div className={styles.tableListOperator}>
              {selectedRows.length > 0 && (
                <span>
                  <Button
                    onClick={() =>
                      this.handleDelete(
                        this.state.selectedRows.map(item => item.id)
                      )
                    }
                  >
                    删除
                  </Button>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Comment;
