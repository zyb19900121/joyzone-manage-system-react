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
  Divider
} from "antd";
import Ellipsis from "@/components/Ellipsis";
import StandardTable from "@/components/StandardTable";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";

import styles from "./Config.less";

@connect(({ company, loading }) => ({
  company,
  loading: loading.models.company
}))
class GameCompany extends PureComponent {
  state = {
    selectedRows: []
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
      render: item => (
        <Fragment>
          <a onClick={() => this.handleDelete(item.id)}>编辑</a>
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

  render() {
    const {
      company: { data },
      loading
    } = this.props;

    const { selectedRows } = this.state;

    return (
      <PageHeaderWrapper title="游戏公司管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {/* {this.renderSimpleForm()} */}
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

export default GameCompany;
