// https://tech.hh.ru/bloko/#/%E2%80%A2%20fuzzySearch
import memoizeOne from 'memoize-one';

const memoize = memoizeOne.default || memoizeOne;

/**
 * Модуль для поиска одной строки в другой.
 * Учитывает раскладку клавиатуры и буквы Е/Ё.
 * Ищет совпадения только в начале слов.
 */

const yoRegex = /[её]/g;
const spaceRegex = /\s+/g;

function trim(string) {
    return string.replace(spaceRegex, ' ').trim();
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function prepareForRegExp(string) {
    return escapeRegExp(string).replace(yoRegex, '[её]');
}

const RUSSIAN = 'qwertyuiopasdfghjkl;\'zxcvbnm,QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>`~[].'.split('');
const ENGLISH = 'йцукенгшщзфывапролджэячсмитьбЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮёЁхъю'.split('');

function createHashMap(names, values) {
    return names.reduce((hashMap, item, index) => {
        hashMap[item] = values[index];
        return hashMap;
    }, {});
}

const LANG_MAP = {
    russian: createHashMap(RUSSIAN, ENGLISH),
    english: createHashMap(ENGLISH, RUSSIAN),
};

// 'москва city' => 'vjcrdf city'
// 'москва сity' => 'москва сшен'
function convert(substring, alphabet) {
    return substring
        .split('')
        .map((item) => alphabet[item] || item)
        .join('');
}

function getMultilanguageStrings(query) {
    return [
        query.toLowerCase(), // москва сity
        convert(query, LANG_MAP.russian).toLowerCase(), // "москва сшен"
        convert(query, LANG_MAP.english).toLowerCase(), // "vjcrdf city"
    ];
}

/**
 * Возвращает функцию, которая возвращает результат поиска `filterQuery`
 * в переданной строке. Нужно для оптимизации поиска одного и того же
 * фрагмента в большом наборе строк, чтобы не создавать и не хранить
 * много регэкспов.
 *
 * @param filterQuery {String} Что ищем.
 * @returns {Function}
 * @example
 *     const test = FuzzySearch.createMatcher('моск');
 *     test('Москва'); // true
 *     test('Подмосковье'); // false
 * @private
 */
const createMatcher = memoize((filterQuery) => {
    const filterQueryTrimmed = trim(filterQuery);
    if (filterQueryTrimmed.length) {
        const regexpStrings = getMultilanguageStrings(filterQueryTrimmed).map(prepareForRegExp);
        const re = new RegExp(`(^|[^a-zа-яё])(${regexpStrings.join('|')})`);
        return (searchString) => re.test(trim(searchString).toLowerCase());
    }
    return () => true;
});

/**
 * Возвращает результат поиска одной строки в другой.
 *
 * @param filterQuery {String} Что ищем.
 * @param searchString {String} Где ищем.
 * @returns {Boolean}
 * @example
 *     FuzzySearch.match('моск', 'Москва'); // true
 *     FuzzySearch.match('моск', 'Подмосковье'); // false
 */
function match(filterQuery, searchString) {
    const test = createMatcher(filterQuery);
    return test(searchString);
}

export default { match };
