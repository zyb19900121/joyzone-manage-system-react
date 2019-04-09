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
  Select
} from "antd";
import StandardTable from "@/components/StandardTable";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";

import styles from "./Config.less";

@connect(({ company, loading }) => ({
  company,
  loading: loading.models.company
}))
class GameCompany extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper title="游戏公司管理">
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
                      this.handleDelete(
                        this.state.selectedRows.map(item => item.id)
                      )
                    }
                  >
                    删除
                  </Button>
                </span>
              )}
            </div> */}
            {/* <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleTableChange}
            /> */}
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default GameCompany;
