import React, { useEffect, useState } from "react";
import { Card, Col, Row, Badge } from "react-bootstrap";
import "./ListingCard.css";
// import { useHistory } from "react-router-dom"; // legacy implementation - useful for reference

/**
 * File name: ListingCard.js
 * Purpose: ListingCard is used to instantiate a product listing card for product_listing(s) from the database. It works
 *          by receiving the data passed as props, then parsing the fields from that data to render specific elements of
 *          each unique card. On click, any card on any view must be able to route to a productListing view with that
 *          card's specific data. This is handled by sending its data (as props again) through the history.push() method
 *          to the productlisting route.
 * Authors: YG, Trenton, Joy
 */

export default function ListingCard(props) {
  // const history = useHistory(); // for sending and receiving data between views

  // for routing to a unique productListing view after onClick event for specific card
  function handleClick(e) {
    e.preventDefault();
    // history.push("/productlisting", {
    //   productListing: props
    // });
    window.open(`/productlisting`, "_blank");
    window.productlisting = props;
    window.newImage = img;
  }
  // console.log(props)

  /*
   newImage and newImage2 are how we render either binary or b64 data received from our props, as images. We need to
   create state (below) and update the src of our <Card.Img> with the value of either of these on an error rendering.
   We only store images as binary (manual uploading into database through workbench) and b64 (through app createListing)
   so we do not need any further rendering options other than these two.
  */
  let newImage = new Buffer.from(props.image_blob.data).toString(); //renders base64 data
  let newImage2 = new Buffer.from(props.image_blob.data).toString("base64"); //renders binary data

  /*
   If we implement thumbnails, we will use these instead of the above values, as we will pull from the image_thumb col
   of our image table for the lower res image files on multi-card views (home, books, furniture... etc.) and save the
   full res images (image_blob col of Product_Listings) for individual productListing views.
  */
  // let newImage = new Buffer.from(props.image_thumb.data).toString();
  // let newImage2 = new Buffer.from(props.image_thumb.data).toString("base64");

  const [img, setImg] = useState(newImage2); // state for img (see above)
  // const [flag, setFlag] = useState(true); // state for flag - legacy implementation
  const [cond, setCond] = useState("");
  const [desc, setDesc] = useState("");
  const [conditionColor, setConditionColor] = useState("");
  /*
   This useEffect is for rendering images tailored to specific product_listings. For product_id's < 33, we render the
   binary data which we manually input into the database for initial testing; and thereafter, we set our image to render
   base64 data which is saved through the application's registered users.
  */
  useEffect(() => {
    if (props.product_id < 33) {
      setImg(newImage2);
    } else {
      setImg(newImage);
    }
    if (props.condition === "1") {
      setCond("Like New");
      setConditionColor("success");
    } else if (props.condition === "2") {
      setCond("Very Good");
      setConditionColor("warning");
    } else if (props.condition === "3") {
      setCond("Good");
      setConditionColor("info");
    } else if (props.condition === "4") {
      setCond("Acceptable");
      setConditionColor("light");
    }
    if (props.description.length > 90) {
      setDesc(props.description.substring(0, 90) + "...");
    } else {
      setDesc(props.description);
    }
  }, [props, img, cond, desc]);

  return (
    <Card
      onClick={handleClick}
      className="listingcard"
      style={{ height: "30rem", width: "15rem" }}
    >
      {/*<Card.Img variant="top" src="holder.js/100px160" />*/
      /*replaced with below, keeping for legacy reference*/}
      <Card.Img
        variant="top"
        src={`data:image/jpeg;charset=utf-8;base64, ${img}`}
        // onError={(e)=>{if(flag){setFlag(false);setImg(newImage)}}}   /*keeping for reference*/
        alt="image not found"
        classname="img-thumbnail"
        style={{
          maxWidth: "15rem",
          maxHeight: "20rem",
          borderBottom: "solid",
          borderBottomColor: "#efefef",
          borderWidth: "1px",
          marginBottom: "-10px",
        }}
      />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          <Row className="price-condition">
            <Col
              style={{
                marginLeft: "-40px",
                marginRight: "-10px",
                paddingLeft: "0",
                paddingRight: "0",
                fontSize: "13pt",
              }}
              lg={11}
            >
              <Badge variant="primary">${props.price}</Badge>
            </Col>
            <Col style={{ marginLeft: "-60px", fontSize: "13pt" }} lg={1}>
              <Badge variant={conditionColor}>{cond}</Badge>
            </Col>
          </Row>
        </Card.Text>
        <Card.Text>{desc}</Card.Text>
      </Card.Body>
    </Card>
  );
}
