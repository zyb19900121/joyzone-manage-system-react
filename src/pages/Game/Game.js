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
    current: 1,
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
    const { dispatch, location } = this.props;

    if (location.state && location.state.pagination) {
      this.initialParams = {
        pageSize: location.state.pagination.pageSize,
        current: location.state.pagination.current
      };
      this.setState({
        pageSize: location.state.pagination.pageSize,
        current: location.state.pagination.current
      });
    }

    dispatch({
      type: "game/getGameList",
      payload: this.initialParams
    });
  }

  componentDidUpdate() {
    window.history.replaceState(
      {
        state: null
      },
      "/gamemanage/game/list"
    );
  }

  componentWillUnmount() {
    this.initialParams = {
      pageSize: 10,
      current: 1
    };
  }

  handlePageSizeChange = (current, pageSize) => {
    this.setState({
      pageSize
    });
    const { dispatch } = this.props;
    const params = {
      pageSize,
      current
    };
    dispatch({
      type: "game/getGameList",
      payload: params
    });
  };

  handlePageChange = (current, pageSize) => {
    this.setState({
      current
    });
    const { dispatch } = this.props;
    const params = {
      pageSize,
      current
    };
    dispatch({
      type: "game/getGameList",
      payload: params
    });
  };

  handleAddGame = () => {
    router.push({
      pathname: "/gamemanage/game/create",
      state: {
        pagination: {
          current: this.state.current,
          pageSize: this.state.pageSize
        }
      }
    });
  };

  handleEditGame = id => {
    router.push({
      pathname: "/gamemanage/game/create",
      state: {
        id,
        pagination: {
          current: this.state.current,
          pageSize: this.state.pageSize
        }
      }
    });
  };
  handleDeleteGame = id => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: "删除记录",
      content: "确定删除该游戏吗？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        dispatch({
          type: "game/remove",
          payload: {
            pagination: {
              current: this.state.current,
              pageSize: this.state.pageSize
            },
            id
          },
          callback: () => {
            message.success("删除成功");
          }
        });
      }
    });
  };
  render() {
    const {
      game: { gameList },
      loading
    } = this.props;
    let dataList = [];
    gameList && gameList.list && (dataList = gameList.list);

    const { pageSize, current } = this.state;
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
                添加游戏
              </Button>
            </div>
          </div>
          <div className={styles.gameList}>
            <List
              loading={loading}
              // grid={{ gutter: 16, column: 4 }}
              split={false}
              dataSource={dataList}
              pagination={{
                current: current,
                defaultPageSize: 10,
                pageSize: pageSize,
                showSizeChanger: true,
                onShowSizeChange: this.handlePageSizeChange,
                onChange: this.handlePageChange,
                total: gameList.total
              }}
              renderItem={item => (
                <List.Item className={styles.gameItem}>
                  <div className={styles.gameContainer}>
                    <div className={styles.gameDetail}>
                      <div className={styles.detailInfo}>
                        <div className={styles.infoItem}>
                          <p className={styles.gameName}>{item.game_name}</p>
                          <p className={styles.gameNameEn}>
                            {item.game_name_en}
                          </p>
                        </div>
                        <div className={styles.infoItem}>
                          <p className={styles.score}>{item.game_score}</p>
                        </div>
                        <div
                          className={styles.infoItem}
                          style={{ paddingBottom: 10 }}
                        >
                          <p className={styles.type}>类型：{item.game_type}</p>
                          <p className={styles.date}>
                            发售日期：{item.sale_date}
                          </p>
                        </div>
                      </div>
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
                    </div>
                    <img
                      className={styles.gameCover}
                      src={`${baseUrl()}${item.game_cover1}`}
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
