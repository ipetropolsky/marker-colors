import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const LargeInput = withStyles(() => ({ input: { fontSize: 24 } }))(Input);

export default LargeInput;
