/* eslint no-undef: 0 */
import React, { useEffect } from "react";
import { PrismCode } from "./prismcode";
import useScript from "./useScript";

const JsonLd = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

const YouVisitIWC = (props) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: props.title,
    description: props.description
      ? props.description
      : "Interactive Image Element",
    thumbnailUrl: props.thumb ? props.thumb : "",
    uploadDate: props.uploadDate
      ? props.uploadDate
      : "2020-03-31T08:00:00+08:00",
    publisher: {
      "@type": "Organization",
      name: "EAB",
      logo: {
        "@type": "ImageObject",
        url:
          "https://attachment.eab.com/wp-content/uploads/2019/07/EAB-Logo-RGB.png",
        width: 500,
        height: 193,
      },
    },
    contentUrl: "url of actual tour",
    embedUrl: "url where the tour has been placed",
    interactionCount: "locations.views",
  };

  const YVSource = "https://www.youvisit.com/tour/Embed/js3";
  const status = useScript(YVSource);

  const width = props.containerWidth;
  const height = props.containerHeight;
  // const type = props.type

  useEffect(() => {
    const yvObj = window.YVScript;
    if (status === "ready") {
      yvObj && yvObj.scanEmbeds();
    }
  });

  const iwcstyle = {
    // border: "5px solid pink",
    display: "block",
    width: `${width}`,
    height: `${height}`,
  };

  let stopId;
  if (typeof props.stopId !== "undefined") {
    stopId = `data-stopid="${props.stopId}"\n`;
  } else {
    stopId = "";
  }
  const type = props.type && `data-type=${props.type}`;

  const codeString = `
<div style="height: ${props.containerHeight}; width: ${props.containerWidth}">
  <a href="https://www.youvisit.com"
      class="virtualtour_embed"
      title="${props.title}"
      data-platform="v"
      data-link-type="${props.linkType}"
      data-inst="${props.institution}"
      data-image-width="${props.iwcWidth}"
      data-image-height="${props.iwcHeight}"
      data-loc="${props.location}"
      data-hover-width="${props.hoverWidth}"
      data-hover-height="${props.hoverHeight}"
      ${type}
      ${stopId}
      >
  Virtual Tour
  </a>
</div>
<script async="async" defer="defer" src="https://www.youvisit.com/tour/Embed/js3"></script>
    `;

  function IWCTag() {
    return (
      <a
        href="https://www.youvisit.com"
        className="virtualtour_embed"
        data-platform="v"
        data-type="inline-embed"
        title={props.title}
        data-link-type={props.linkType}
        data-inst={props.institution}
        data-image-width={props.iwcWidth}
        data-image-height={props.iwcHeight}
        data-loc={props.location}
        data-hover-width={props.hoverWidth}
        data-hover-height={props.hoverHeight}
        stopId
      >
        Virtual Tour
      </a>
    );
  }

  function TourTag() {
    return (
      <a
        href="https://www.youvisit.com"
        className="virtualtour_embed"
        title={props.title}
        data-platform="v"
        data-link-type={props.linkType}
        data-inst={props.institution}
        data-image-width={props.iwcWidth}
        data-image-height={props.iwcHeight}
        data-loc={props.location}
        data-hover-width={props.hoverWidth}
        data-hover-height={props.hoverHeight}
      >
        Virtual Tour
      </a>
    );
  }

  let formattedCode;
  if (props.showCode === "true") {
    formattedCode = (
      <PrismCode code={codeString} language="html" plugins={["line-numbers"]} />
    );
  }

  return (
    <>
      <div className="iwc" style={iwcstyle}>
        {props.type === "hover-panel" && <TourTag />}
        {props.type === "inline-embed" && <IWCTag />}
      </div>
      {formattedCode}
      <JsonLd data={data} />
    </>
  );
};

export default YouVisitIWC;

YouVisitIWC.defaultProps = {
  containerHeight: "300px",
  containerWidth: "100%",
  title: "Launch Experience",
  linkType: "immersive",
  type: "inline-embed",
  iwcWidth: "100%",
  iwcHeight: "100%",
  location: "",
  hoverWidth: "90%",
  hoverHeight: "70%",
  loadStopOnly: "0",
  experience_type: "iwc",
};
