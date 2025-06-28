import React, { useState, useEffect, useRef } from 'react';

// Main App component
const App = () => {
    // State to manage the current view being displayed
    const [currentView, setCurrentView] = useState('welcome'); // Start with the welcome screen
    const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login status

    // Function to render the content based on the current view
    const renderViewContent = () => {
        switch (currentView) {
            case 'welcome':
                return <WelcomeScreen setCurrentView={setCurrentView} />;
            case 'login':
                return <LoginScreen setCurrentView={setCurrentView} setIsLoggedIn={setIsLoggedIn} />; // Pass setIsLoggedIn
            case 'dashboard':
                return <DashboardPage setCurrentView={setCurrentView} />; // New Dashboard page
            case 'design':
                return <DesignContentPage />;
            case 'math':
                return <MatematicasContentPage />; // Corrected component name for consistency
            case 'proyecto-personal': // Updated view name
                return <ProyectoPersonalContentPage />; // Updated component name
            case 'chat':
                return <ChatScreen />;
            case 'agenda':
                return <AgendaScreen setCurrentView={setCurrentView} />; // Pass setCurrentView to AgendaScreen
            case 'quiz': // New case for the Quiz selection screen
                return <QuizScreen setCurrentView={setCurrentView} />;
            case 'mathQuiz': // New case for Math Quiz
                return <MathQuizScreen setCurrentView={setCurrentView} />;
            case 'designQuiz': // New case for Design Quiz
                return <DesignQuizScreen setCurrentView={setCurrentView} />;
            case 'proyectoQuiz': // New case for Proyecto Personal Quiz
                return <ProyectoPersonalQuizScreen setCurrentView={setCurrentView} />;
            default:
                return isLoggedIn ? <DashboardPage setCurrentView={setCurrentView} /> : <WelcomeScreen setCurrentView={setCurrentView} />; // Fallback based on login
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans text-gray-800 flex flex-col">
            {/* Header section - hidden on welcome/login for a cleaner look as per images */}
            {currentView !== 'welcome' && currentView !== 'login' && (
                <header className="bg-white rounded-b-xl shadow-lg p-4 sm:p-6 mb-4 flex items-center justify-center">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 tracking-tight text-center">
                        Matemáticas para Diseñadores
                    </h1>
                </header>
            )}

            {/* Main content area */}
            {/* Increased pb-48 to give ample space for bottom nav bar on all screens */}
            <main className="flex-grow p-4 sm:p-6 pb-48 overflow-auto">
                {renderViewContent()}
            </main>

            {/* Bottom Navigation Bar - only show if logged in or on welcome/login for specific flows */}
            {isLoggedIn && <BottomNavBar setCurrentView={setCurrentView} currentView={currentView} />}
            {!isLoggedIn && (currentView === 'welcome' || currentView === 'login') && <div className="h-16"></div>} {/* Spacer if no nav bar */}

            {/* Footer section (optional, can be removed for pure mobile look) */}
            <footer className="mt-auto text-center text-gray-600 text-xs py-2">
                <p>&copy; {new Date().getFullYear()} Sistema Educativo Integrado.</p>
            </footer>
        </div>
    );
};

// Bottom Navigation Bar component
const BottomNavBar = ({ setCurrentView, currentView }) => {
    const navItems = [
        { name: 'Inicio', view: 'dashboard', icon: '🏠' }, // Inicio now goes to dashboard
        { name: 'Diseño', view: 'design', icon: '🎨' },
        { name: 'Matemáticas', view: 'math', icon: '➗' },
        { name: 'Proyecto', view: 'proyecto-personal', icon: '💡' }, // Updated view name
        { name: 'Chat', view: 'chat', icon: '💬' },
        { name: 'Agenda', view: 'agenda', icon: '🗓️' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-xl rounded-t-2xl p-3 border-t border-gray-100 z-50">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setCurrentView(item.view)}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                            currentView === item.view ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-indigo-500 hover:bg-gray-50'
                        }`}
                    >
                        <span className="text-xl mb-1">{item.icon}</span>
                        <span className="text-xs font-medium">{item.name}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
};

// WelcomeScreen component - Now with both character and original logo, character size adjusted
const WelcomeScreen = ({ setCurrentView }) => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] p-4 text-center">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-sm w-full mx-auto animate-fade-in">
            {/* Main character image - placed above the logo, now smaller */}
            <img
                src="https://i.imgur.com/KYvdRoV.png" // Character image URL
                alt="Personaje principal de la aplicación"
                className="w-40 h-40 mx-auto mb-4 object-contain" // Adjusted size to w-40 h-40
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/160x160/ffffff/000000?text=Error+Loading+Character"; }}
            />
            {/* Original app logo - now slightly larger */}
            <img
                src="https://i.postimg.cc/HxcFvjfV/IMG-1324.jpg" // Original app logo URL
                alt="Logo del Sistema Educativo"
                className="w-56 h-56 mx-auto mb-6 object-contain rounded-full shadow-md border-4 border-indigo-200" // Adjusted size to w-56 h-56
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/224x224/ff69b4/ffff00?text=Error+Loading+Logo"; }}
            />

            <h2 className="text-3xl font-bold text-gray-900 mb-4">¡Hola aquí!</h2>
            <p className="text-md text-gray-600 mb-6 leading-relaxed">
                Desarrolla tu mente con Diseño, Matemáticas y tu Proyecto Personal.
            </p>
            <button
                onClick={() => setCurrentView('login')}
                className="w-full py-3 px-6 rounded-full bg-indigo-500 text-white font-semibold text-lg hover:bg-indigo-600 transition-all duration-300 shadow-md transform hover:scale-105"
            >
                Ingresar
            </button>
            <p className="mt-4 text-sm text-gray-500">
                ¿No tienes cuenta? <span onClick={() => setCurrentView('login')} className="text-indigo-600 font-medium cursor-pointer hover:underline">Regístrate</span>
            </p>
        </div>
    </div>
);

// LoginScreen component - Mimics "Ingresa aqui"
const LoginScreen = ({ setCurrentView, setIsLoggedIn }) => {
    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoggedIn(true); // Set logged in status to true
        setCurrentView('dashboard'); // Navigate to the new Dashboard page
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] p-4 text-center">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-sm w-full mx-auto animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Bienvenido</h2>
                <p className="text-lg text-gray-700 mb-8">Ingresa aquí</p>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50"
                    />
                    <input
                        type="email"
                        placeholder="Correo"
                        className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 px-6 rounded-full bg-green-500 text-white font-semibold text-lg hover:bg-green-600 transition-all duration-300 shadow-md transform hover:scale-105 mt-6"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <p className="mt-6 text-sm text-gray-500">
                    ¿Olvidaste tu contraseña? <span className="text-indigo-600 font-medium cursor-pointer hover:underline">Recuperar</span>
                </p>
            </div>
        </div>
    );
};

// NotificationModal component
const NotificationModal = ({ show, onClose, message }) => {
    // Apply conditional classes for fade-in/out and scale-in/out transitions
    const modalOverlayClasses = `fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;
    const modalContentClasses = `bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full transform transition-all duration-300 ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`;

    return (
        <div className={modalOverlayClasses}>
            <div className={modalContentClasses}>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Comunicado Importante</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{message}</p>
                <button
                    onClick={onClose}
                    className="mt-6 w-full py-3 px-6 rounded-full bg-indigo-500 text-white font-semibold text-lg hover:bg-indigo-600 transition-all duration-300 shadow-md transform hover:scale-105"
                >
                    Entendido
                </button>
            </div>
        </div>
    );
};


// DashboardPage component - Now with YouTube video embedding, notification modal, and Academic Streak
const DashboardPage = ({ setCurrentView }) => {
    const youtubeVideoId_lesson3 = "BxrJmKdPHRs"; // Original YouTube video ID for lesson 3
    const youtubeVideoId_week5 = "rHVYZAE0RKQ"; // New YouTube video ID for week 5
    const youtubeEmbedUrl_lesson3 = `https://www.youtube.com/embed/${youtubeVideoId_lesson3}`;
    const youtubeEmbedUrl_week5 = `https://www.youtube.com/embed/${youtubeVideoId_week5}`;

    const [showNotificationModal, setShowNotificationModal] = useState(false);

    // State for Academic Streak
    const [academicStreak, setAcademicStreak] = useState(0);
    const [tasksCompletedForStreakToday, setTasksCompletedForStreakToday] = useState(false);
    const [lastLoginDate, setLastLoginDate] = useState(null); // Stores the last recorded login date (normalized to start of day)

    // Simulating data persistence with localStorage for streak
    // In a real app, you would use a database like Firebase Firestore for multi-device sync
    useEffect(() => {
        const loadStreakData = () => {
            const storedStreak = localStorage.getItem('academicStreak');
            const storedLastLoginDate = localStorage.getItem('lastLoginDate');
            const storedTasksCompletedToday = localStorage.getItem('tasksCompletedForStreakToday');

            let currentStreak = storedStreak ? parseInt(storedStreak, 10) : 0;
            let lastLogin = storedLastLoginDate ? new Date(storedLastLoginDate) : null;
            let tasksCompleted = storedTasksCompletedToday === 'true'; // Convert string to boolean

            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize to start of day

            if (!lastLogin || lastLogin.toDateString() !== today.toDateString()) {
                // It's a new day or first login
                if (lastLogin) {
                    const yesterday = new Date(today);
                    yesterday.setDate(today.getDate() - 1);
                    if (lastLogin.toDateString() === yesterday.toDateString()) {
                        // User logged in yesterday, continue streak
                        currentStreak += 1;
                    } else {
                        // User missed a day, reset streak
                        currentStreak = 1;
                    }
                } else {
                    // First ever login
                    currentStreak = 1;
                }
                lastLogin = today;
                tasksCompleted = false; // Reset tasks completion for the new day
            }

            setAcademicStreak(currentStreak);
            setLastLoginDate(lastLogin);
            setTasksCompletedForStreakToday(tasksCompleted);

            // Update localStorage with potentially new streak data
            localStorage.setItem('academicStreak', currentStreak.toString());
            localStorage.setItem('lastLoginDate', lastLogin.toISOString());
            localStorage.setItem('tasksCompletedForStreakToday', tasksCompleted.toString());

        };

        loadStreakData();
    }, []); // Empty dependency array means this runs once on mount

    const handleCompleteTasksForStreak = () => {
        if (!tasksCompletedForStreakToday) {
            setAcademicStreak(prevStreak => prevStreak + 1); // Add bonus point
            setTasksCompletedForStreakToday(true);
            localStorage.setItem('academicStreak', (academicStreak + 1).toString());
            localStorage.setItem('tasksCompletedForStreakToday', 'true');
        }
    };

    const teacherMessage = `Estimados estudiantes,

Para informar que el día jueves 12 se realizará la segunda evaluación de matemática del bimestre.

Criterio B: Investigación de patrones
Temas: Ecuaciones cuadráticas.
Resolución de ecuaciones cuadráticas incompletas:  ax² +c= 0  /  ax² +bx = 0
Resolución de ecuaciones cuadráticas completas:
  ax² + bx +c = 0 (Fórmula general y metodo de aspa)

Paginas a repasar: 194 (ejercicios del 13 al 22), 195 (ejercicios del 1 al 7)

* Nota: La fórmula general estara colocada en la evaluación.`;

    // Calendar logic for "Agenda Rápida" snippet in Dashboard
    const todayForSnippet = new Date();
    const currentMonthSnippet = todayForSnippet.getMonth();
    const currentYearSnippet = todayForSnippet.getFullYear();
    const daysInMonthSnippet = new Date(currentYearSnippet, currentMonthSnippet + 1, 0).getDate();
    const firstDayOfMonthSnippet = new Date(currentYearSnippet, currentMonthSnippet, 1).getDay(); // 0 for Sunday, 1 for Monday...

    const generateCalendarDaysSnippet = () => {
        const days = [];
        // Adjusting startOffset so Monday is the first day of the week displayed
        const startOffset = (firstDayOfMonthSnippet === 0) ? 6 : firstDayOfMonthSnippet - 1;

        // Add empty cells for the start of the week
        for (let i = 0; i < startOffset; i++) {
            days.push(<div key={`empty-dash-${i}`} className="w-8 h-8 text-center flex items-center justify-center"></div>);
        }

        // Add days of the month
        for (let i = 1; i <= daysInMonthSnippet; i++) {
            const isEventDay = (i === 7 || i === 15 || i === 22); // Example static event days
            const isToday = i === todayForSnippet.getDate() && currentMonthSnippet === todayForSnippet.getMonth() && currentYearSnippet === todayForSnippet.getFullYear();
            days.push(
                <div key={`day-dash-${i}`} className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                    isEventDay ? 'bg-indigo-200 text-indigo-800 font-bold' : (isToday ? 'border-2 border-indigo-500' : 'bg-gray-100 text-gray-700')
                }`}>
                    {i}
                </div>
            );
        }
        return days;
    };


    return (
        <div className="py-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Tu Espacio de Aprendizaje</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Videos del tema de la semana 3 (original video) */}
                <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Videos del tema de la semana 3</h3>
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}>
                        <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-sm"
                            src={youtubeEmbedUrl_lesson3} // Using original video ID
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <p className="text-sm text-gray-600 text-center mt-4 mb-4">
                        Aprende sobre la Sección Áurea y su aplicación en el diseño.
                    </p>
                    <button
                        onClick={() => setCurrentView('math')}
                        className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition-all duration-300 shadow-md"
                    >
                        Ver Lección de Matemáticas
                    </button>
                </div>

                {/* Nueva notificación con logo y mensaje actualizado */}
                <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl shadow-md p-4 flex flex-col items-center justify-center text-center">
                    <img
                        src="https://i.imgur.com/7cM9GbM.png" // Updated notification image
                        alt="Imagen de Notificación" // Updated alt text
                        className="w-24 h-24 object-contain mb-3" // Adjusted size for the notification card
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/96x96/fbcfe8/be185d?text=Notificaci%C3%B3n"; }}
                    />
                    <h3 className="text-xl font-semibold text-purple-800 mb-3">¡AVISO IMPORTANTE!</h3>
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                        Tienes un comunicado de tu docente Jose Gutierrez.
                    </p>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-300 transition-all duration-300">
                            ATRAS
                        </button>
                        <button
                            onClick={() => setShowNotificationModal(true)}
                            className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-semibold hover:bg-purple-600 transition-all duration-300 shadow-md"
                        >
                            ABRIR
                        </button>
                    </div>
                </div>

                {/* Agenda Snippet - Fixed "chuecha" alignment */}
                <div className="bg-white rounded-2xl shadow-md p-4 col-span-1 md:col-span-2">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Agenda Rápida</h3>
                    <div className="text-center mb-4">
                        <p className="text-indigo-600 font-semibold text-sm mb-1">{currentYearSnippet}</p>
                        <p className="text-3xl font-bold text-gray-900">{new Date(currentYearSnippet, currentMonthSnippet).toLocaleString('es-ES', { month: 'long' }).toUpperCase()}</p>
                    </div>
                    {/* Changed day headers to start with Monday */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 mb-3">
                        <span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        {generateCalendarDaysSnippet()}
                    </div>
                    <button
                        onClick={() => setCurrentView('agenda')}
                        className="mt-4 w-full py-2 bg-indigo-500 text-white rounded-full text-sm font-semibold hover:bg-indigo-600 transition-all duration-300 shadow-md"
                    >
                        Ver Agenda Completa
                    </button>
                </div>

                {/* Sección de Matemáticas (TEMA DE LA SEMANA 5) - Now with YouTube video */}
                <div className="bg-yellow-50 rounded-2xl shadow-md p-4 flex flex-col items-center">
                    <h3 className="text-xl font-semibold text-yellow-800 mb-3">TEMA DE LA SEMANA 5</h3> {/* Updated Title */}
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}>
                         <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-sm"
                            src={youtubeEmbedUrl_week5} // Using NEW video ID
                            title="Teorema de Pitágoras y Binomios al Cuadrado"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <p className="text-sm text-gray-700 text-center mt-4 mb-4">
                        El tema de esta semana es Teorema de Pitágoras y Binomios al Cuadrado.
                    </p> {/* Updated description */}
                    <button
                        onClick={() => setCurrentView('math')}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-full text-sm font-semibold hover:bg-yellow-600 transition-all duration-300 shadow-md"
                    >
                        Aprender Más
                    </button>
                </div>

                {/* Academic Streak with character image */}
                <div className="bg-teal-50 rounded-2xl shadow-md p-4 flex flex-col items-center justify-center text-center">
                    <h3 className="text-xl font-semibold text-teal-800 mb-3">¡Tu Racha Académica! 🔥</h3>
                    <img
                        src="https://i.imgur.com/KYvdRoV.png" // Character image URL
                        alt="Personaje de la racha académica"
                        className="w-28 h-28 object-contain mb-2 drop-shadow-lg" // Adjust size for streak card
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/112x112/a7f3d0/065f46?text=Error"; }}
                    />
                    <div className="text-5xl font-bold text-teal-600 mb-2">{academicStreak}</div>
                    <p className="text-sm text-gray-700 mb-4">
                        Días de racha consecutiva
                    </p>
                    <button
                        onClick={handleCompleteTasksForStreak}
                        disabled={tasksCompletedForStreakToday}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-md
                                    ${tasksCompletedForStreakToday ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
                    >
                        {tasksCompletedForStreakToday ? 'Tareas de hoy completadas ✔️' : 'Completar Tareas del Día'}
                    </button>
                    <p className="mt-2 text-xs text-gray-500">
                        Completa tus tareas para un punto extra en tu racha.
                    </p>
                </div>

                {/* New: Quiz or Test Section - Now navigates to QuizScreen */}
                {/* Adjusted padding on the card itself for better internal spacing */}
                <div className="bg-purple-50 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center text-center col-span-1 md:col-span-2">
                    <h3 className="text-xl font-semibold text-purple-800 mb-3">Realiza un Quiz o Test Interactivo</h3>
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                        Pon a prueba tus conocimientos en Matemáticas y Proyecto Personal con divertidos quizzes.
                    </p>
                    <button
                        onClick={() => setCurrentView('quiz')}
                        className="px-6 py-3 bg-purple-600 text-white font-semibold text-lg hover:bg-purple-700 transition-all duration-300 shadow-md transform hover:scale-105"
                    >
                        Acceder a los Quizzes
                    </button>
                </div>

            </div>
            {/* Notification Modal */}
            <NotificationModal
                show={showNotificationModal}
                onClose={() => setShowNotificationModal(false)}
                message={teacherMessage}
            />
        </div>
    );
};


// DesignContentPage component - Styled to match the app aesthetic, now with specific content
const DesignContentPage = () => (
    <div className="py-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Diseño: Fundamentos Visuales y Estéticos</h2>
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <img
                src="https://i.imgur.com/jKqIGCm.png" // Correct direct image URL for Design
                alt="Diagrama de Criterios de Diseño"
                className="w-full h-auto rounded-xl mb-4 shadow-sm object-contain max-h-96" // Added max-h-96 for size control
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x200/cbe8ff/3b82f6?text=Error+Loading+Image"; }}
            />
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                En Diseño, exploramos los Criterios A, B, C y D para la creación de soluciones innovadoras. Actualmente, estamos trabajando en el desarrollo de un sistema educativo que aborde la problemática de la Desigualdad educativa por la falta de recursos tecnológicos en zonas rurales o colegios estatales.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ContentCard
                    title="Criterios del Diseño"
                    items={['Criterio A: Investigación', 'Criterio B: Desarrollo de Ideas', 'Criterio C: Creación de la Solución', 'Criterio D: Evaluación']}
                />
                <ContentCard
                    title="Elementos Clave del Proyecto"
                    items={['Definición del Problema', 'Análisis de Usuarios', 'Diseño de la Interfaz', 'Prototipado y Pruebas', 'Implementación']}
                />
            </div>
        </div>
    </div>
);

// MathContentPage component - Now with detailed math topics and updated image
const MatematicasContentPage = () => (
    <div className="py-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Matemáticas: Herramientas para la Creación</h2>
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <img
                src="https://i.imgur.com/DojPf53.png" // Updated image URL for Math section
                alt="Matemáticas Aplicadas Ilustración" // Updated alt text
                className="w-full h-auto rounded-xl mb-4 shadow-sm object-contain" // Using object-contain
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x200/d0f0c0/22c55e?text=Error+Loading+Image"; }}
            />
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                En Matemáticas, profundizamos en conceptos fundamentales que son esenciales para el diseño y la resolución de problemas. Abordamos la proporcionalidad, ecuaciones cuadráticas, geometría y álgebra.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ContentCard
                    title="Proporcionalidad y Ecuaciones"
                    items={[
                        'Magnitudes Directamente Proporcionales',
                        'Magnitudes Inversamente Proporcionales',
                        'Ecuaciones Cuadráticas: ax² + bx + c = 0',
                        'Método de la Fórmula General',
                        'Método de Factorización y Aspa',
                    ]}
                />
                <ContentCard
                    title="Geometría y Álgebra Fundamentales"
                    items={[
                        'Teorema de Pitágoras: a² + b² = c²',
                        'Binomio al Cuadrado: (a + b)² = a² + 2ab + b²',
                        'Binomio al Cuadrado: (a - b)² = a² - 2ab + b²',
                    ]}
                />
            </div>
        </div>
    </div>
);

// ProyectoPersonalContentPage component
const ProyectoPersonalContentPage = () => {
    // States for each question's answer
    const [temaProyecto, setTemaProyecto] = useState('');
    const [razonEleccion, setRazonEleccion] = useState('');
    const [problemaResolver, setProblemaResolver] = useState('');
    const [objetivoPrincipal, setObjetivoPrincipal] = useState('');
    const [productoFinal, setProductoFinal] = useState('');

    return (
        <div className="py-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Proyecto Personal: Tu Visión, Tu Creación</h2>
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <img
                    src="https://i.imgur.com/tk1J6YE.png" // Updated image for Proyecto Personal
                    alt="Ilustración de Proyecto Personal"
                    className="w-full h-auto rounded-xl mb-4 shadow-sm object-contain max-h-96" // Added max-h-96 for size control
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x200/ffe4e6/ef4444?text=Error+Loading+Image"; }}
                />
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                    El Proyecto Personal es una oportunidad única para investigar un tema de interés, desarrollar habilidades de investigación y presentar un producto o resultado significativo.
                </p>
                <ContentCard
                    title="Etapas Clave del Proyecto Personal"
                    items={[
                        'Identificación de un enfoque',
                        'Planificación',
                        'Ejecución',
                        'Reflexión',
                        'Informe',
                    ]}
                />

                {/* Nueva Sección: Preguntas de Reflexión del Proyecto Personal */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-5">Preguntas de Reflexión sobre tu Proyecto</h3>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="temaProyecto" className="block text-md font-medium text-gray-700 mb-2 text-left">
                                1. ¿Cuál es el tema que aborda tu Proyecto Personal?
                            </label>
                            <textarea
                                id="temaProyecto"
                                value={temaProyecto}
                                onChange={(e) => setTemaProyecto(e.target.value)}
                                rows="3"
                                placeholder="Escribe aquí el tema de tu proyecto..."
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 resize-y"
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="razonEleccion" className="block text-md font-medium text-gray-700 mb-2 text-left">
                                2. ¿Por qué elegiste este tema?
                            </label>
                            <textarea
                                id="razonEleccion"
                                value={razonEleccion}
                                onChange={(e) => setRazonEleccion(e.target.value)}
                                rows="3"
                                placeholder="Explica tu motivación para este tema..."
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 resize-y"
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="problemaResolver" className="block text-md font-medium text-gray-700 mb-2 text-left">
                                3. ¿Qué problema o necesidad quieres resolver o visibilizar con este proyecto?
                            </label>
                            <textarea
                                id="problemaResolver"
                                value={problemaResolver}
                                onChange={(e) => setProblemaResolver(e.target.value)}
                                rows="3"
                                placeholder="Describe el problema o necesidad que abordas..."
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 resize-y"
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="objetivoPrincipal" className="block text-md font-medium text-gray-700 mb-2 text-left">
                                4. ¿Cuál es el objetivo principal de tu proyecto?
                            </label>
                            <textarea
                                id="objetivoPrincipal"
                                value={objetivoPrincipal}
                                onChange={(e) => setObjetivoPrincipal(e.target.value)}
                                rows="3"
                                placeholder="Define tu objetivo principal..."
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 resize-y"
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="productoFinal" className="block text-md font-medium text-gray-700 mb-2 text-left">
                                5. ¿Qué producto final vas a crear y por qué?
                            </label>
                            <textarea
                                id="productoFinal"
                                value={productoFinal}
                                onChange={(e) => setProductoFinal(e.target.value)}
                                rows="3"
                                placeholder="Describe el producto final y su razón de ser..."
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 resize-y"
                            ></textarea>
                        </div>
                    </div>
                    {/* Botón de ejemplo para guardar, aunque no hay persistencia de datos aún */}
                    <button
                        onClick={() => alert('¡Respuestas guardadas localmente! (En una aplicación real, se guardarían en una base de datos).')}
                        className="mt-8 w-full py-3 px-6 rounded-full bg-purple-600 text-white font-semibold text-lg hover:bg-purple-700 transition-all duration-300 shadow-md transform hover:scale-105"
                    >
                        Guardar mis Reflexiones
                    </button>
                </div>
            </div>
        </div>
    );
};

// ChatScreen component - Now with Gemini API integration and Yumo as bot name
const ChatScreen = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: '¡Hola! Soy Yumo, tu asistente educativo. ¿En qué te puedo ayudar hoy con Diseño, Matemáticas o tu Proyecto Personal?' }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null); // Ref to scroll to the bottom of the chat

    // Scroll to the latest message whenever messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputMessage.trim() === '') return;

        const userMessage = { sender: 'user', text: inputMessage };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            // Construct chat history for the API call
            let chatHistory = messages.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            }));
            chatHistory.push({ role: "user", parts: [{ text: inputMessage }] }); // Add current user message to history

            const payload = { contents: chatHistory };
            const apiKey = ""; // Canvas will automatically provide the API key at runtime
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const botResponseText = result.candidates[0].content.parts[0].text;
                setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botResponseText }]);
            } else {
                setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: 'Lo siento, no pude generar una respuesta. Por favor, intenta de nuevo.' }]);
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: 'Hubo un error al conectar con el asistente. Intenta más tarde.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
            handleSendMessage();
        }
    };

    return (
        <div className="py-6 flex flex-col h-full min-h-[calc(100vh-14rem)]"> {/* Adjusted min-h for better layout */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">✨ Yumo, tu Asistente Educativo ✨</h2> {/* Updated title */}
            <div className="flex-grow bg-white rounded-2xl shadow-md p-4 mb-4 overflow-y-auto flex flex-col">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} sender={msg.sender} text={msg.text} />
                ))}
                {isLoading && (
                    <div className="flex justify-start mb-4">
                        <div className="max-w-[70%] p-3 rounded-xl shadow-sm bg-gray-200 text-gray-700 rounded-bl-none">
                            <p className="animate-pulse">Escribiendo...</p>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} /> {/* Dummy div for scrolling */}
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 flex items-center">
                <input
                    type="text"
                    placeholder="Escribe tu pregunta..."
                    className="flex-grow p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-3 p-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors duration-200 shadow-md"
                    disabled={isLoading}
                >
                    <span className="text-xl">🚀</span> {/* Send icon */}
                </button>
            </div>
        </div>
    );
};

// ChatMessage component for individual messages, now showing Yumo's avatar
const ChatMessage = ({ sender, text }) => (
    <div className={`flex mb-4 ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
        {sender === 'bot' && (
            <img
                src="https://i.imgur.com/KYvdRoV.png" // Yumo's character image
                alt="Avatar de Yumo"
                className="w-10 h-10 rounded-full mr-3 object-contain self-start" // Small avatar for chat
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/b7e4c7/0d753b?text=Yumo"; }}
            />
        )}
        <div className={`max-w-[80%] p-3 rounded-xl shadow-sm ${
            sender === 'user' ? 'bg-indigo-100 text-indigo-900 rounded-br-none' : 'bg-green-100 text-green-900 rounded-bl-none'
        }`}>
            <p className="whitespace-pre-wrap">{text}</p>
        </div>
    </div>
);


// AgendaScreen component - Basic UI mimicking the image, now with event adding
const AgendaScreen = ({ setCurrentView }) => {
    const today = new Date();
    // Use current month/year for display, but allow adding events for any date
    const [displayMonth, setDisplayMonth] = useState(today.getMonth()); // 0-indexed month
    const [displayYear, setDisplayYear] = useState(today.getFullYear());

    // State for managing events with fullDate string (YYYY-MM-DD)
    const [events, setEvents] = useState([
        // Initial dummy events, now with fullDate strings
        { fullDate: '2025-06-07', text: 'Revisión Proyecto Personal', color: 'bg-yellow-400' },
        { fullDate: '2025-06-15', text: 'Entrega Borrador Diseño', color: 'bg-blue-400' },
        { fullDate: '2025-06-22', text: 'Clase de Matemáticas', color: 'bg-red-400' },
    ]);

    const [newEventDate, setNewEventDate] = useState(''); //YYYY-MM-DD format for input
    const [newEventDescription, setNewEventDescription] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const monthNames = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
    const currentMonthName = monthNames[displayMonth];
    const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(displayYear, displayMonth, 1).getDay(); // 0 for Sunday, 1 for Monday...

    const handleAddEvent = () => {
        if (!newEventDate || !newEventDescription.trim()) {
            setShowErrorMessage(true);
            return;
        }
        setShowErrorMessage(false);

        // Basic validation: ensure the date is valid and format it for consistency
        try {
            const [year, month, day] = newEventDate.split('-').map(Number);
            const eventDateObj = new Date(year, month - 1, day); // Month is 0-indexed for Date object

            // Check if the parsed date is valid (e.g., not "2025-02-30")
            if (isNaN(eventDateObj.getTime()) || eventDateObj.getDate() !== day || eventDateObj.getMonth() !== (month - 1) || eventDateObj.getFullYear() !== year) {
                setShowErrorMessage(true); // Invalid date format or value
                return;
            }

            const newEvent = {
                fullDate: newEventDate, // Store asplanade-MM-DD string
                text: newEventDescription.trim(),
                color: 'bg-indigo-300' // Default color for new events
            };
            setEvents([...events, newEvent]);
            setNewEventDate('');
            setNewEventDescription('');
        } catch (e) {
            setShowErrorMessage(true); // Catch any parsing errors
        }
    };

    const generateCalendarDays = () => {
        const days = [];
        // Adjusting startOffset so Monday is the first day of the week displayed
        const startOffset = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

        // Add empty cells for the start of the week
        for (let i = 0; i < startOffset; i++) {
            days.push(<div key={`empty-${i}`} className="w-10 h-10 text-center flex items-center justify-center"></div>);
        }

        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const dayString = String(i).padStart(2, '0');
            const monthString = String(displayMonth + 1).padStart(2, '0');
            const dateToCheck = `${displayYear}-${monthString}-${dayString}`;
            
            const event = events.find(e => e.fullDate === dateToCheck);
            const isToday = i === today.getDate() && displayMonth === today.getMonth() && displayYear === today.getFullYear();

            days.push(
                <div
                    key={`day-${i}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold relative ${
                        event ? `${event.color} text-white shadow-md` : 'text-gray-700 hover:bg-gray-100'
                    } ${isToday ? 'border-2 border-indigo-500' : ''}`}
                >
                    {i}
                    {event && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white border border-gray-300"></div>
                    )}
                </div>
            );
        }
        return days;
    };

    // Filter events to only show for the currently displayed month
    const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.fullDate);
        return eventDate.getMonth() === displayMonth && eventDate.getFullYear() === displayYear;
    }).sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate)); // Sort by date

    return (
        <div className="py-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Agenda</h2>
            <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="text-center mb-6">
                    <p className="text-indigo-600 font-semibold text-sm mb-1">{displayYear}</p>
                    <p className="text-4xl font-bold text-gray-900">{currentMonthName}</p>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-500 mb-4">
                    <span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span> {/* Updated order to start with Monday */}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {generateCalendarDays()}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Agregar Nuevo Evento:</h3>
                    {showErrorMessage && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4" role="alert">
                            <span className="block sm:inline">Por favor, completa la fecha y la descripción del evento correctamente.</span>
                        </div>
                    )}
                    <div className="flex flex-col gap-4">
                        <input
                            type="date"
                            value={newEventDate}
                            onChange={(e) => setNewEventDate(e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50"
                        />
                        <textarea
                            value={newEventDescription}
                            onChange={(e) => setNewEventDescription(e.target.value)}
                            placeholder="Descripción del evento importante..."
                            rows="3"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 resize-y"
                        ></textarea>
                        <button
                            onClick={handleAddEvent}
                            className="w-full py-3 px-6 rounded-full bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition-all duration-300 shadow-md transform hover:scale-105"
                        >
                            Agregar Evento
                        </button>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Próximos Eventos:</h3>
                    {filteredEvents.length > 0 ? (
                        <ul className="space-y-3">
                            {filteredEvents.map((event, index) => (
                                <li key={index} className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-100">
                                    <span className={`w-3 h-3 rounded-full mr-3 ${event.color}`}></span>
                                    <p className="text-gray-700 font-medium">
                                        <span className="font-bold">{new Date(event.fullDate).getDate()} {monthNames[new Date(event.fullDate).getMonth()].substring(0,3)}:</span> {event.text}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No hay eventos próximos para este mes.</p>
                    )}
                </div>
                <button
                    onClick={() => setCurrentView('dashboard')}
                    className="mt-6 w-full py-3 px-6 rounded-full bg-red-500 text-white font-semibold text-lg hover:bg-red-600 transition-all duration-300 shadow-md transform hover:scale-105"
                >
                    Volver al Inicio
                </button>
            </div>
        </div>
    );
};


// Reusable Card component for content pages
const ContentCard = ({ title, items }) => (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-indigo-700 mb-4">{title}</h3>
        <ul className="list-none space-y-2">
            {items.map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                    <span className="text-indigo-400 mr-2">•</span> {item}
                </li>
            ))}
        </ul>
    </div>
);

// QuizScreen component - Now allows selection of quiz type
const QuizScreen = ({ setCurrentView }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] p-4 text-center">
            {/* Adjusted max-w-xl for better width on larger screens, still responsive */}
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-xl w-full mx-auto animate-fade-in">
                <img
                    src="https://i.imgur.com/7cM9GbM.png" // Using the notification image for quizzes
                    alt="Icono de Quiz"
                    className="w-32 h-32 mx-auto mb-6 object-contain"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/128x128/f0f9ff/1d4ed8?text=Quiz"; }}
                />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">¡Bienvenido a la Zona de Quizzes!</h2>
                <p className="text-md text-gray-600 mb-6 leading-relaxed">
                    Selecciona un tema para empezar tu test interactivo:
                </p>

                {/* Added more margin-top for better spacing */}
                <div className="grid grid-cols-1 gap-4 mt-8">
                    <QuizSelectionCard
                        title="Matemáticas"
                        description="Ponte a prueba con el Teorema de Pitágoras y Binomios al Cuadrado."
                        onClick={() => setCurrentView('mathQuiz')}
                        color="bg-green-100"
                        textColor="text-green-800"
                    />
                    <QuizSelectionCard
                        title="Diseño"
                        description="Repasa los criterios de diseño y fundamentos visuales."
                        onClick={() => setCurrentView('designQuiz')}
                        color="bg-blue-100"
                        textColor="text-blue-800"
                    />
                    <QuizSelectionCard
                        title="Proyecto Personal"
                        description="Evalúa tu conocimiento sobre las etapas y el informe del proyecto."
                        onClick={() => setCurrentView('proyectoQuiz')}
                        color="bg-purple-100"
                        textColor="text-purple-800"
                    />
                </div>

                <button
                    onClick={() => setCurrentView('dashboard')}
                    className="w-full py-3 px-6 rounded-full bg-indigo-500 text-white font-semibold text-lg hover:bg-indigo-600 transition-all duration-300 shadow-md transform hover:scale-105 mt-8"
                >
                    Volver al Inicio
                </button>
            </div>
        </div>
    );
};

