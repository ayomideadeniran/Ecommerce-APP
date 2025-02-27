import React, { useState } from 'react';

const AirtimeModal = ({ isOpen, onClose, onSendAirtime, orderId }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

  if (!isOpen) return null;

  const handleSend = async () => {
    setLoading(true);
      setError(null);
      setSuccess(null);
    try {
        if(amount == ""){
           setError("Please input the amount you want to send");
           setLoading(false);
           return;
        }
        if (isNaN(parseInt(amount))) {
            setError('Amount must be a valid number.');
            setLoading(false);
            return;
        }

      // Simulate sending airtime - Replace with your actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay of 1 second
        await onSendAirtime(parseInt(amount)); // Ensure amount is a number
        //here will be the response from the api
        setSuccess(`Airtime of ${amount} sent successfully for order ${orderId}`);
      // Clear the input and close the modal
      setAmount('');
    } catch (error) {
      console.error('Error sending airtime:', error);
        setError('Error sending airtime. Please try again.');
    } finally {
      setLoading(false);
    }
  };

    const handleClose = () => {
        onClose();
    }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1001,
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          width: '300px',
        }}
      >
        <h2>Send Airtime</h2>
        <p>Do you want to send airtime?</p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <button
            onClick={handleClose}
            style={{
              backgroundColor: '#ccc',
              color: '#000',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={loading || !amount}
            style={{
              backgroundColor: '#22c55e',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AirtimeModal;
