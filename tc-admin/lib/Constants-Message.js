function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

/**
 * Admin messages
 */
define("AD0001", 'User(s) has been approved');
define("AD0002", 'Select user to approve');
define("AD0003", 'User has been added to Mass Mail list');
define("AD0004", 'User has been removed from Mass Mail list');