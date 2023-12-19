import {
  FormControl,
  Select,
  MenuItem,
  makeStyles,
  FormHelperText
} from "@material-ui/core";

type MenuProps<T extends string | number> = {
  options: T[];
  helperText: string;
  selectedValue: T;
  handleSelectChange: (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    child: React.ReactNode
  ) => void;
  inputStyle?: React.CSSProperties;
};

const SelectMenuList = <T extends string | number>({
  options,
  helperText,
  selectedValue,
  handleSelectChange
}: MenuProps<T>) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <Select
        value={selectedValue}
        onChange={handleSelectChange}
        displayEmpty
        className={classes.selectEmpty}
        autoWidth
      >
        {options.map((param, index) => (
          <MenuItem key={`${index}${param}`} value={param}>
            {param}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
export default SelectMenuList;
const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 110
  },
  selectEmpty: {}
}));
