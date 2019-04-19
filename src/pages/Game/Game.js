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
  Select
} from "antd";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";

import styles from "./Game.less";

import { baseUrl } from "@/utils/global";

@connect(({ game, loading }) => ({
  game,
  loading: loading.models.game
}))
class Game extends React.Component {
  state = {
    pageSize: 10
  };

  initialParams = {
    pageSize: 10,
    current: 1
    // platform: "",
    // gameType: "",
    // isSold: true
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "game/fetch",
      payload: this.initialParams
    });
  }

  handlePageSizeChange = (current, pageSize) => {
    this.setState({
      pageSize: pageSize
    });
    const { dispatch } = this.props;
    const params = {
      pageSize,
      current
    };
    dispatch({
      type: "game/fetch",
      payload: params
    });
  };

  handlePageChange = (current, pageSize) => {
    const { dispatch } = this.props;
    const params = {
      pageSize,
      current
    };
    dispatch({
      type: "game/fetch",
      payload: params
    });
  };

  handleAddGame = () => {};
  render() {
    const {
      game: { data },
      loading
    } = this.props;

    const { pageSize } = this.state;
    return (
      <PageHeaderWrapper title="游戏库">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Button
                icon="plus"
                type="primary"
                onClick={() => this.handleAddGame()}
              >
                添加类型
              </Button>
            </div>
          </div>
          <div className={styles.gameList}>
            <List
              loading={loading}
              // grid={{ gutter: 16, column: 4 }}
              split={false}
              dataSource={data.list}
              pagination={{
                defaultPageSize: 10,
                pageSize: pageSize,
                showSizeChanger: true,
                onShowSizeChange: this.handlePageSizeChange,
                onChange: this.handlePageChange,
                total: data.total
              }}
              renderItem={item => (
                <List.Item className={styles.gameItem}>
                  <div>
                    <img
                      className={styles.gameCover}
                      src={`${baseUrl()}${item.game_cover}`}
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

export default Game;
