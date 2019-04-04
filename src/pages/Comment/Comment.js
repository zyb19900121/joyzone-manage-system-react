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
  Icon,
  Button,
  Menu,
  DatePicker,
  Modal,
  message,
  Avatar
} from "antd";
const { MonthPicker, RangePicker } = DatePicker;
import StandardTable from "@/components/StandardTable";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";

import styles from "./Comment.less";

@connect(({ comment, loading }) => ({
  comment,
  loading: loading.models.comment
}))
@Form.create()
class Comment extends PureComponent {
  state = {
    modalVisible: false,
    selectedRows: []
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
      render: record => (
        <Fragment>
          <a onClick={() => this.handleDelete(item.id)}>删除</a>
        </Fragment>
      )
    }
  ];

  initialParams = {
    pageSize: 10,
    currentPage: 1
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "comment/fetch",
      payload: this.initialParams
    });
  }

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
              {/* {this.renderSimpleForm()} */}
            </div>
            {/* <div className={styles.tableListOperator}>
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
            </div> */}
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              // // onSelectRow={this.handleSelectRows}
              // onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Comment;
