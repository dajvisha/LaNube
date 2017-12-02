import * as User from '../models/user';

var _currentUser: any;

export async function getCurrentUserAsync(req: any): Promise<any> {
    if (_currentUser && _currentUser._id == req.session.auth_token){
        return _currentUser;
    }

    _currentUser = await User.findById(req.session.auth_token, "id name email isAdmin")
        .exec()
        .catch(() => {
            req.session.auth_token = null;
            return null;
        });

    return _currentUser;
}

export async function isUserLoggedInAsync(req: any): Promise<boolean> {
    var currentUser = await getCurrentUserAsync(req);
    return currentUser != null;
}

export async function currentUserIsAdminAsync(req: any): Promise<boolean> {
    var user = await getCurrentUserAsync(req);
    return user && user.isAdmin;
}
