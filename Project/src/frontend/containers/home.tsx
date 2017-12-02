import * as React from 'react';
import { connect } from 'react-redux';
import { search, isRecentlyReady, isEmpty } from 'Config/helper';
import Navbar from 'Presentational/elements/Navbar';
import { Home } from 'Presentational/components/home';
import { thunks } from 'Logic/actions/thunks';

class Main extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      search: '',
      resources: []
    }
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    if(isEmpty(this.props.categories.all)){
      this.props.loadCategories();
    }
    if(isEmpty(this.props.resources.all)) {
      this.props.loadResources();
    }
    if(isEmpty(this.props.tags.all)) {
      this.props.loadTags();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(isEmpty(this.state.resources) && nextProps.resources.all != null &&
        isRecentlyReady(this.props.resources, nextProps.resources)) {
          this.setState({
            resources: nextProps.resources.all
          });
    }
  }

  render() {
    return (
      <div>
        <Navbar 
          handleSearch = {this.handleSearch}
          searchQuery = {this.state.search}/>
        <Home
          users = {this.props.users}
          resources = {this.state.resources}
          status = {this.props.resources.status}
          handleSearch = {this.handleSearch}
          tags = {this.props.tags.all}/>
      </div>
    );
  }

  private handleSearch(newSearch: string | undefined) {
    let resources = newSearch && newSearch != ''? 
        search(newSearch, this.props.resources.all, 
          ['name', 'tags', 'type', 'category.name']) : 
        this.props.resources.all;
    this.setState({
      search: newSearch,
      resources: resources
    });
  }
}

function mapStateToProps(state: any) {
    return {
        users: state.users,
        resources: state.resources,
        categories: state.categories,
        tags: state.tags
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        loadCategories: () => dispatch(thunks.categories.all()),
        loadResources: () => dispatch(thunks.resources.all()),
        loadTags: () => dispatch(thunks.tags.all())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)