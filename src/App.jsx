import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  ChevronRight, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

function App() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const steps = [
    {
      num: 1,
      title: "Garantizar la convergencia",
      desc: "Se divide cada ecuación del sistema original por el valor negativo de su coeficiente de la diagonal principal (-aᵢᵢ). Así, la diagonal principal pasará a valer -1."
    },
    {
      num: 2,
      title: "Definir los Residuos (Rᵢ)",
      desc: "Se igualan todas las ecuaciones a cero. La expresión resultante es el Residuo Rᵢ asociado a la variable xᵢ. Toman la forma: Rᵢ = -xᵢ + ... = 0"
    },
    {
      num: 3,
      title: "Calcular los Residuos iniciales",
      desc: "Usando los valores del vector inicial, se reemplazan las variables en las expresiones y se calcula numéricamente cada residuo."
    },
    {
      num: 4,
      title: "Actualizar la variable",
      desc: "Se toma el residuo mayor en valor absoluto. El nuevo valor de la variable asociada se obtiene sumándole dicho residuo con su signo: xᵢ⁽ᵏ⁺¹⁾ = xᵢ⁽ᵏ⁾ + Rᵢ⁽ᵏ⁾. Las demás variables no cambian."
    },
    {
      num: 5,
      title: "Repetir el proceso",
      desc: "Con el nuevo vector, se recalculan los residuos. Se repite hasta cumplir el criterio de paro. (Nota: el residuo de la variable recién modificada dará 0 en el paso siguiente)."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navbar Glassmorphism */}
      <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <Calculator className="w-6 h-6" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
              Grupo 5
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#teoria" className="hover:text-blue-600 transition-colors">Teoría</a>
            <a href="#algoritmo" className="hover:text-blue-600 transition-colors">Algoritmo</a>
            <a href="#ejercicio" className="hover:text-blue-600 transition-colors">Ejercicio</a>
            <a href="#conclusiones" className="hover:text-blue-600 transition-colors">Conclusiones</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-violet-50 -z-10" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-gradient-to-bl from-blue-400/20 to-violet-400/20 rounded-full blur-3xl -z-10" />
        
        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6">
            <BookOpen className="w-4 h-4" /> Análisis Numérico
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
            Método de <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
              Relajación
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Una solución elegante e iterativa para resolver sistemas de ecuaciones lineales, atacando siempre el mayor error del sistema.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#algoritmo" className="px-8 py-3.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 flex items-center gap-2">
              Ver el Paso a Paso <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </section>

      <main className="max-w-4xl mx-auto px-6 pb-24 space-y-32">
        
        {/* Teoría */}
        <section id="teoria" className="scroll-mt-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Conceptos Fundamentales</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/40">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">¿Qué es?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Es un <strong>método iterativo</strong>. A diferencia de métodos exactos, parte de un vector inicial y realiza aproximaciones sucesivas. Su distinción clave es que <strong>en cada iteración se modifica una sola variable</strong>: la que tiene el mayor "error" (Residuo).
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-xl shadow-blue-600/20">
                <h3 className="text-xl font-semibold mb-4 text-white">Condición de Convergencia</h3>
                <p className="text-blue-100 leading-relaxed">
                  Para que el método funcione correctamente, es vital llevar los coeficientes de la diagonal principal a un valor de <strong>-1</strong>. Esto se logra dividiendo cada ecuación entera por <code>-aᵢᵢ</code>.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Algoritmo */}
        <section id="algoritmo" className="scroll-mt-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                <ChevronRight className="w-5 h-5" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Algoritmo Paso a Paso</h2>
            </div>

            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div key={idx} className="group flex gap-6 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Ejercicio */}
        <section id="ejercicio" className="scroll-mt-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Ejercicio Resuelto</h2>
            
            <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/40">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Sistema Original</h3>
                  <div className="font-mono text-sm bg-slate-50 p-6 rounded-xl border border-slate-100 text-slate-700 leading-loose">
                    10x₁ + 3x₂ + x₃ = 7 <br/>
                    2x₁ + 15x₂ + 4x₃ = -16 <br/>
                    x₁ + 2x₂ + 20x₃ = 57
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Ecuaciones de Residuo</h3>
                  <div className="font-mono text-sm bg-slate-50 p-6 rounded-xl border border-slate-100 text-slate-700 leading-loose">
                    R₁ = -x₁ - 0.3x₂ - 0.1x₃ + 0.7 = 0 <br/>
                    R₂ = -0.133x₁ - x₂ - 0.266x₃ - 1.066 = 0 <br/>
                    R₃ = -0.05x₁ - 0.1x₂ - x₃ + 2.85 = 0
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-4">Iter</th>
                      <th className="p-4">x₁</th>
                      <th className="p-4">R₁</th>
                      <th className="p-4">x₂</th>
                      <th className="p-4">R₂</th>
                      <th className="p-4">x₃</th>
                      <th className="p-4">R₃</th>
                      <th className="p-4">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-medium">0</td>
                      <td className="p-4">0.8</td>
                      <td className="p-4">0.16</td>
                      <td className="p-4">-1.7</td>
                      <td className="p-4">-0.1374</td>
                      <td className="p-4">2.5</td>
                      <td className="p-4 font-bold text-pink-500 bg-pink-50/50 rounded-lg">0.48</td>
                      <td className="p-4 text-xs">R₃ es mayor. x₃ = 2.5 + 0.48 = <span className="font-bold">2.98</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-medium">1</td>
                      <td className="p-4">0.8</td>
                      <td className="p-4">0.112</td>
                      <td className="p-4">-1.7</td>
                      <td className="p-4 font-bold text-pink-500 bg-pink-50/50 rounded-lg">-0.26508</td>
                      <td className="p-4">2.98</td>
                      <td className="p-4">0</td>
                      <td className="p-4 text-xs">R₂ es mayor. x₂ = -1.7 - 0.265 = <span className="font-bold">-1.96508</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-medium">2</td>
                      <td className="p-4">0.8</td>
                      <td className="p-4 font-bold text-pink-500 bg-pink-50/50 rounded-lg">0.1915</td>
                      <td className="p-4">-1.96508</td>
                      <td className="p-4">0</td>
                      <td className="p-4">2.98</td>
                      <td className="p-4">0.0265</td>
                      <td className="p-4 text-xs">R₁ es mayor. x₁ = 0.8 + 0.1915 = <span className="font-bold">0.9915</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-medium">3</td>
                      <td className="p-4">0.9915</td>
                      <td className="p-4">0</td>
                      <td className="p-4">-1.96508</td>
                      <td className="p-4 font-bold text-pink-500 bg-pink-50/50 rounded-lg">-0.02546</td>
                      <td className="p-4">2.98</td>
                      <td className="p-4">0.01693</td>
                      <td className="p-4 text-xs">R₂ es mayor. x₂ = -1.96508 - 0.025 = <span className="font-bold">-1.99054</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <p>La solución exacta es x₁=1, x₂=-2, x₃=3. ¡La convergencia es excelente tras solo 4 pasos!</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Conclusiones */}
        <section id="conclusiones" className="scroll-mt-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Conclusiones</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-green-50 border border-green-100">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-green-900">Ventajas</h3>
                </div>
                <ul className="space-y-4 text-green-800">
                  <li className="flex gap-3"><span className="font-bold">✓</span> Es muy intuitivo porque siempre ataca el mayor "error" del sistema.</li>
                  <li className="flex gap-3"><span className="font-bold">✓</span> Puede converger más rápido que Jacobi o Gauss-Seidel al tomar decisiones informadas.</li>
                  <li className="flex gap-3"><span className="font-bold">✓</span> Solo se actualiza una variable por iteración, facilitando el cálculo a mano.</li>
                </ul>
              </div>
              
              <div className="p-8 rounded-3xl bg-orange-50 border border-orange-100">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                  <h3 className="text-xl font-bold text-orange-900">Limitaciones</h3>
                </div>
                <ul className="space-y-4 text-orange-800">
                  <li className="flex gap-3"><span className="font-bold">!</span> Requiere que la diagonal principal pueda llevarse a -1, idealmente en sistemas diagonalmente dominantes.</li>
                  <li className="flex gap-3"><span className="font-bold">!</span> En sistemas inmensos, buscar el mayor residuo en cada iteración por computadora puede ser costoso computacionalmente si no se aplican técnicas de optimización.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
        <p className="mb-2 font-medium text-slate-300">Trabajo Práctico N° 2 - Grupo 5 | Análisis Numérico</p>
        <p className="text-sm">Universidad Tecnológica Nacional - Facultad Regional La Plata</p>
        <p className="text-xs mt-6 opacity-60">Referencias: Apuntes de cátedra (Ing. Amiconi Diego Federico)</p>
      </footer>
    </div>
  );
}

export default App;
