/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

/**
 * Lucksheet instance
 * options.data: sheet file data
 *
 * @param {*} options luckysheet configuration options
 * @param  {...any} props other HTML props
 * @returns
 */
const Sheet = ({ options, ...props }) => {
  useEffect(() => {
    const luckysheet = window.luckysheet;
    luckysheet.create({
      container: 'luckysheet',
      plugins: ['chart'],
      ...options,
    });
  });
  return <div id="luckysheet" {...props}></div>;
};

// class Sheet extends React.Component {

//     componentDidMount() {
//         const luckysheet = window.luckysheet;
//         luckysheet.create({
//             container: "luckysheet",
//             plugins:['chart']
//         });
//     }
//     render() {
//         const luckyCss = {
//             margin: '0px',
//             padding: '0px',
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//             left: '0px',
//             top: '0px'
//         }
//         return (
//             <div
//             id="luckysheet"
//             style={luckyCss}
//             ></div>
//         )
//     }
// }

export default Sheet;
