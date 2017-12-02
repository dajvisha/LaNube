import {
  Status,
  User
} from 'Config/constants';

function resolve(path, obj) {
  return path.split('.').reduce(function(prev, curr) {
      return prev ? prev[curr] : undefined;
  }, obj || self);
};

export function search(query: string, sample: any[], properties: string[]): any[] {
  let normQuery = normalize(query);
  return sample.filter((s) => {
    for(let i = 0; i < properties.length; i++) {
      let resolved = resolve(properties[i], s);
      if(Array.isArray(resolved)) {
        for(let j = 0; j < resolved.length; j++) {
          if(normalize(resolved[j]).indexOf(normQuery) !== -1)
            return true;
        }
      }
      else {
        if(normalize(resolved).indexOf(normQuery) !== -1)
          return true;
      }
    }
    return false;
  });
}

export function normalize(text: string): string {
  return text.toLowerCase().replace("á", "a")
              .replace("é", "e").replace("í", "i")
              .replace("ó", "o").replace("ú", "u");
}

export function containsOnlyIsAdmin(user: User): boolean {
  return !user.name && !user.email && !user.password && user.isAdmin != undefined;
}

export function isEmpty(object): boolean {
  return !object || (Object.keys(object).length === 0) || object == null;
}

export function isRecentlyReady(previous, next): boolean {
  return previous.status != next.status && 
          next.status == Status.Ready
}

export function hasRecentlyFailed(previous, next): boolean {
  return previous.status != next.status && 
          next.status == Status.Failed
}