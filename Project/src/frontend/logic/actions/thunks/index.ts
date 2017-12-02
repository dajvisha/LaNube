import { serverUrl, fetchHeader } from 'Config/constants';
import * as categories from './categories';
import * as resources from './resources';
import * as users from './users';
import * as tags from './tags';
import * as session from './session';

export var thunks = {
    resources: resources,
    categories: categories,
    users: users,
    tags: tags,
    session: session
}

function evaluate(response: any): Promise<any> {
    if (!response.ok) {
        throw response;
    }
    else
        return response.json();
}

export function post(object: any, route: string) {
    return fetch(
        serverUrl + route, {
        method: 'POST',
        headers: fetchHeader,
        mode: 'cors',
        credentials: "include",
        body: JSON.stringify({
            ...object
        })
    }).then(response => { return evaluate(response) }, error =>{ return evaluate(error) })
}

export function get(route: string) {
    return fetch(
        serverUrl + route, {
        method: 'GET',
        mode: 'cors',
        headers: fetchHeader,
        credentials: 'include'
    }).then(response => { return evaluate(response) }, error =>{ return evaluate(error) })
}

export function del(route: string) {
    return fetch(
        serverUrl + route, {
        method: 'DELETE',
        mode: 'cors',
        headers: fetchHeader,
        credentials: "include"
    }).then(response => { return evaluate(response) }, error =>{ return evaluate(error) })
}