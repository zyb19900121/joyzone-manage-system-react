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

import styles from "./Game.less";

import { baseUrl } from "@/utils/global";

const FormItem = Form.Item;
const Option = Select.Option;

const SearchForm = Form.create()(props => {
  const {
    form: { getFieldDecorator },
    handleSearch,
    handleResetSearchForm,
    handleToggleForm
  } = props;

  const handleSubmit = e => {
    const { form } = props;
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      handleSearch(fieldsValue);
    });
  };

  const handleReset = () => {
    const { form } = props;
    form.resetFields();
    handleResetSearchForm();
  };

  return (
    <Form onSubmit={handleSubmit} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="游戏名称">
            {getFieldDecorator("keyword", {
              rules: [
                {
                  message: "不得超过三十二个字符！",
                  max: 32
                }
              ]
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="游戏平台">
            {getFieldDecorator("platform")(
              <Select placeholder="请选择" allowClear>
                <Option value="PlayStation4">PlayStation4</Option>
                <Option value="Nintendo Switch">Nintendo Switch</Option>
                <Option value="Xbox One">Xbox One</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <span className={styles.submitButtons}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={handleToggleForm}>
              展开 <Icon type="down" />
            </a>
          </span>
        </Col>
      </Row>
    </Form>
  );
});

const SearchFormAdvanced = Form.create()(props => {
  const {
    form: { getFieldDecorator },
    handleSearch,
    handleResetSearchForm,
    handleToggleForm,
    typeList
  } = props;

  let typeOptions = [];

  if (typeList.length) {
    typeOptions = typeList.map((item, index) => (
      <Option key={index} value={item.type_name_cn}>
        {item.type_name_cn}
      </Option>
    ));
  }

  const handleSubmit = e => {
    const { form } = props;
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleSearch(fieldsValue);
    });
  };

  const handleReset = () => {
    const { form } = props;
    form.resetFields();
    handleResetSearchForm();
  };

  return (
    <Form onSubmit={handleSubmit} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="游戏名称">
            {getFieldDecorator("keyword", {
              rules: [
                {
                  message: "不得超过三十二个字符！",
                  max: 32
                }
              ]
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="游戏平台">
            {getFieldDecorator("platform")(
              <Select placeholder="请选择" allowClear>
                <Option value="PlayStation4">PlayStation4</Option>
                <Option value="Nintendo Switch">Nintendo Switch</Option>
                <Option value="Xbox One">Xbox One</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="排序依据">
            {getFieldDecorator("orderBy")(
              <Select placeholder="请选择" allowClear>
                <Option value="game_score DESC">游戏评分（高到低）</Option>
                <Option value="game_score">游戏评分（低到高）</Option>
                <Option value="sale_date DESC">发售时间（近到远）</Option>
                <Option value="sale_date">发售时间（远到近）</Option>
              </Select>
            )}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="游戏类型">
            {getFieldDecorator("gameType")(
              <Select showSearch allowClear={true} placeholder="请选择">
                {typeOptions}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="已发售">
            {getFieldDecorator("isSold", {
              valuePropName: "checked",
              initialValue: true
            })(<Switch />)}
          </FormItem>
        </Col>
        {/* <Col md={8} sm={24}>
          <FormItem label="使用状态">
            {getFieldDecorator("status4")(
              <Select placeholder="请选择" style={{ width: "100%" }}>
                <Option value="0">关闭</Option>
                <Option value="1">运行中</Option>
              </Select>
            )}
          </FormItem>
        </Col> */}
      </Row>
      <div style={{ overflow: "hidden" }}>
        <div style={{ marginBottom: 24 }}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>
            重置
          </Button>
          <a style={{ marginLeft: 8 }} onClick={handleToggleForm}>
            收起 <Icon type="up" />
          </a>
        </div>
      </div>
    </Form>
  );
});

@connect(({ game, type, loading }) => ({
  game,
  type,
  loading: loading.models.game
}))
class Game extends React.Component {
  state = {
    current: 1,
    pageSize: 10,
    expandForm: false
  };

  searchParams = {
    pageSize: 10,
    current: 1,
    platform: "",
    gameType: "",
    isSold: true
  };

  initialParams = {
    pageSize: 10,
    current: 1,
    platform: "",
    gameType: "",
    isSold: true
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

    dispatch({
      type: "type/fetch",
      payload: { isFilter: 1 }
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
      current: 1,
      platform: "",
      gameType: "",
      isSold: true
    };
  }

  handlePageSizeChange = (current, pageSize) => {
    this.setState({
      pageSize
    });
    const { dispatch } = this.props;
    const params = {
      ...this.searchParams,
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
      ...this.searchParams,
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
            searchParams: this.searchParams,
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

  handleSearch = formValues => {
    this.setState({
      current: 1,
      pageSize: 10
    });
    const { dispatch } = this.props;

    this.searchParams = { ...this.searchParams, ...formValues };

    const params = {
      ...this.initialParams,
      ...formValues
    };
    dispatch({
      type: "game/getGameList",
      payload: params
    });
  };

  handleResetSearchForm = () => {
    this.setState({
      current: 1,
      pageSize: 10
    });
    const { dispatch } = this.props;
    this.searchParams = this.initialParams;
    const params = {
      ...this.initialParams
    };
    dispatch({
      type: "game/getGameList",
      payload: params
    });
  };

  handleToggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm
    });
  };

  render() {
    const {
      game: { gameList },
      type,
      loading
    } = this.props;
    let dataList = [];
    let total;
    gameList && gameList.total && (total = gameList.total);
    gameList && gameList.list && (dataList = gameList.list);

    const parentMethods = {
      handleSearch: this.handleSearch,
      handleResetSearchForm: this.handleResetSearchForm,
      handleToggleForm: this.handleToggleForm
    };

    const { pageSize, current } = this.state;
    return (
      <PageHeaderWrapper title="游戏库">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.state.expandForm ? (
                <SearchFormAdvanced
                  {...parentMethods}
                  typeList={type.data.list}
                />
              ) : (
                <SearchForm {...parentMethods} />
              )}

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
                total: total
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
                          <p className={styles.score}>
                            {item.game_score.toFixed(1)}
                          </p>
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
