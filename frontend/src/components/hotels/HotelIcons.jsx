import { Icon } from "@iconify/react";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";

const HotelIcons = ({ leftIconsText, rightIconsText }) => {
  const leftIcons = [
    <Icon icon="akar-icons:location" color="#ea5933" width="28" />,
    <Icon icon="bx:bx-restaurant" color="#ea5933" width="28" />,
    <Icon
      icon="icon-park-outline:hotel-please-clean"
      color="#ea5933"
      width="28"
    />,
    <Icon icon="akar-icons:wifi" color="#ea5933" width="28" />,
  ];

  const rightIcons = [
    <Icon icon="ic:outline-pool" color="#ea5933" width="28" />,
    <Icon icon="akar-icons:clock" color="#ea5933" width="28" />,
    <Icon icon="ic:sharp-meeting-room" color="#ea5933" width="28" />,
    <Icon icon="si-glyph:wheel-chair" color="#ea5933" width="28" />,
  ];

  let mixedLeft = leftIcons.map((x, i) => {
    return { icon: x, text: leftIconsText[i] };
  });

  let mixedRight = rightIcons.map((x, i) => {
    return { icon: x, text: rightIconsText[i] };
  });

  return (
    <div className="overflow-x-scroll no-scrollbar">
      <div className="flex justify-start">
        <List component="nav">
          {mixedLeft.map((item, i) => (
            <ListItem key={i}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <List component="nav">
          {mixedRight.map((item, i) => (
            <ListItem key={i}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default HotelIcons;
