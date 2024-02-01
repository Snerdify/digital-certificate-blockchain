// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [recipient, setRecipient] = useState('');
  const [certificateHash, setCertificateHash] = useState('');
  const [issueSuccess, setIssueSuccess] = useState(false);

  const handleIssueCertificate = async () => {
    try {
      await axios.post('http://localhost:3001/issueCertificate', {
        recipient,
        certificateHash,
      });
      setIssueSuccess(true);
    } catch (error) {
      console.error('Error issuing certificate:', error);
    }
  };

  return (
    <div>
      <h1>Digital Certificate System</h1>
      <div>
        <label>Recipient Address:</label>
        <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
      </div>
      <div>
        <label>Certificate Hash:</label>
        <input type="text" value={certificateHash} onChange={(e) => setCertificateHash(e.target.value)} />
      </div>
      <button onClick={handleIssueCertificate}>Issue Certificate</button>
      {issueSuccess && <p>Certificate issued successfully!</p>}
    </div>
  );
}

export default App;
