import React, { memo } from "react"
import ContentLoader from "react-content-loader"

export const SneakerLoader = memo((props) => (
  <ContentLoader 
    speed={2}
    width={150}
    height={206}
    viewBox="0 0 150 206"
    backgroundColor="#f0f0f0"
    foregroundColor="#e3e3e3"
    {...props}
  >
    <rect x="0" y="0" rx="10" ry="10" width="150" height="91" /> 
    <rect x="0" y="130" rx="3" ry="3" width="150" height="15" /> 
    <rect x="0" y="153" rx="3" ry="3" width="93" height="15" /> 
    <rect x="0" y="180" rx="8" ry="8" width="80" height="24" /> 
    <rect x="118" y="173" rx="8" ry="8" width="32" height="32" />
  </ContentLoader>
))

