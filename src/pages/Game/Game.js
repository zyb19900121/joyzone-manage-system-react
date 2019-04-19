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

@connect(({ game, loading }) => ({
  game,
  loading: loading.models.game
}))
class Game extends React.Component {
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

  renderGameList() {
    console.log("this.props: ", this.props);

    console.log("data: ", data);
    // return (
    //   <div>
    //     {this.state.comments.map(comment => (
    //       <Comment comment={comment} key={comment.id} />
    //     ))}
    //   </div>
    // );
  }

  handlePageSizeChange = (current, pageSize) => {
    console.log("current: ", current);
    console.log("pageSize: ", pageSize);
    // const { dispatch } = this.props;
    // const params = {
    //   pageSize: 10,
    //   current: page
    // };
    // dispatch({
    //   type: "game/fetch",
    //   payload: params
    // });
  };

  handlePageChange = (current, pageSize) => {
    console.log("current: ", current);
    console.log("pageSize: ", pageSize);
    // const { dispatch } = this.props;
    // const params = {
    //   pageSize: 10,
    //   current: page
    // };
    // dispatch({
    //   type: "game/fetch",
    //   payload: params
    // });
  };

  handleAddGame = () => {
    console.log("addGame");
  };
  render() {
    const {
      game: { data }
    } = this.props;
    console.log("data: ", data);
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
          {/* <div className={styles.gameList}> */}
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={data.list}
            pagination={{
              showSizeChanger: true,
              onShowSizeChange: this.handlePageSizeChange,
              onChange: this.handlePageChange,
              pageSize: 10,
              total: data.total
            }}
            renderItem={item => (
              <List.Item>
                <Card title={item.game_name}>Card content</Card>
              </List.Item>
            )}
          />

          {/* </div> */}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Game;
