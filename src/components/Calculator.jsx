import React, { useState } from 'react';

const Calculator = () => {
  const [n, setN] = useState(3);
  const [matrixA, setMatrixA] = useState([[10, 3, 1], [2, 15, 4], [1, 2, 20]]);
  const [vectorB, setVectorB] = useState([7, -16, 57]);
  const [vectorX, setVectorX] = useState([0.8, -1.7, 2.5]);
  const [iterations, setIterations] = useState(10);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleNChange = (e) => {
    const newN = parseInt(e.target.value);
    if (newN >= 2 && newN <= 10) {
      setN(newN);
      setMatrixA(Array(newN).fill(0).map(() => Array(newN).fill(0)));
      setVectorB(Array(newN).fill(0));
      setVectorX(Array(newN).fill(0));
      setResults(null);
      setError('');
    }
  };

  const handleMatrixChange = (i, j, value) => {
    const newMatrix = [...matrixA];
    newMatrix[i][j] = parseFloat(value) || 0;
    setMatrixA(newMatrix);
  };

  const handleVectorBChange = (i, value) => {
    const newB = [...vectorB];
    newB[i] = parseFloat(value) || 0;
    setVectorB(newB);
  };

  const handleVectorXChange = (i, value) => {
    const newX = [...vectorX];
    newX[i] = parseFloat(value) || 0;
    setVectorX(newX);
  };

  const calculateRelaxation = () => {
    setError('');
    // Verificar ceros en la diagonal
    for (let i = 0; i < n; i++) {
      if (matrixA[i][i] === 0) {
        setError(`El elemento en la diagonal A[${i+1}][${i+1}] es 0. El método de relajación requiere que la diagonal no sea nula para poder dividir.`);
        return;
      }
    }

    const steps = [];
    let currentX = [...vectorX];
    
    // Preparar ecuaciones de residuo
    // R_i = -x_i + sum_{j != i} (A_ij / -A_ii) * x_j + (b_i / A_ii)
    const C = [];
    const A_prime = Array(n).fill(0).map(() => Array(n).fill(0));
    
    for (let i = 0; i < n; i++) {
      C[i] = vectorB[i] / matrixA[i][i];
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          A_prime[i][j] = matrixA[i][j] / -matrixA[i][i];
        } else {
          A_prime[i][j] = -1;
        }
      }
    }

    const calculateResidues = (x) => {
      const R = Array(n).fill(0);
      for (let i = 0; i < n; i++) {
        let sum = C[i];
        for (let j = 0; j < n; j++) {
          sum += A_prime[i][j] * x[j];
        }
        R[i] = sum;
      }
      return R;
    };

    let k = 0;
    while (k < iterations) {
      const currentR = calculateResidues(currentX);
      
      // Find max residue in absolute value
      let maxRIndex = 0;
      let maxRAbs = Math.abs(currentR[0]);
      for (let i = 1; i < n; i++) {
        if (Math.abs(currentR[i]) > maxRAbs) {
          maxRAbs = Math.abs(currentR[i]);
          maxRIndex = i;
        }
      }

      // Si el error es suficientemente chico, podemos parar, pero el tp hace iteraciones fijas
      // Igual registramos el paso
      steps.push({
        k,
        x: [...currentX],
        r: [...currentR],
        maxIndex: maxRIndex,
        action: `R${maxRIndex + 1} es mayor. x${maxRIndex + 1} = ${currentX[maxRIndex].toFixed(5)} + (${currentR[maxRIndex].toFixed(5)}) = ${(currentX[maxRIndex] + currentR[maxRIndex]).toFixed(5)}`
      });

      if (maxRAbs < 1e-6) break;

      // Update the variable
      currentX[maxRIndex] += currentR[maxRIndex];
      k++;
    }
    
    // Add final state
    steps.push({
      k,
      x: [...currentX],
      r: calculateResidues(currentX),
      maxIndex: -1,
      action: 'Finalizado'
    });

    setResults(steps);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 mt-8">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Calculadora del Método de Relajación</h3>
      
      <div className="mb-6 flex items-center gap-4">
        <label className="font-medium text-slate-700">Dimensión del sistema (n):</label>
        <input 
          type="number" 
          value={n} 
          onChange={handleNChange} 
          min="2" max="10"
          className="border border-slate-300 rounded-lg px-3 py-2 w-20 text-center focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <label className="font-medium text-slate-700 ml-4">Máx. Iteraciones:</label>
        <input 
          type="number" 
          value={iterations} 
          onChange={(e) => setIterations(parseInt(e.target.value))} 
          min="1" max="50"
          className="border border-slate-300 rounded-lg px-3 py-2 w-20 text-center focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">{error}</div>}

      <div className="overflow-x-auto mb-8">
        <div className="flex gap-8 min-w-max">
          <div>
            <h4 className="font-semibold text-slate-700 mb-3">Matriz A</h4>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`}}>
              {matrixA.map((row, i) => 
                row.map((val, j) => (
                  <input
                    key={`a-${i}-${j}`}
                    type="number"
                    value={val}
                    onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                    className="border border-slate-200 rounded p-2 w-20 text-center"
                  />
                ))
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-700 mb-3">Vector b</h4>
            <div className="flex flex-col gap-2">
              {vectorB.map((val, i) => (
                <input
                  key={`b-${i}`}
                  type="number"
                  value={val}
                  onChange={(e) => handleVectorBChange(i, e.target.value)}
                  className="border border-slate-200 rounded p-2 w-20 text-center"
                />
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-700 mb-3">Vector x⁽⁰⁾ (Inicial)</h4>
            <div className="flex flex-col gap-2">
              {vectorX.map((val, i) => (
                <input
                  key={`x-${i}`}
                  type="number"
                  value={val}
                  onChange={(e) => handleVectorXChange(i, e.target.value)}
                  className="border border-slate-200 rounded p-2 w-20 text-center"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={calculateRelaxation}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
      >
        Resolver Paso a Paso
      </button>

      {results && (
        <div className="mt-10">
          <h4 className="text-xl font-bold text-slate-900 mb-4">Resultados de las iteraciones</h4>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-4">k</th>
                  {Array(n).fill(0).map((_, i) => (
                    <React.Fragment key={`th-${i}`}>
                      <th className="p-4 bg-blue-50/30">x{i+1}</th>
                      <th className="p-4 bg-pink-50/30">R{i+1}</th>
                    </React.Fragment>
                  ))}
                  <th className="p-4">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {results.map((step, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-medium">{step.k}</td>
                    {Array(n).fill(0).map((_, i) => (
                      <React.Fragment key={`td-${idx}-${i}`}>
                        <td className="p-4">{Number.isInteger(step.x[i]) ? step.x[i] : step.x[i].toFixed(5)}</td>
                        <td className={`p-4 ${step.maxIndex === i ? 'font-bold text-pink-600 bg-pink-50 rounded-lg' : ''}`}>
                          {Number.isInteger(step.r[i]) ? step.r[i] : step.r[i].toFixed(5)}
                        </td>
                      </React.Fragment>
                    ))}
                    <td className="p-4 text-xs">{step.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;
