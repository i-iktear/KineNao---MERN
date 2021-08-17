import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <div>
      <Helmet>
        <title> {title} </title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
    </div>
  );
};

Meta.defaultProps = {
  title: "Welcome to KineNao",
  description: "Buy authentic product at cheap price",
  keywords: "Electronics, Gadgets, Cheap gadgets",
};

export default Meta;
