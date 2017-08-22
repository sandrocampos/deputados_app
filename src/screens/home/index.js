import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import { getDeputies, getMoreDeputies } from '../../actions';


const loadingStyle = {
  paddingVertical: 20,
  borderTopWidth: 1,
  borderTopColor: '#DDDDDD',
};

class Home extends Component {
  static navigationOptions = {
    title: 'Deputados',
  };

  componentWillMount() {
    this.props.getDeputies();
  }

  renderLoader = () => {
    const { loading } = this.props;

    if (!loading) return null;

    return (
      <View style={loadingStyle}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  handleLoadMore = () => {
    const { pagination, getMoreDeputies } = this.props;
    if (pagination.next) {
      getMoreDeputies(pagination.next);
    }
  }

  render() {
    const { listOfDeputies } = this.props;
    return (
      <List>
        <FlatList
          data={listOfDeputies}
          keyExtractor={(item) => item.id}
          ListFooterComponent={this.renderLoader}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={1}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              avatar={{ uri: item.urlFoto.replace('http', 'https')}}
              title={item.nome}
              subtitle={item.siglaPartido}
            />
          )}
        />
      </List>
    );
  }
}

const mapStateToProps = ({ deputies: { listOfDeputies, pagination, loading } }) => ({
  listOfDeputies,
  pagination,
  loading,
});


export default connect(mapStateToProps, { getDeputies, getMoreDeputies })(Home);
