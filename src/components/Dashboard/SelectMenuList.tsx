import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  styled,
  SelectChangeEvent,
  Box
} from "@mui/material";

type MenuProps<T extends string | number> = {
  options: T[];
  helperText: string;
  selectedValue: T;
  handleSelectChange: (event: SelectChangeEvent<unknown>) => void;
  inputStyle?: React.CSSProperties;
};

const SelectMenuList = <T extends string | number>({
  options,
  helperText,
  selectedValue,
  handleSelectChange
}: MenuProps<T>) => {
  return (
    <Box
      sx={{
        marginRight: 2
      }}
    >
      <StyledFormControl size="small">
        <Select
          value={selectedValue}
          onChange={(event) =>
            handleSelectChange(event as SelectChangeEvent<unknown>)
          }
          displayEmpty
          autoWidth
        >
          {options.map((param, index) => (
            <MenuItem key={`${index}${param}`} value={param}>
              {param}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </StyledFormControl>
    </Box>
  );
};
const StyledFormControl = styled(FormControl)({
  minWidth: 80,
  textAlign: "center"
});

export default SelectMenuList;
