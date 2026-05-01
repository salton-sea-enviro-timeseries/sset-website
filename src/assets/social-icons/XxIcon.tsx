const XxIcon = ({
  fill = "white",
  width = 48,
  height = 48
}: {
  fill?: string;
  width?: number;
  height?: number;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 48 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27.3507 22.2578L40.4568 7.33887H37.3521L25.9673 20.2901L16.881 7.33887H6.39844L20.1417 26.9253L6.39844 42.5682H9.50308L21.518 28.8883L31.1159 42.5682H41.5984M10.6236 9.63156H15.3932L37.3498 40.3882H32.579"
      fill={fill}
    />
  </svg>
);
export default XxIcon;
