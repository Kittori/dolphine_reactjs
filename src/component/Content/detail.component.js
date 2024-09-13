import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button, Carousel, CarouselItem, CarouselIndicators, Modal, ModalBody, } from 'reactstrap';
import '../assets/css/aquarium_css/detail.css';

const FishDetail = () => {
  const { _id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fish, setFish] = useState(null);
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchFish = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/fishs/fish/${_id}`);
        setFish(response.data);
        const { image } = response.data;
        if (image) {
          setItems([image]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFish();
  }, [_id]);

  const addToCart = async () => {
    try {
      const response = await axios.post('http://localhost:5000/carts/cart', {
        fishID: _id,
        accID: "664d422b63ee97ae2888b892", // Replace with actual account ID
        quantity: 1
      });
      console.log('Fish added to cart:', response.data);
      setModalMessage("Add fish to cart successfully!");
    } catch (error) {
      console.error('Error adding fish to cart:', error);
      setModalMessage("Failed to add fish. Please try again.");
    } finally {
      setModal(true);
    }
  };

  const closeModal = () => {
    setModal(false);
    if (modalMessage === "Add fish to cart successfully!") {
      console.log('success');
    }
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('de-DE').format(number);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const CarouselSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const onExiting = () => setAnimating(true);
    const onExited = () => setAnimating(false);
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    };
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    };
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    };

    return (
      <div className="section" id="carousel">
        <Container>
          <Row className="justify-content-center w-100">
            <Col lg="7" md="12">
              <Carousel activeIndex={activeIndex} next={next} previous={previous}>
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {items.map((item, index) => (
                  <CarouselItem onExiting={onExiting} onExited={onExited} key={index}>
                    <img src={require(`../assets/img/aquarium/${item}`)} alt={fish.name} />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>{fish.name}</h5>
                    </div>
                  </CarouselItem>
                ))}
                <a className="carousel-control-prev" data-slide="prev" href="#pablo" onClick={(e) => { e.preventDefault(); previous(); }} role="button">
                  <i className="now-ui-icons arrows-1_minimal-left"></i>
                </a>
                <a className="carousel-control-next" data-slide="next" href="#pablo" onClick={(e) => { e.preventDefault(); next(); }} role="button">
                  <i className="now-ui-icons arrows-1_minimal-right"></i>
                </a>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  return (
    <Container fluid className="fish-detail">
      {fish && (
        <Row>
          <Col md="6" className="main-image">
            <CarouselSection />
          </Col>
          <Col md="6" className="details">
            <h1>{fish.name}</h1>
            <div className="price">{formatNumber(fish.price)} VNĐ</div>
            <div className="rating">★★★★☆</div>
            <blockquote>
              <p className="blockquote blockquote-info">
                "{fish.description}"<br/><br/>
                <small>- Noaa</small>
              </p>
            </blockquote>
            <Button className="btn-round" color="info" type="button" onClick={addToCart}>
              <i className="now-ui-icons ui-2_favourite-28"></i>
              Add to Cart
            </Button>
            <Button className="btn-icon btn-round" color="info" type="button">
              <i className="now-ui-icons ui-2_favourite-28"></i>
            </Button>
            <div className="share">
              Share:
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">Pinterest</a>
            </div>
          </Col>
        </Row>
      )}
      <Modal
          modalClassName="modal-mini modal-info"
          toggle={closeModal}
          isOpen={modal}
        >
          <div className="modal-header justify-content-center">
            <div className="modal-profile">
              <i className="now-ui-icons users_circle-08"></i>
            </div>
          </div>
          <ModalBody>
            <p>{modalMessage}</p>
          </ModalBody>
          <div className="modal-footer">
            <Button className="btn-neutral" color="link" onClick={closeModal}>
              Close
            </Button>
          </div>
        </Modal>
    </Container>
    
  );
};

export default FishDetail;
