import React, { PureComponent, Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import router from "umi/router";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio
} from "antd";
const { MonthPicker, RangePicker } = DatePicker;
import StandardTable from "@/components/StandardTable";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";

import styles from "./LogList.less";

const FormItem = Form.Item;

@connect(({ logList, loading }) => ({
  logList,
  loading: loading.models.logList
}))
@Form.create()
class LogList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {}
  };

  initialParams = {
    pageSize: 10,
    currentPage: 1
  };

  columns = [
    {
      title: "手机品牌",
      dataIndex: "phone_brand"
    },
    {
      title: "手机型号",
      dataIndex: "phone_model"
    },
    {
      title: "手机系统",
      dataIndex: "phone_system"
    },
    {
      title: "访问时间",
      dataIndex: "visit_date",
      render: val => <span>{moment(val).format("YYYY-MM-DD HH:mm:ss")}</span>
    },
    {
      title: "操作",
      render: record => (
        <Fragment>
          <a onClick={() => this.handleDeleteLogRecord(record.id)}>删除</a>
        </Fragment>
      )
    }
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "logList/fetch",
      payload: this.initialParams
    });
  }

  handleDeleteLogRecord = record => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    Modal.confirm({
      title: "删除记录",
      content: "确定删除该记录吗？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        dispatch({
          type: "logList/remove",
          payload: {
            ...{ pagination: this.props.logList.data.pagination },
            ...{ id: record },
            ...{ startDate: formValues.startDate, endDate: formValues.endDate }
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

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      ...formValues,
      ...filters,
      currentPage: pagination.current,
      pageSize: pagination.pageSize
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: "logList/fetch",
      payload: params
    });
  };

  previewItem = id => {
    router.push(`/profile/basic/${id}`);
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {}
    });
    dispatch({
      type: "logList/fetch",
      payload: { ...this.initialParams }
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const rangeTimeValue = fieldsValue["range-time-picker"];

      const values = {
        ...this.initialParams,
        startDate: rangeTimeValue
          ? rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss")
          : null,
        endDate: rangeTimeValue
          ? rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss")
          : null
      };

      this.setState({
        formValues: values
      });

      dispatch({
        type: "logList/fetch",
        payload: values
      });
    });
  };

  handleDatapickerChange(dates) {
    if (!dates.length) {
      this.handleFormReset();
    }
  }

  renderSimpleForm() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    const rangeConfig = {
      rules: [
        { type: "array", required: false, message: "Please select time!" }
      ]
    };
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col xl={8} lg={24} md={24} sm={24}>
            <Form.Item>
              {getFieldDecorator("range-time-picker", rangeConfig)(
                <RangePicker
                  onChange={dates => this.handleDatapickerChange(dates)}
                  showTime={{
                    defaultValue: [
                      moment("00:00:00", "HH:mm:ss"),
                      moment("23:59:59", "HH:mm:ss")
                    ]
                  }}
                />
              )}
            </Form.Item>
          </Col>
          <Col xl={16} lg={24} md={24} sm={24}>
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

  render() {
    const {
      logList: { data },
      loading
    } = this.props;
    const {
      selectedRows,
      modalVisible,
      updateModalVisible,
      stepFormValues
    } = this.state;

    return (
      <PageHeaderWrapper title="访问日志">
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
                      this.handleDeleteLogRecord(
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
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default LogList;
