/**
 * Landing.js is a legacy view implemented during vertical prototype testing. It now only serves as a reference and
 * fallback point.
 */


// import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// import {
//   Jumbotron,
//   Button,
//   InputGroup,
//   FormControl,
//   Form,
// } from "react-bootstrap";
// import "./Landing.css";
//
// export default function Landing() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("");
//   const [productListings, setProductListings] = useState([]);
//   const { push } = useHistory();
//
//   useEffect(() => {
//     const getListings = () => {
//       axios
//         .post("/api/search/searchProducts", {
//           searchTerm: searchTerm,
//           category: category,
//         })
//         .then((response) => {
//           // console.log(response);
//           setProductListings(response.data);
//         });
//     };
//     getListings();
//     // console.log(searchTerm);
//   }, [searchTerm, category]);
//
//   const handleCategoryChange = (e) => {
//     setCategory(e.target.value);
//   };
//
//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };
//
//   // onSearch -> redirect to result page
//   const onSearch = () => {
//     push("/test", {
//       productListings: productListings,
//       category: category,
//       searchTerm: searchTerm,
//     });
//   };
//
//   return (
//     <div>
//       <Jumbotron className="landing-banner">
//         <h1>Software Engineering class SFSU</h1>
//         <h3>Fall 2020</h3>
//         <h3>Team 8</h3>
//
//         {/* Search Bar */}
//         <InputGroup className="mx-auto" style={{ width: "820px" }}>
//           <Form.Group style={{ width: "15%" }}>
//             <Form.Control
//               as="select"
//               name="category"
//               value={category}
//               onChange={handleCategoryChange}
//             >
//               <option>Category</option>
//               <option>Book</option>
//               <option>Furniture</option>
//               <option>Electronic</option>
//             </Form.Control>
//           </Form.Group>
//
//           <Form.Group style={{ width: "75%" }}>
//             <FormControl
//               placeholder="Search.."
//               value={searchTerm}
//               onChange={handleInputChange}
//             />
//           </Form.Group>
//           <Form.Group>
//             <InputGroup.Append>
//               <Button variant="outline-secondary" onClick={onSearch}>
//                 Search
//               </Button>
//             </InputGroup.Append>
//           </Form.Group>
//         </InputGroup>
//       </Jumbotron>
//     </div>
//   );
// }