// Reusable component for Quiz selection cards
const QuizSelectionCard = ({ title, description, onClick, color, textColor }) => (
    <div className={`${color} rounded-xl shadow-md p-5 flex flex-col items-center text-center`}>
        <h3 className={`text-2xl font-bold ${textColor} mb-2`}>{title}</h3>
        <p className={`text-sm ${textColor} mb-4`}>{description}</p>
        <button
            onClick={onClick}
            className={`px-5 py-2 rounded-full bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition-all duration-300 shadow-sm`}
        >
            Ingresar a Quizzes
        </button>
    </div>
);


// MathQuizScreen component
const MathQuizScreen = ({ setCurrentView }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [feedback, setFeedback] = useState('');

    const questions = [
        {
            question: "¿Cuál es la fórmula del Teorema de Pitágoras?",
            type: "text", // User types answer
            correctAnswer: "a^2 + b^2 = c^2"
        },
        {
            question: "¿Cuál es el resultado de (a + b)²?",
            type: "text",
            correctAnswer: "a^2 + 2ab + b^2"
        },
        {
            question: "¿Si un triángulo tiene lados de 3 y 4, cuál es la hipotenusa?",
            type: "radio",
            options: ["5", "6", "7", "8"],
            correctAnswer: "5"
        }
    ];

    const handleAnswerChange = (e) => {
        setSelectedAnswer(e.target.value);
        setFeedback(''); // Clear feedback when answer changes
    };

    const handleSubmitAnswer = () => {
        if (selectedAnswer.trim().toLowerCase() === questions[currentQuestionIndex].correctAnswer.toLowerCase()) {
            setFeedback('¡Correcto! ✅');
        } else {
            setFeedback(`Incorrecto. La respuesta correcta es: ${questions[currentQuestionIndex].correctAnswer} ❌`);
        }
    };

    const handleNextQuestion = () => {
        setSelectedAnswer('');
        setFeedback('');
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setFeedback('¡Has completado el quiz de Matemáticas! 🎉');
            // Optionally, navigate back or show score summary
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="py-6 flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] p-4 text-center">
            {/* Adjusted max-w-xl for better width */}
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-xl w-full mx-auto animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Quiz de Matemáticas</h2>

                <div className="mb-6">
                    <p className="text-lg font-semibold mb-4">{currentQuestion.question}</p>
                    {currentQuestion.type === "text" && (
                        <input
                            type="text"
                            value={selectedAnswer}
                            onChange={handleAnswerChange}
                            placeholder="Escribe tu respuesta aquí"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
                        />
                    )}
                    {currentQuestion.type === "radio" && (
                        <div className="flex flex-col space-y-2">
                            {currentQuestion.options.map((option, index) => (
                                <label key={index} className="inline-flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-100">
                                    <input
                                        type="radio"
                                        name="math-quiz-option"
                                        value={option}
                                        checked={selectedAnswer === option}
                                        onChange={handleAnswerChange}
                                        className="form-radio text-green-600 h-5 w-5"
                                    />
                                    <span className="ml-2 text-gray-700 text-base">{option}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {feedback && (
                    <p className={`text-lg font-medium mb-4 ${feedback.includes('Correcto') ? 'text-green-600' : 'text-red-600'}`}>
                        {feedback}
                    </p>
                )}

                <div className="flex justify-center space-x-4 mt-6">
                    <button
                        onClick={handleSubmitAnswer}
                        className="px-6 py-3 rounded-full bg-green-500 text-white font-semibold text-lg hover:bg-green-600 transition-all duration-300 shadow-md transform hover:scale-105"
                        disabled={!selectedAnswer && currentQuestion.type === "text" || (currentQuestion.type === "radio" && !selectedAnswer)}
                    >
                        Comprobar
                    </button>
                    <button
                        onClick={handleNextQuestion}
                        className="px-6 py-3 rounded-full bg-indigo-500 text-white font-semibold text-lg hover:bg-indigo-600 transition-all duration-300 shadow-md transform hover:scale-105"
                        disabled={!feedback} // Only enable next after feedback is given
                    >
                        {currentQuestionIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Quiz'}
                    </button>
                </div>

                <button
                    onClick={() => setCurrentView('quiz')}
                    className="mt-8 w-full py-3 px-6 rounded-full bg-gray-200 text-gray-700 font-semibold text-lg hover:bg-gray-300 transition-all duration-300 shadow-md"
                >
                    Volver a Quizzes
                </button>
            </div>
        </div>
    );
};

// DesignQuizScreen component
const DesignQuizScreen = ({ setCurrentView }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [feedback, setFeedback] = useState('');

    const questions = [
        {
            question: "¿Qué se investiga en el Criterio A de Diseño?",
            type: "radio",
            options: [
                "Desarrollo de ideas y prototipado",
                "Identificación y análisis del problema",
                "Evaluación de la solución",
                "Creación del producto final"
            ],
            correctAnswer: "Identificación y análisis del problema"
        },
        {
            question: "¿Cuál es uno de los propósitos principales del diseño paramétrico?",
            type: "text",
            correctAnswer: "optimizar procesos y formas"
        },
        {
            question: "¿Qué elemento es fundamental en la comunicación visual para transmitir un mensaje de forma efectiva?",
            type: "radio",
            options: [
                "Solo el color",
                "Solo la tipografía",
                "La jerarquía visual",
                "La cantidad de texto"
            ],
            correctAnswer: "La jerarquía visual"
        }
    ];

    const handleAnswerChange = (e) => {
        setSelectedAnswer(e.target.value);
        setFeedback('');
    };

    const handleSubmitAnswer = () => {
        if (selectedAnswer.trim().toLowerCase() === questions[currentQuestionIndex].correctAnswer.toLowerCase()) {
            setFeedback('¡Correcto! ✅');
        } else {
            setFeedback(`Incorrecto. La respuesta correcta es: ${questions[currentQuestionIndex].correctAnswer} ❌`);
        }
    };

    const handleNextQuestion = () => {
        setSelectedAnswer('');
        setFeedback('');
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setFeedback('¡Has completado el quiz de Diseño! 🎉');
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="py-6 flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] p-4 text-center">
            {/* Adjusted max-w-xl for better width */}
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-xl w-full mx-auto animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Quiz de Diseño</h2>

                <div className="mb-6">
                    <p className="text-lg font-semibold mb-4">{currentQuestion.question}</p>
                    {currentQuestion.type === "text" && (
                        <input
                            type="text"
                            value={selectedAnswer}
                            onChange={handleAnswerChange}
                            placeholder="Escribe tu respuesta aquí"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                        />
                    )}
                    {currentQuestion.type === "radio" && (
                        <div className="flex flex-col space-y-2">
                            {currentQuestion.options.map((option, index) => (
                                <label key={index} className="inline-flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-100">
                                    <input
                                        type="radio"
                                        name="design-quiz-option"
                                        value={option}
                                        checked={selectedAnswer === option}
                                        onChange={handleAnswerChange}
                                        className="form-radio text-blue-600 h-5 w-5"
                                    />
                                    <span className="ml-2 text-gray-700 text-base">{option}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {feedback && (
                    <p className={`text-lg font-medium mb-4 ${feedback.includes('Correcto') ? 'text-green-600' : 'text-red-600'}`}>
                        {feedback}
                    </p>
                )}

                <div className="flex justify-center space-x-4 mt-6">
                    <button
                        onClick={handleSubmitAnswer}
                        className="px-6 py-3 rounded-full bg-blue-500 text-white font-semibold text-lg hover:bg-blue-600 transition-all duration-300 shadow-md transform hover:scale-105"
                        disabled={!selectedAnswer && currentQuestion.type === "text" || (currentQuestion.type === "radio" && !selectedAnswer)}
                    >
                        Comprobar
                    </button>
                    <button
                        onClick={handleNextQuestion}
                        className="px-6 py-3 rounded-full bg-indigo-500 text-white font-semibold text-lg hover:bg-indigo-600 transition-all duration-300 shadow-md transform hover:scale-105"
                        disabled={!feedback}
                    >
                        {currentQuestionIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Quiz'}
                    </button>
                </div>

                <button
                    onClick={() => setCurrentView('quiz')}
                    className="mt-8 w-full py-3 px-6 rounded-full bg-gray-200 text-gray-700 font-semibold text-lg hover:bg-gray-300 transition-all duration-300 shadow-md"
                >
                    Volver a Quizzes
                </button>
            </div>
        </div>
    );
};

// ProyectoPersonalQuizScreen component
const ProyectoPersonalQuizScreen = ({ setCurrentView }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [feedback, setFeedback] = useState('');

    const questions = [
        {
            question: "¿Cuál es el primer paso al iniciar tu Proyecto Personal?",
            type: "radio",
            options: [
                "Escribir el informe final",
                "Identificar un enfoque o problema",
                "Comenzar la ejecución sin planificación",
                "Presentar el proyecto"
            ],
            correctAnswer: "Identificar un enfoque o problema"
        },
        {
            question: "¿Qué se debe incluir en la sección de 'Reflexión' del informe final de un Proyecto Personal?",
            type: "text",
            correctAnswer: "logros, desafíos y aprendizajes"
        },
        {
            question: "¿La investigación es una etapa clave en el Proyecto Personal?",
            type: "radio",
            options: ["Sí", "No"],
            correctAnswer: "Sí"
        }
    ];

    const handleAnswerChange = (e) => {
        setSelectedAnswer(e.target.value);
        setFeedback('');
    };

    const handleSubmitAnswer = () => {
        if (selectedAnswer.trim().toLowerCase() === questions[currentQuestionIndex].correctAnswer.toLowerCase()) {
            setFeedback('¡Correcto! ✅');
        } else {
            setFeedback(`Incorrecto. La respuesta correcta es: ${questions[currentQuestionIndex].correctAnswer} ❌`);
        }
    };

    const handleNextQuestion = () => {
        setSelectedAnswer('');
        setFeedback('');
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setFeedback('¡Has completado el quiz de Proyecto Personal! 🎉');
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="py-6 flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] p-4 text-center">
            {/* Adjusted max-w-xl for better width */}
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-xl w-full mx-auto animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Quiz de Proyecto Personal</h2>

                <div className="mb-6">
                    <p className="text-lg font-semibold mb-4">{currentQuestion.question}</p>
                    {currentQuestion.type === "text" && (
                        <input
                            type="text"
                            value={selectedAnswer}
                            onChange={(e) => setSelectedAnswer(e.target.value)}
                            placeholder="Escribe tu respuesta aquí"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50"
                        />
                    )}
                    {currentQuestion.type === "radio" && (
                        <div className="flex flex-col space-y-2">
                            {currentQuestion.options.map((option, index) => (
                                <label key={index} className="inline-flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-100">
                                    <input
                                        type="radio"
                                        name="proyecto-quiz-option"
                                        value={option}
                                        checked={selectedAnswer === option}
                                        onChange={(e) => setSelectedAnswer(e.target.value)}
                                        className="form-radio text-purple-600 h-5 w-5"
                                    />
                                    <span className="ml-2 text-gray-700 text-base">{option}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {feedback && (
                    <p className={`text-lg font-medium mb-4 ${feedback.includes('Correcto') ? 'text-green-600' : 'text-red-600'}`}>
                        {feedback}
                    </p>
                )}

                <div className="flex justify-center space-x-4 mt-6">
                    <button
                        onClick={handleSubmitAnswer}
                        className="px-6 py-3 rounded-full bg-purple-500 text-white font-semibold text-lg hover:bg-purple-600 transition-all duration-300 shadow-md transform hover:scale-105"
                        disabled={!selectedAnswer && currentQuestion.type === "text" || (currentQuestion.type === "radio" && !selectedAnswer)}
                    >
                        Comprobar
                    </button>
                    <button
                        onClick={handleNextQuestion}
                        className="px-6 py-3 rounded-full bg-indigo-500 text-white font-semibold text-lg hover:bg-indigo-600 transition-all duration-300 shadow-md transform hover:scale-105"
                        disabled={!feedback}
                    >
                        {currentQuestionIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Quiz'}
                    </button>
                </div>

                <button
                    onClick={() => setCurrentView('quiz')}
                    className="mt-8 w-full py-3 px-6 rounded-full bg-gray-200 text-gray-700 font-semibold text-lg hover:bg-gray-300 transition-all duration-300 shadow-md"
                >
                    Volver a Quizzes
                </button>
            </div>
        </div>
    );
};


export default App;
