var utils = require('./utils');
var _s = require('underscore.string');

/**
 * Attempts to generate url from request params
 *
 * @alias js
 *
 */
exports.compile = function(compiler, args, content, parents, options, blockName) {
    function genJs(tokens) {
        return utils.map(tokens, function(token) {
            if (token.content || typeof token !== 'string') {
                token.content = genJs(token.content);
                return token;
            }

            var result = '';
            var list = _s.words(token);

            for (var i = 0; i < list.length; i++) {
                var line = _s.trim(list[i]);
                var out = global.config.STATIC_BASE + (_s.startsWith(line, '/') ? line : '/' + line);
                result += ("\n<script type='text/javascript' src='" + out + "'></script>");
            }

            return result;
        });
    }

    return compiler(genJs(content), parents, options, blockName);
};

exports.parse = function(str, line, parser) {
    parser.on('*', function(token) {
        throw new Error('Unexpected token "' + token.match + '" on line ' + line + '.');
    });

    return true;
};

exports.ends = true;
exports.blockLevel = false;