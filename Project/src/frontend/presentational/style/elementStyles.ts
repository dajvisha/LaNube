const Styles = {
    colors: {
        green: '#63BB67',
        white: '#F1F1F1',
        blue: '#B2D3EF',
        gray: '#555555'
    },
    navbar: {
        navbar: {
            class: 'uk-container',
            style: {
                height: '100px',
                marginTop: '10px',
                display: 'flex',
                justifyContent: 'center' as 'center'
            }
        },
        logo: {
            class: 'uk-logo uk-inline',
            style: {
                marginLeft: '0px',
            }
        }
    },
    rightContent: {
        style: {
            width: '80%',
            float: 'right',   
        }
    },
    leftContent: {
        style: {
            width: '20%',
            float: 'left',
        }
    },
    list: {
        class: 'uk-list uk-list-divider',
    },
    resourceCardHead: {
        class: "uk-card uk-card-primary uk-width-1-4@m uk-inline",
        style: {
            marginRight: '25px',
        },
    },
    resourceCardBody: {
        class: "uk-card-body",
    },
    resourceCardText: {
        class: "uk-button uk-button-text",
    },
    flexGrow: {
        flex: '1 1 auto',
    },
    menu: {
        container: {
            class: "uk-width-1-2@s uk-width-2-5@m",
        },
        list: {
            class: "uk-nav uk-nav-default",
        },
    },
    root: {
        style:{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
        }
      },
      gridList: {
        style:{
        width: 500,
        height: 200,
        overflowY: 'auto',
        }
      },
      gridListResources: {
        style:{
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'auto',
        }
    },
    logoutButton: {
        style: {
            float: 'right',
            height: '25px',
            marginRight: '0px',
        }
    },
   addButton: {
        style: {
            float: 'right',
            marginRight: '0px',
        }
    },
    searchAdminView: {
        style: {
            float: 'left',
            marginLeft: '0px',
            width: '90%'
        }
    },
}

export default Styles;