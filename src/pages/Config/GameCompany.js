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
  Modal,
  message,
  Select,
  Divider,
  Input
} from "antd";
import Ellipsis from "@/components/Ellipsis";
import StandardTable from "@/components/StandardTable";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";

import styles from "./Config.less";

const FormItem = Form.Item;
const { TextArea } = Input;

const CreateForm = Form.create()(props => {
  const {
    modalVisible,
    form,
    handleAdd,
    handleUpdate,
    handleModalVisible,
    currentCompany
  } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // form.resetFields();
      currentCompany
        ? handleUpdate({ id: currentCompany.id, ...fieldsValue })
        : handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title={currentCompany ? "编辑公司" : "添加公司"}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <Form layout="vertical">
        <FormItem label="公司名称（中文）">
          {form.getFieldDecorator("company_name_cn", {
            rules: [
              {
                message: "不得超过三十二个字符！",
                max: 32
              }
            ],
            initialValue: currentCompany ? currentCompany.company_name_cn : ""
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem label="公司名称（英文）">
          {form.getFieldDecorator("company_name_en", {
            rules: [
              {
                required: true,
                message: "请输入公司名称（英文）！"
              },
              {
                message: "不得超过32个字符！",
                max: 32
              }
            ],
            initialValue: currentCompany ? currentCompany.company_name_en : ""
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem label="公司简介">
          {form.getFieldDecorator("company_desc", {
            rules: [
              {
                message: "不得超过300个字符！",
                max: 300
              }
            ],
            initialValue: currentCompany ? currentCompany.company_desc : ""
          })(<TextArea rows={4} placeholder="请输入" />)}
        </FormItem>
      </Form>
    </Modal>
  );
});

@connect(({ company, loading }) => ({
  company,
  loading: loading.models.company
}))
class GameCompany extends PureComponent {
  state = {
    selectedRows: [],
    modalVisible: false,
    currentCompany: undefined
  };

  initialParams = {
    pageSize: 10,
    current: 1
  };

  columns = [
    {
      title: "公司名称",
      dataIndex: "company_name_cn",
      align: "center"
    },
    {
      title: "公司名称（英文）",
      dataIndex: "company_name_en",
      align: "center"
    },
    {
      title: "公司简介",
      dataIndex: "company_desc",
      align: "center",
      render: val => (
        <Ellipsis length={30} tooltip>
          {val}
        </Ellipsis>
      )
    },
    {
      title: "操作",
      align: "center",
      width: 120,
      render: item => (
        <Fragment>
          <a onClick={() => this.handleEdit(item.id)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleDelete(item.id)}>删除</a>
        </Fragment>
      )
    }
  ];

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "company/fetch",
      payload: this.initialParams
    });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;
    const params = {
      pageSize: pagination.pageSize,
      current: pagination.current
    };
    dispatch({
      type: "company/fetch",
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
    Modal.confirm({
      title: "删除记录",
      content: "确定删除该公司吗？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        dispatch({
          type: "company/remove",
          payload: {
            pagination: this.props.company.data.pagination,
            id: id
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

  handleEdit = id => {
    const { dispatch } = this.props;

    dispatch({
      type: "company/select",
      payload: {
        id: id
      },
      callback: company => {
        this.setState({
          currentCompany: company
        });
        this.handleModalVisible(true);
      }
    });
  };

  handleModalVisible = flag => {
    !flag &&
      this.setState({
        currentCompany: undefined
      });
    this.setState({
      modalVisible: !!flag
    });
  };

  handleAdd = fieldsValue => {
    const { dispatch } = this.props;
    this.handleModalVisible();
    dispatch({
      type: "company/add",
      payload: {
        company: fieldsValue,
        pagination: this.props.company.data.pagination
      },
      callback: () => {
        message.success("添加成功");
      }
    });
  };

  handleUpdate = company => {
    const { dispatch } = this.props;
    this.handleModalVisible();
    dispatch({
      type: "company/update",
      payload: {
        company: company,
        pagination: this.props.company.data.pagination
      },
      callback: () => {
        message.success("修改成功");
      }
    });
  };

  render() {
    const {
      company: { data },
      loading
    } = this.props;

    const { selectedRows, modalVisible, currentCompany } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleUpdate: this.handleUpdate,
      handleModalVisible: this.handleModalVisible
    };

    return (
      <PageHeaderWrapper title="游戏公司管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Button
                icon="plus"
                type="primary"
                onClick={() => this.handleModalVisible(true)}
              >
                添加公司
              </Button>
            </div>
            <div className={styles.tableListOperator} style={{ marginTop: 10 }}>
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
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
          currentCompany={currentCompany}
        />
      </PageHeaderWrapper>
    );
  }
}

export default GameCompany;
