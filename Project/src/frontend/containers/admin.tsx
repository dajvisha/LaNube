import * as React from 'react';
import { connect } from 'react-redux';

import { createAction } from 'Logic/actions';
import { thunks } from 'Logic/actions/thunks';

import { 
    User, 
    Status, 
    UserActions,
    ResourceActions,
    CategoryActions
} from 'Config/constants';

import { AdminView } from 'Presentational/components/adminView';
import { UpdateUser } from 'Presentational/components/updateUser';
import { UpdateCategory } from 'Presentational/components/updateCategory';
import { UpdateResource } from 'Presentational/components/updateResource';
import { isEmpty, isRecentlyReady, hasRecentlyFailed } from 'Config/helper';

class Admin extends React.Component<any, any> {
    state = {
        admins: null,
        collabs: null,
        tags: null
    }

    componentWillMount() {
        if(this.props.session.current) {
            this.props.loadUsers();
            this.props.loadCategories();
            this.props.loadResources();
        }
    }

    componentDidMount() {
        if(isEmpty(this.props.session.current)) {
            this.props.loadProfile();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.users.all != null &&
            isRecentlyReady(this.props.users, nextProps.users)) {
                let admins: User[] = [];
                let collabs: User[] = [];

                ((nextProps.users.all) as User[]).forEach(user => {
                    if(user.isAdmin) {
                        admins.push(user);
                    }
                    else {
                        collabs.push(user);
                    }
                });

                this.setState({
                    admins: admins,
                    collabs: collabs
                });
        }


        if(nextProps.tags.all != null &&
            isRecentlyReady(this.props.tags, nextProps.tags)) {
                let tags: string[];
                tags = nextProps.tags.all.map((tag) => tag.name);
                this.setState({
                    tags: tags
                });
            }

        if(isEmpty(nextProps.session.current)) {
            this.props.history.push('/login');
        }

    }

    componentDidUpdate(prevProps) {
        if(prevProps.session.current != this.props.session.current) {
            this.props.loadUsers();
            this.props.loadCategories();
            this.props.loadResources();
            this.props.loadTags();
        }
        if(hasRecentlyFailed(prevProps.session, this.props.session)) {
            this.props.history.push('/login');
        }
        
    }

    handleShowUser = (isAdmin) => (user) => {
        if(isEmpty(user)) {
            user = {} as User;
            user.isAdmin = isAdmin;
        }
        this.props.showUser(user);
    }

    render() {
        return (
            <div>
                <AdminView
                    admins = { this.state.admins }
                    collabs = { this.state.collabs }
                    categories = { this.props.categories.all }
                    resources = { this.props.resources.all }

                    showUser = { this.handleShowUser }
                    showCategory = { this.props.showCategory }
                    showResource = { this.props.showResource }

                    hideUser = { this.props.hideUser }
                    hideCategory = { this.props.hideCategory }
                    hideResource = { this.props.hideResource }

                    updateUser = { this.props.updateUser }
                    updateCategory = { this.props.updateCategory }
                    updateResource = { this.props.updateResource }

                    deleteUser = { this.props.deleteUser }
                    deleteCategory = { this.props.deleteCategory }
                    deleteResource = { this.props.deleteResource }

                    logout = {this.props.logout}
                    user = {this.props.session.current.name}
                />
                <UpdateUser 
                    visible = { this.props.users.update.open }
                    object = { this.props.users.update.object } 
                    hide = { this.props.hideUser }
                    failed = { this.props.users.status == Status.Failed }
                    waiting = { this.props.users.status == Status.WaitingOnServer }
                    submit = {this.props.updateUser}
                    error = {this.props.users.error}/>
                <UpdateCategory 
                    visible = { this.props.categories.update.open }
                    object = { this.props.categories.update.object } 
                    hide = { this.props.hideCategory }
                    failed = { this.props.categories.status == Status.Failed }
                    waiting = { this.props.categories.status == Status.WaitingOnServer }
                    submit = {this.props.updateCategory}
                    error = {this.props.categories.error}/>
                <UpdateResource 
                    visible = { this.props.resources.update.open }
                    object = { this.props.resources.update.object } 
                    hide = { this.props.hideResource }
                    failed = { this.props.resources.status == Status.Failed }
                    waiting = { this.props.resources.status == Status.WaitingOnServer }
                    submit = {this.props.updateResource}
                    categories = {this.props.categories}
                    tags = {this.state.tags}
                    error = {this.props.resources.error}/>
            </div>);
    }
}

function mapStateToProps(state: any) {
    return {
        session: state.session,
        users: state.users,
        categories: state.categories,
        resources: state.resources,
        tags: state.tags
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        loadUsers: () => dispatch(thunks.users.all()),
        loadProfile: () => dispatch(thunks.session.profile()),
        loadCategories: () => dispatch(thunks.categories.all()),
        loadResources: () => dispatch(thunks.resources.all()),
        loadTags: () => dispatch(thunks.tags.all()),

        updateUser: (user, editing) => dispatch(thunks.users.update(user, editing)),
        updateCategory: (category, editing) => dispatch(thunks.categories.update(category, editing)),
        updateResource: (resource, editing) => dispatch(thunks.resources.update(resource, editing)),

        showUser: (user=null) => dispatch(createAction(UserActions.Update, user, null, Status.WaitingOnUser)),
        showCategory: (category=null) => dispatch(createAction(CategoryActions.Update, category, null, Status.WaitingOnUser)),
        showResource: (resource=null) => dispatch(createAction(ResourceActions.Update, resource, null, Status.WaitingOnUser)),

        hideUser: () => dispatch(createAction(UserActions.Update, null, null, Status.Ready)),
        hideCategory: () => dispatch(createAction(CategoryActions.Update, null, null, Status.Ready)),
        hideResource: () => dispatch(createAction(ResourceActions.Update, null, null, Status.Ready)),

        deleteUser: (user) => dispatch(thunks.users.remove(user)),
        deleteCategory: (category) => dispatch(thunks.categories.remove(category)),
        deleteResource: (resource) => dispatch(thunks.resources.remove(resource)),

        logout: () => dispatch(thunks.session.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)