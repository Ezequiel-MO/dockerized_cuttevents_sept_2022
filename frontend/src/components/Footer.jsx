import { Icon } from "@iconify/react";
import { IconButton, Typography } from "@mui/material";

const Footer = () => {
  return (
    <div className="h-64 m-8 p-4 overflow-hidden bg-black-50 dark:bg-gray-50 rounded-lg flex items-start">
      <div className="flex flex-col basis-1/4">
        <IconButton>
          <a
            href="https://www.linkedin.com/company/335093/admin/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="akar-icons:linkedin-fill" width="30" color="#ccc" />
          </a>
        </IconButton>
        <IconButton>
          <a
            href="https://www.instagram.com/cutting_edge_events/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="akar-icons:instagram-fill" width="30" color="#ccc" />
          </a>
        </IconButton>
        <IconButton>
          <a
            href="https://www.facebook.com/EsCuttingEdge/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="akar-icons:facebook-fill" width="30" color="#ccc" />
          </a>
        </IconButton>
      </div>
      <div className="flex flex-col items-start">
        <Typography
          variant="overline"
          component="h6"
          className="tracking-widest"
        >
          DESIGNED BY
        </Typography>
        <Typography variant="overline" component="p">
          @CUTT/events - 2022
        </Typography>
        <Typography variant="overline" component="h6">
          ABOUT THIS QUOTATION
        </Typography>
        <Typography variant="body" gutterBottom>
          This Quotation has been crafted with care by the
          <strong> CUTT/events people</strong>. The Team has fully embraced the
          change to a digital mindset. This is only the beginning. We are
          working hard to make this the best possible experience for you, so
          please contact us at{" "}
          <a href="mailto:miranda@cutt.events">miranda@cutt.events</a> and leave
          us your feedback and suggestions on how we can improve.
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
