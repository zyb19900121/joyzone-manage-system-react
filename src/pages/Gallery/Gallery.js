import React, { PureComponent, Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import router from "umi/router";
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
  Select,
  Switch,
  InputNumber,
  DatePicker
} from "antd";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";

import styles from "./Gallery.less";

import { baseUrl } from "@/utils/global";

@connect(({ gallery, loading }) => ({
  gallery,
  loading: loading.models.game
}))
class Gallery extends React.Component {
  handleAddImage = () => {
    console.log("handleAddImage");
  };
  render() {
    return (
      <PageHeaderWrapper title="游戏图集">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Button
                icon="plus"
                type="primary"
                onClick={() => this.handleAddImage()}
              >
                上传图片
              </Button>
            </div>
          </div>
          <div className={styles.gameList}>
            <List
            // loading={loading}
            // split={false}
            // dataSource={dataList}
            // pagination={{
            //   current: current,
            //   defaultPageSize: 10,
            //   pageSize: pageSize,
            //   showSizeChanger: true,
            //   onShowSizeChange: this.handlePageSizeChange,
            //   onChange: this.handlePageChange,
            //   total: total
            // }}
            // renderItem={item => (

            // )}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Gallery;
