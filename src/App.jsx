import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator as CalcIcon, 
  ChevronRight, 
  BookOpen, 
  CircleCheck, 
  TriangleAlert,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import Calculator from './components/Calculator';

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
      desc: "Usando los valores del vector inicial (arrancador), se reemplazan las variables en las expresiones y se calcula numéricamente cada residuo."
    },
    {
      num: 4,
      title: "Actualizar la variable",
      desc: "Se toma el residuo mayor en valor absoluto. El nuevo valor de la variable asociada se obtiene sumándole dicho residuo con su signo: xᵢ⁽ᵏ⁺¹⁾ = xᵢ⁽ᵏ⁾ + Rᵢ⁽ᵏ⁾. Las demás variables no cambian."
    },
    {
      num: 5,
      title: "Repetir el proceso",
      desc: "Con el nuevo vector, se recalculan los residuos. Se repite hasta cumplir el criterio de paro (error relativo o absoluto < ε). En la iteración siguiente, el residuo recién modificado será exactamente cero."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navbar Glassmorphism */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <CalcIcon className="w-6 h-6" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
              Grupo 5
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#teoria" className="hover:text-blue-600 transition-colors">Teoría Completa</a>
            <a href="#algoritmo" className="hover:text-blue-600 transition-colors">Algoritmo</a>
            <a href="#calculadora" className="hover:text-blue-600 transition-colors">Calculadora</a>
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
            Una solución elegante e iterativa para resolver sistemas de ecuaciones lineales, atacando siempre el mayor error del sistema en cada paso. Incluye calculadora paso a paso.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#teoria" className="px-8 py-3.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 flex items-center gap-2">
              Ver Teoría Completa <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </section>

      <main className="max-w-5xl mx-auto px-6 pb-24 space-y-32">
        
        {/* Teoría Completa */}
        <section id="teoria" className="scroll-mt-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Desarrollo Teórico Completo</h2>
            </div>
            
            <div className="space-y-8">
              <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/40">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">1. Resolución de Sistemas de Ecuaciones Lineales</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Los problemas de sistemas de ecuaciones lineales se presentan de la forma general: 
                </p>
                <div className="bg-slate-50 p-4 rounded-lg font-mono text-center text-lg font-semibold text-slate-800 mb-4">
                  A · x = b
                </div>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Donde <strong>A</strong> es una matriz cuadrada (n×n) correspondiente a los coeficientes del problema, <strong>x</strong> es el vector de las incógnitas y <strong>b</strong> es el vector solución de los términos independientes.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Los métodos de solución se dividen en dos grandes grupos:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                  <li><strong>Métodos exactos o directos:</strong> Permiten obtener la solución del sistema en un número finito de operaciones (ej: regla de Cramer, método de Gauss, Gauss-Jordan, y factorizaciones L·V o L·U / Crout).</li>
                  <li><strong>Métodos aproximados o iterativos:</strong> Calculan progresivamente aproximaciones a la solución. Se repite un proceso de mejora hasta que el resultado satisface ciertos requisitos (ej: Jacobi, Gauss-Seidel, Relajación).</li>
                </ul>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/40">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">2. Fundamentos de los Métodos Iterativos</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Para poder comenzar a aplicar un método iterativo, se precisa de un vector de valores iniciales (o vector arrancador) $x^{(0)}$. A través de una función o relación matemática, se genera la sucesión de vectores $x^{(k)}$ que eventualmente converge a la solución exacta.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  La idea matricial común es descomponer la matriz <strong>A</strong> de la forma $A = R - S$, donde $R$ es una matriz fácilmente invertible (ej. diagonal o triangular). Reemplazando en el sistema original:
                </p>
                <div className="bg-slate-50 p-4 rounded-lg font-mono text-center text-sm text-slate-800 mb-4 leading-loose">
                  (R - S) · x = b <br/>
                  R·x - S·x = b <br/>
                  R·x = S·x + b <br/>
                  x = [I - R⁻¹·A]·x + R⁻¹·b
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Llamando M = I - R⁻¹·A y c = R⁻¹·b, obtenemos el <strong>esquema iterativo general</strong>: x⁽ᵏ⁺¹⁾ = M · x⁽ᵏ⁾ + c.  
                  <br/><br/>
                  <strong>Teorema de Convergencia:</strong> Este esquema es convergente si y sólo si el <strong>radio espectral</strong> de la matriz M (su mayor autovalor en valor absoluto) es menor que la unidad.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-xl shadow-blue-600/20">
                <h3 className="text-2xl font-bold mb-4">3. El Método de Relajación en Detalle</h3>
                <p className="text-blue-100 leading-relaxed mb-4">
                  A diferencia de Jacobi o Gauss-Seidel, donde se recalculan todas las variables en cada paso, en Relajación <strong>se modifica solo una variable por iteración</strong>. 
                </p>
                <p className="text-blue-100 leading-relaxed mb-4">
                  El método consiste en llevar el sistema a la forma A · x - b = 0. Luego, se divide cada ecuación i por el valor -aᵢᵢ. Este paso garantiza la convergencia ya que fuerza a que la diagonal principal de la matriz equivalente tenga todos sus coeficientes iguales a -1.
                </p>
                <p className="text-blue-100 leading-relaxed mb-4">
                  Se denomina <strong>Residuo (Rᵢ)</strong> al valor que toma cada una de estas ecuaciones igualadas a cero cuando se evalúa con una aproximación x⁽ᵏ⁾. 
                </p>
                <div className="bg-white/10 p-4 rounded-lg font-mono text-center text-sm mb-4">
                  Rᵢ = -xᵢ + ∑ (bᵢⱼ · xⱼ) + cᵢ = 0
                </div>
                <p className="text-blue-100 leading-relaxed">
                  <strong>El gran secreto del método:</strong> En cada iteración, se analiza el vector de Residuos. Se busca el residuo mayor en valor absoluto, por ejemplo Rₖ. Esto nos indica que la variable xₖ es la que tiene mayor error. Luego, se "relaja" (corrige) la variable actual sumándole exactamente el valor de su residuo: xₖ⁽ⁿᵘᵉᵛᵃ⁾ = xₖ⁽ᵛⁱᵉʲᵃ⁾ + Rₖ. ¡Al evaluar el sistema con el nuevo valor, el residuo Rₖ pasará a ser matemáticamente cero!
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

        {/* Calculadora (Ejercicio Dinámico) */}
        <section id="calculadora" className="scroll-mt-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                <CalcIcon className="w-5 h-5" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Calculadora del Método</h2>
            </div>
            <p className="text-slate-600 mb-4">
              A continuación presentamos una herramienta interactiva. Por defecto está cargado el ejercicio de la cátedra para que puedas verificar los pasos, pero puedes modificar cualquier valor para resolver nuevos sistemas (hasta 10 variables) y practicar para el parcial.
            </p>
            <Calculator />
          </motion.div>
        </section>

        {/* Conclusiones */}
        <section id="conclusiones" className="scroll-mt-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Conclusiones</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-green-50 border border-green-100">
                <div className="flex items-center gap-3 mb-6">
                  <CircleCheck className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-green-900">Ventajas</h3>
                </div>
                <ul className="space-y-4 text-green-800">
                  <li className="flex gap-3"><span className="font-bold">✓</span> Es muy intuitivo porque siempre ataca el mayor "error" del sistema, lo que facilita el cómputo manual.</li>
                  <li className="flex gap-3"><span className="font-bold">✓</span> Puede converger significativamente más rápido que Jacobi o Gauss-Seidel al tomar decisiones informadas sobre qué corregir primero.</li>
                  <li className="flex gap-3"><span className="font-bold">✓</span> Permite suspender el proceso en cualquier iteración cuando se considera que el error de los residuos es aceptable.</li>
                </ul>
              </div>
              
              <div className="p-8 rounded-3xl bg-orange-50 border border-orange-100">
                <div className="flex items-center gap-3 mb-6">
                  <TriangleAlert className="w-6 h-6 text-orange-600" />
                  <h3 className="text-xl font-bold text-orange-900">Limitaciones</h3>
                </div>
                <ul className="space-y-4 text-orange-800">
                  <li className="flex gap-3"><span className="font-bold">!</span> Requiere que la diagonal principal no tenga ceros y pueda llevarse a -1, operando mejor en sistemas diagonalmente dominantes.</li>
                  <li className="flex gap-3"><span className="font-bold">!</span> En sistemas inmensos resueltos por computadora, la búsqueda secuencial del mayor residuo en cada iteración puede consumir mucha CPU sin estructuras de datos óptimas.</li>
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
