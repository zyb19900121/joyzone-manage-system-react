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
  initialParams = {
    pageSize: 10,
    currentPage: 1,
    gameId: ""
  };

  handleAddImage = () => {
    console.log("handleAddImage");
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "gallery/getGalleryList",
      payload: this.initialParams
    });
  }
  render() {
    const {
      gallery: { galleryList },
      loading
    } = this.props;

    console.log("galleryList: ", galleryList);
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
              loading={loading}
              split={false}
              dataSource={galleryList.list}
              // pagination={{
              //   current: current,
              //   defaultPageSize: 10,
              //   pageSize: pageSize,
              //   showSizeChanger: true,
              //   onShowSizeChange: this.handlePageSizeChange,
              //   onChange: this.handlePageChange,
              //   total: total
              // }}
              renderItem={item => (
                <List.Item className={styles.gameItem}>
                  <div className={styles.gameContainer}>
                    {/* <div className={styles.gameDetail}>
                      <div className={styles.operationArea}>
                        <Button
                          type="primary"
                          shape="circle"
                          icon="edit"
                          onClick={() => this.handleEditGame(item.id)}
                        />
                        <Button
                          type="danger"
                          shape="circle"
                          icon="delete"
                          onClick={() => this.handleDeleteGame(item.id)}
                        />
                      </div>
                    </div> */}
                    <img
                      className={styles.gameCover}
                      src={`${baseUrl()}${item.image_src}`}
                    />
                  </div>
                </List.Item>
              )}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Gallery;
