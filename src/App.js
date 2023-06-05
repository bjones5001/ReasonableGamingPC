import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [bestCPU, setBestCPU] = useState({});
  const [allCPUs, setAllCPUs] = useState([]);
  const [selectedCPU, setSelectedCPU] = useState(null);
  const [selectedCPUData, setSelectedCPUData] = useState(null);

  const [bestGPU, setBestGPU] = useState({});
  const [allGPUs, setAllGPUs] = useState([]);
  const [selectedGPU, setSelectedGPU] = useState(null);
  const [selectedGPUData, setSelectedGPUData] = useState(null);

  useEffect(() => {
    // Fetch the best CPU
    axios.get('http://localhost:3001/best-cpu')
      .then(response => {
        setBestCPU(response.data);
      })
      .catch(error => {
        console.error('Error fetching best CPU:', error);
      });

    // Fetch all CPUs
    axios.get('http://localhost:3001/cpus')
      .then(response => {
        setAllCPUs(response.data);
      })
      .catch(error => {
        console.error('Error fetching CPUs:', error);
      });

    // Fetch the best GPU
    axios.get('http://localhost:3001/best-gpu')
      .then(response => {
        setBestGPU(response.data);
      })
      .catch(error => {
        console.error('Error fetching best GPU:', error);
      });

    // Fetch all GPUs
    axios.get('http://localhost:3001/gpus')
      .then(response => {
        setAllGPUs(response.data);
      })
      .catch(error => {
        console.error('Error fetching GPUs:', error);
      });
  }, []);

  const handleBestCPUCollapse = () => {
    setSelectedCPU(null);
    setSelectedCPUData(null);
  };

  const handleCPUDropdownChange = event => {
    const selectedCPU = event.target.value;
    setSelectedCPU(selectedCPU);

    // Fetch data for the selected CPU
    axios.get('http://localhost:3001/cpus')
      .then(response => {
        const cpuData = response.data.find(cpu => cpu.CPU === selectedCPU);
        setSelectedCPUData(cpuData);
      })
      .catch(error => {
        console.error('Error fetching CPU data:', error);
        setSelectedCPUData(null);
      });
  };

  const handleBestGPUCollapse = () => {
    setSelectedGPU(null);
    setSelectedGPUData(null);
  };

  const handleGPUDropdownChange = event => {
    const selectedGPU = event.target.value;
    setSelectedGPU(selectedGPU);

    // Fetch data for the selected GPU
    axios.get('http://localhost:3001/gpus')
      .then(response => {
        const gpuData = response.data.find(gpu => gpu.GPU === selectedGPU);
        setSelectedGPUData(gpuData);
      })
      .catch(error => {
        console.error('Error fetching GPU data:', error);
        setSelectedGPUData(null);
      });
  };

  return (
    <div>
      <h1>The Reasonable CPU</h1>
      <table>
        <thead>
          <tr>
            <th>CPU</th>
            <th>RP</th>
            <th>Price</th>
            <th>PPD</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={handleBestCPUCollapse} style={{ cursor: 'pointer' }}>
            <td>{bestCPU.CPU}</td>
            <td>{bestCPU.RP}</td>
            <td>{bestCPU.Price}</td>
            <td>{bestCPU.PPD}</td>
          </tr>
        </tbody>
      </table>

      {selectedCPU && selectedCPUData && (
        <div>
          <h1>{selectedCPU}</h1>
          <table>
            <thead>
              <tr>
                <th>CPU</th>
                <th>RP</th>
                <th>Price</th>
                <th>PPD</th>
                <th>Price Increase (%)</th>
                <th>Performance Increase (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedCPUData.CPU}</td>
                <td>{selectedCPUData.RP.toFixed(2)}</td>
                <td>{selectedCPUData.Price.toFixed(2)}</td>
                <td>{selectedCPUData.PPD.toFixed(2)}</td>
                <td>{selectedCPUData.Price_increase.toFixed(2)}</td>
                <td>{selectedCPUData.Performance_increase.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <p>
            You would be paying ${(selectedCPUData.Price - bestCPU.Price).toFixed(2)} more for this CPU to get a {selectedCPUData.Performance_increase.toFixed(2)}% increase in performance.
            For this CPU to be the reasonable choice, it would need to cost ${((selectedCPUData.RP / bestCPU.RP) * bestCPU.Price).toFixed(2)} or less.
          </p>
        </div>
      )}

      <div>
        <h1>All CPUs</h1>
        <select value={selectedCPU} onChange={handleCPUDropdownChange}>
          <option value="">-- Select CPU --</option>
          {allCPUs.map(cpu => (
            <option key={cpu.CPU} value={cpu.CPU}>{cpu.CPU}</option>
          ))}
        </select>
      </div>

      <h1>The Reasonable GPU</h1>
      <table>
        <thead>
          <tr>
            <th>GPU</th>
            <th>RP</th>
            <th>Price</th>
            <th>PPD</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={handleBestGPUCollapse} style={{ cursor: 'pointer' }}>
            <td>{bestGPU.GPU}</td>
            <td>{bestGPU.RP}</td>
            <td>{bestGPU.Price}</td>
            <td>{bestGPU.PPD}</td>
          </tr>
        </tbody>
      </table>

      {selectedGPU && selectedGPUData && (
        <div>
          <h1>{selectedGPU}</h1>
          <table>
            <thead>
              <tr>
                <th>GPU</th>
                <th>RP</th>
                <th>Price</th>
                <th>PPD</th>
                <th>Price Increase (%)</th>
                <th>Performance Increase (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedGPUData.GPU}</td>
                <td>{selectedGPUData.RP.toFixed(2)}</td>
                <td>{selectedGPUData.Price.toFixed(2)}</td>
                <td>{selectedGPUData.PPD.toFixed(2)}</td>
                <td>{selectedGPUData.Price_increase.toFixed(2)}</td>
                <td>{selectedGPUData.Performance_increase.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <p>
            You would be paying ${(selectedGPUData.Price - bestGPU.Price).toFixed(2)} more for this GPU to get a {selectedGPUData.Performance_increase.toFixed(2)}% increase in performance.
            For this GPU to be the reasonable choice, it would need to cost ${((selectedGPUData.RP / bestGPU.RP) * bestGPU.Price).toFixed(2)} or less.
          </p>
        </div>
      )}

      <div>
        <h1>All GPUs</h1>
        <select value={selectedGPU} onChange={handleGPUDropdownChange}>
          <option value="">-- Select GPU --</option>
          {allGPUs.map(gpu => (
            <option key={gpu.GPU} value={gpu.GPU}>{gpu.GPU}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default App;

