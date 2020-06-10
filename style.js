function getSnowStyle(opacity) {
    return `
  #layer {
    polygon-fill: #00d0ff;
    polygon-opacity: ` + opacity + `;
  }
`
}

function getNoDataStyle(opacity) {
    return `
  #layer {
    polygon-fill: #eb3a34;
    polygon-opacity: ` + opacity + `;
  }
`
}