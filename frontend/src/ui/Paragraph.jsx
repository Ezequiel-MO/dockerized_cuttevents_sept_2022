import { Typography } from "@mui/material";

const Paragraph = ({ textContent }) => {
  const jsonText =
    JSON.stringify(textContent).replace(/[^a-zA-Z0-9. ]/g, "") ?? "";

  return <Typography variant="body">{jsonText}</Typography>;
};

export default Paragraph;
