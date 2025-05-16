import React, { useState } from 'react';
import '../styles/TourPackage.css';

const TourPackage = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(null);

 const packages = [
  {
    id: 1,
    title: "Adventure in the Andes",
    description: "5-day hiking tour through stunning mountain landscapes with expert guides.",
    price: 3700, // soles (aproximadamente $1000 USD)
    image: "images/un-dia-de-relax-hermoso.jpg",
    duration: "5 days",
    difficulty: "Moderate",
    includes: ["Accommodation", "Meals", "Transport", "Guide"],
    dates: ["2023-06-15", "2023-07-20", "2023-08-10"]
  },
  {
    id: 2,
    title: "Amazon Jungle Expedition",
    description: "7-day immersive experience in the heart of the Amazon rainforest.",
    price: 4800, // soles (aproximadamente $1299 USD)
    image: "images/119666802.jpg",
    duration: "7 days",
    difficulty: "Challenging",
    includes: ["Lodge stay", "All meals", "Boat transport", "Bilingual guide"],
    dates: ["2023-06-10", "2023-07-15", "2023-09-05"]
  },
  {
    id: 3,
    title: "Coastal Paradise Getaway",
    description: "4-day relaxing beach vacation with optional water activities.",
    price: 2400, // soles (aproximadamente $649 USD)
    image: "images/puentes-en-huanuco-puente-calicanto.webp",
    duration: "4 days",
    difficulty: "Easy",
    includes: ["Beachfront hotel", "Breakfast", "Snorkeling gear", "Airport transfers"],
    dates: ["2023-05-20", "2023-06-25", "2023-08-15"]
  }
]; 

  const addToCart = (pkg) => {
    if (!selectedDate) {
      alert("Please select a date first");
      return;
    }
    
    const item = {
      ...pkg,
      selectedDate,
      travelers,
      total: pkg.price * travelers
    };
    
    setCart([...cart, item]);
    setIsCartOpen(true);
    setSelectedPackage(null);
    setSelectedDate('');
    setTravelers(1);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.total, 0);
  };

  const openPackageDetails = (pkg) => {
    setSelectedPackage(pkg);
    setIsCartOpen(false);
  };

  return (
    <div className="tour-package-container">
      <header className="tour-header">
        
        <div className="cart-icon" onClick={() => setIsCartOpen(!isCartOpen)}>
          🛒 {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </div>
      </header>

      {isCartOpen ? (
        <div className="cart-overlay">
          <div className="cart-container">
            <div className="cart-header">
              <h2>Your Booking Cart</h2>
              <button className="close-cart" onClick={() => setIsCartOpen(false)}>×</button>
            </div>
            
            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty</p>
                <button onClick={() => setIsCartOpen(false)}>Browse Tours</button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <div key={index} className="cart-item">
                      <div className="cart-item-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                      <div className="cart-item-details">
                        <h3>{item.title}</h3>
                        <p>Date: {item.selectedDate}</p>
                        <p>Travelers: {item.travelers}</p>
                        <p>Price: ${item.price} x {item.travelers} = ${item.total}</p>
                      </div>
                      <button className="remove-item" onClick={() => removeFromCart(index)}>×</button>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <div className="cart-total">
                    <span>Total:</span>
                    <span>${calculateTotal()}</span>
                  </div>
                  <button className="checkout-btn">Proceed to Checkout</button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : selectedPackage ? (
        <div className="package-detail-container">
          <button className="back-button" onClick={() => setSelectedPackage(null)}>← Back to all tours</button>
          
          <div className="package-hero" style={{ backgroundImage: `url(${selectedPackage.image})` }}>
            <div className="package-hero-content">
              <h2>{selectedPackage.title}</h2>
              <p className="package-price">From ${selectedPackage.price}</p>
            </div>
          </div>
          
          <div className="package-details">
            <div className="package-info">
              <h3>Description</h3>
              <p>{selectedPackage.description}</p>
              
              <div className="package-meta">
                <div className="meta-item">
                  <span>Duration:</span>
                  <span>{selectedPackage.duration}</span>
                </div>
                <div className="meta-item">
                  <span>Difficulty:</span>
                  <span>{selectedPackage.difficulty}</span>
                </div>
              </div>
              
              <h3>What's Included</h3>
              <ul className="included-list">
                {selectedPackage.includes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="package-booking">
              <h3>Book This Tour</h3>
              <div className="booking-form">
                <div className="form-group">
                  <label>Select Date:</label>
                  <select 
                    value={selectedDate} 
                    onChange={(e) => setSelectedDate(e.target.value)}
                  >
                    <option value="">Choose a date</option>
                    {selectedPackage.dates.map((date, index) => (
                      <option key={index} value={date}>{date}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Number of Travelers:</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="10" 
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value))}
                  />
                </div>
                
                <div className="price-summary">
                  <div className="price-row">
                    <span>${selectedPackage.price} x {travelers}</span>
                    <span>${selectedPackage.price * travelers}</span>
                  </div>
                </div>
                
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(selectedPackage)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="package-grid">
          {packages.map((pkg) => (
            <div key={pkg.id} className="package-card">
              <div 
                className="package-image" 
                style={{ backgroundImage: `url(${pkg.image})` }}
                onClick={() => openPackageDetails(pkg)}
              ></div>
              <div className="package-content">
                <h3>{pkg.title}</h3>
                <p className="package-description">{pkg.description}</p>
                <div className="package-footer">
                  <span className="package-price">From ${pkg.price}</span>
                  <button 
                    className="view-details-btn"
                    onClick={() => openPackageDetails(pkg)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TourPackage;  