import Ajax from './webRequest/ajax';
import ParseTimer from 'base-parse-timer';

const Root = {
    WebRequest: Ajax,
    parseTimer: ParseTimer,

    init: () => {
        return Root
    }
};

export default Root