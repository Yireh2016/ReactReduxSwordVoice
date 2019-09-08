import React from "react";
import styled from "styled-components";

import LinkIcon from "./linkIcon/LinkIcon";

const CopyLink = ({ url, onClick }) => {
  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert(`${url} on clipboard`);
    });

    onClick();
  };

  return (
    <div onClick={copyLink}>
      <LinkIcon size={32} />
    </div>
  );
};

export default CopyLink;
