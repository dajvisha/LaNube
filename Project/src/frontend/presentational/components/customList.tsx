import * as React from 'react';
// import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
// import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import AddIcon from 'material-ui-icons/Add';
import TextField from 'material-ui/TextField';

import Container from 'Presentational/elements/Container';
import Styles from 'Presentational/style/elementStyles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';

function listElements(items, search, showFunction, deleteFunction, description) {
  search = search.toLowerCase();
  search = search.replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u");

  var filterByName = items.filter((item) => {
    item = item.name.toLowerCase();
    item = item.replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u");
    return item.indexOf(search.toLowerCase()) !== -1; 
  });

  items = filterByName;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          {!description &&
            <TableCell>Correo electrónico</TableCell>}
          {description &&
            <TableCell>Descripción</TableCell>}
          {description &&
            <TableCell>Última actualización</TableCell>}
            <TableCell>Borrar</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map(item => {
          return (<TableRow
                    key = {item._id}
                    hover = {true}>
            <TableCell onClick={() => showFunction(item)}>
              {item.name}
            </TableCell>
            {!description &&
              <TableCell onClick={() => showFunction(item)}>
                {item.email}
            </TableCell>}
            {description &&
              <TableCell onClick={() => showFunction(item)}>
                {item.description}
            </TableCell>}
            {description &&
              <TableCell onClick={() => showFunction(item)}>
                {item.updated_by[item.updated_by.length-1].user.name}
            </TableCell>}
            <TableCell>
              <IconButton 
                aria-label="Delete"
                onClick={() => {if (confirm("¿Quieres eliminar este elemento?") == true) {deleteFunction(item)}}}>
                  <DeleteIcon/>
              </IconButton></TableCell>
          </TableRow>)
        })}
      </TableBody>
    </Table>
  )
}

export class CustomList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      search: '',
    }
  }

  handleChange(newValue: string | undefined) {
    this.setState({
      search: newValue,
    });
  }
  public render() {
      if(this.props.items == null)
        return <p>Loading...</p>

      return (
        <div>
          <Container>
            <div>
              <TextField
                  label="Buscar"
                  onChange={(e) =>
                  this.handleChange(e.target.value)}
                  style={Styles.searchAdminView.style}
                />
                <Button 
                  fab 
                  color="primary" 
                  aria-label="Add"
                  onClick={() => this.props.show(null)}
                  style={Styles.addButton.style}>
                    <AddIcon />
                </Button>
              </div>
              <br />
              <br />
              {listElements(this.props.items, this.state.search, this.props.show, this.props.delete, this.props.description)}
          </Container>
      </div>
      )
  }
}