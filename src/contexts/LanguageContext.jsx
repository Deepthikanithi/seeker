import React, { createContext, useContext, useState, useEffect } from 'react'

// Language translations
const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    profile: 'Profile',
    bookings: 'Bookings',
    payments: 'Payments',
    content: 'Content',
    community: 'Community',
    settings: 'Settings',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Information',
    
    // Dashboard
    welcomeBack: 'Welcome back',
    totalEarnings: 'Total Earnings',
    activeSessions: 'Active Sessions',
    completedSessions: 'Completed Sessions',
    averageRating: 'Average Rating',
    recentActivity: 'Recent Activity',
    upcomingBookings: 'Upcoming Bookings',
    
    // Settings
    platformLanguageSettings: 'Platform Language Settings',
    emailAlerts: 'Email Alerts',
    notificationSettings: 'Notification Settings',
    privacyDisclaimer: 'Privacy Disclaimer',
    policies: 'Policies',
    multiFactorAuth: 'Multi-Factor Authentication (MFA)',
    
    // Profile
    personalInformation: 'Personal Information',
    professionalDetails: 'Professional Details',
    skills: 'Skills',
    experience: 'Experience',
    
    // Payments
    walletOverview: 'Wallet Overview',
    paymentMethods: 'Payment Methods',
    transactionHistory: 'Transaction History',
    
    // Community
    activeSolvers: 'Active Solvers',
    recentDiscussions: 'Recent Discussions',
    topContributors: 'Top Contributors',
    upcomingEvents: 'Upcoming Events'
  },
  es: {
    // Navigation
    dashboard: 'Panel de Control',
    profile: 'Perfil',
    bookings: 'Reservas',
    payments: 'Pagos',
    content: 'Contenido',
    community: 'Comunidad',
    settings: 'Configuración',
    
    // Common
    save: 'Guardar',
    cancel: 'Cancelar',
    edit: 'Editar',
    delete: 'Eliminar',
    loading: 'Cargando...',
    success: 'Éxito',
    error: 'Error',
    warning: 'Advertencia',
    info: 'Información',
    
    // Dashboard
    welcomeBack: 'Bienvenido de vuelta',
    totalEarnings: 'Ganancias Totales',
    activeSessions: 'Sesiones Activas',
    completedSessions: 'Sesiones Completadas',
    averageRating: 'Calificación Promedio',
    recentActivity: 'Actividad Reciente',
    upcomingBookings: 'Próximas Reservas',
    
    // Settings
    platformLanguageSettings: 'Configuración de Idioma de la Plataforma',
    emailAlerts: 'Alertas por Correo',
    notificationSettings: 'Configuración de Notificaciones',
    privacyDisclaimer: 'Aviso de Privacidad',
    policies: 'Políticas',
    multiFactorAuth: 'Autenticación de Múltiples Factores (MFA)',
    
    // Profile
    personalInformation: 'Información Personal',
    professionalDetails: 'Detalles Profesionales',
    skills: 'Habilidades',
    experience: 'Experiencia',
    
    // Payments
    walletOverview: 'Resumen de Billetera',
    paymentMethods: 'Métodos de Pago',
    transactionHistory: 'Historial de Transacciones',
    
    // Community
    activeSolvers: 'Solucionadores Activos',
    recentDiscussions: 'Discusiones Recientes',
    topContributors: 'Principales Contribuyentes',
    upcomingEvents: 'Próximos Eventos'
  },
  fr: {
    // Navigation
    dashboard: 'Tableau de Bord',
    profile: 'Profil',
    bookings: 'Réservations',
    payments: 'Paiements',
    content: 'Contenu',
    community: 'Communauté',
    settings: 'Paramètres',
    
    // Common
    save: 'Enregistrer',
    cancel: 'Annuler',
    edit: 'Modifier',
    delete: 'Supprimer',
    loading: 'Chargement...',
    success: 'Succès',
    error: 'Erreur',
    warning: 'Avertissement',
    info: 'Information',
    
    // Dashboard
    welcomeBack: 'Bon retour',
    totalEarnings: 'Gains Totaux',
    activeSessions: 'Sessions Actives',
    completedSessions: 'Sessions Terminées',
    averageRating: 'Note Moyenne',
    recentActivity: 'Activité Récente',
    upcomingBookings: 'Réservations à Venir',
    
    // Settings
    platformLanguageSettings: 'Paramètres de Langue de la Plateforme',
    emailAlerts: 'Alertes Email',
    notificationSettings: 'Paramètres de Notification',
    privacyDisclaimer: 'Avis de Confidentialité',
    policies: 'Politiques',
    multiFactorAuth: 'Authentification Multi-Facteurs (MFA)',
    
    // Profile
    personalInformation: 'Informations Personnelles',
    professionalDetails: 'Détails Professionnels',
    skills: 'Compétences',
    experience: 'Expérience',
    
    // Payments
    walletOverview: 'Aperçu du Portefeuille',
    paymentMethods: 'Méthodes de Paiement',
    transactionHistory: 'Historique des Transactions',
    
    // Community
    activeSolvers: 'Solutionneurs Actifs',
    recentDiscussions: 'Discussions Récentes',
    topContributors: 'Principaux Contributeurs',
    upcomingEvents: 'Événements à Venir'
  },
  de: {
    // Navigation
    dashboard: 'Dashboard',
    profile: 'Profil',
    bookings: 'Buchungen',
    payments: 'Zahlungen',
    content: 'Inhalt',
    community: 'Gemeinschaft',
    settings: 'Einstellungen',
    
    // Common
    save: 'Speichern',
    cancel: 'Abbrechen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    loading: 'Laden...',
    success: 'Erfolg',
    error: 'Fehler',
    warning: 'Warnung',
    info: 'Information',
    
    // Dashboard
    welcomeBack: 'Willkommen zurück',
    totalEarnings: 'Gesamteinnahmen',
    activeSessions: 'Aktive Sitzungen',
    completedSessions: 'Abgeschlossene Sitzungen',
    averageRating: 'Durchschnittliche Bewertung',
    recentActivity: 'Letzte Aktivität',
    upcomingBookings: 'Kommende Buchungen',
    
    // Settings
    platformLanguageSettings: 'Plattform-Spracheinstellungen',
    emailAlerts: 'E-Mail-Benachrichtigungen',
    notificationSettings: 'Benachrichtigungseinstellungen',
    privacyDisclaimer: 'Datenschutzhinweis',
    policies: 'Richtlinien',
    multiFactorAuth: 'Mehr-Faktor-Authentifizierung (MFA)',
    
    // Profile
    personalInformation: 'Persönliche Informationen',
    professionalDetails: 'Berufliche Details',
    skills: 'Fähigkeiten',
    experience: 'Erfahrung',
    
    // Payments
    walletOverview: 'Wallet-Übersicht',
    paymentMethods: 'Zahlungsmethoden',
    transactionHistory: 'Transaktionsverlauf',
    
    // Community
    activeSolvers: 'Aktive Problemlöser',
    recentDiscussions: 'Aktuelle Diskussionen',
    topContributors: 'Top-Beitragende',
    upcomingEvents: 'Kommende Veranstaltungen'
  },
  zh: {
    // Navigation
    dashboard: '仪表板',
    profile: '个人资料',
    bookings: '预订',
    payments: '付款',
    content: '内容',
    community: '社区',
    settings: '设置',
    
    // Common
    save: '保存',
    cancel: '取消',
    edit: '编辑',
    delete: '删除',
    loading: '加载中...',
    success: '成功',
    error: '错误',
    warning: '警告',
    info: '信息',
    
    // Dashboard
    welcomeBack: '欢迎回来',
    totalEarnings: '总收入',
    activeSessions: '活跃会话',
    completedSessions: '已完成会话',
    averageRating: '平均评分',
    recentActivity: '最近活动',
    upcomingBookings: '即将到来的预订',
    
    // Settings
    platformLanguageSettings: '平台语言设置',
    emailAlerts: '邮件提醒',
    notificationSettings: '通知设置',
    privacyDisclaimer: '隐私声明',
    policies: '政策',
    multiFactorAuth: '多因素认证 (MFA)',
    
    // Profile
    personalInformation: '个人信息',
    professionalDetails: '专业详情',
    skills: '技能',
    experience: '经验',
    
    // Payments
    walletOverview: '钱包概览',
    paymentMethods: '付款方式',
    transactionHistory: '交易历史',
    
    // Community
    activeSolvers: '活跃解决者',
    recentDiscussions: '最近讨论',
    topContributors: '顶级贡献者',
    upcomingEvents: '即将举行的活动'
  },
  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    profile: 'प्रोफ़ाइल',
    bookings: 'बुकिंग',
    payments: 'भुगतान',
    content: 'सामग्री',
    community: 'समुदाय',
    settings: 'सेटिंग्स',

    // Common
    save: 'सेव करें',
    cancel: 'रद्द करें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    loading: 'लोड हो रहा है...',
    success: 'सफलता',
    error: 'त्रुटि',
    warning: 'चेतावनी',
    info: 'जानकारी',

    // Dashboard
    welcomeBack: 'वापसी पर स्वागत है',
    totalEarnings: 'कुल कमाई',
    activeSessions: 'सक्रिय सत्र',
    completedSessions: 'पूर्ण सत्र',
    averageRating: 'औसत रेटिंग',
    recentActivity: 'हाल की गतिविधि',
    upcomingBookings: 'आगामी बुकिंग',

    // Settings
    platformLanguageSettings: 'प्लेटफॉर्म भाषा सेटिंग्स',
    emailAlerts: 'ईमेल अलर्ट',
    notificationSettings: 'सूचना सेटिंग्स',
    privacyDisclaimer: 'गोपनीयता अस्वीकरण',
    policies: 'नीतियां',
    multiFactorAuth: 'मल्टी-फैक्टर प्रमाणीकरण (MFA)',

    // Profile
    personalInformation: 'व्यक्तिगत जानकारी',
    professionalDetails: 'व्यावसायिक विवरण',
    skills: 'कौशल',
    experience: 'अनुभव',

    // Payments
    walletOverview: 'वॉलेट अवलोकन',
    paymentMethods: 'भुगतान के तरीके',
    transactionHistory: 'लेनदेन इतिहास',

    // Community
    activeSolvers: 'सक्रिय समाधानकर्ता',
    recentDiscussions: 'हाल की चर्चाएं',
    topContributors: 'शीर्ष योगदानकर्ता',
    upcomingEvents: 'आगामी कार्यक्रम'
  },
  ar: {
    // Navigation
    dashboard: 'لوحة التحكم',
    profile: 'الملف الشخصي',
    bookings: 'الحجوزات',
    payments: 'المدفوعات',
    content: 'المحتوى',
    community: 'المجتمع',
    settings: 'الإعدادات',

    // Common
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تحرير',
    delete: 'حذف',
    loading: 'جاري التحميل...',
    success: 'نجح',
    error: 'خطأ',
    warning: 'تحذير',
    info: 'معلومات',

    // Dashboard
    welcomeBack: 'مرحباً بعودتك',
    totalEarnings: 'إجمالي الأرباح',
    activeSessions: 'الجلسات النشطة',
    completedSessions: 'الجلسات المكتملة',
    averageRating: 'متوسط التقييم',
    recentActivity: 'النشاط الأخير',
    upcomingBookings: 'الحجوزات القادمة',

    // Settings
    platformLanguageSettings: 'إعدادات لغة المنصة',
    emailAlerts: 'تنبيهات البريد الإلكتروني',
    notificationSettings: 'إعدادات الإشعارات',
    privacyDisclaimer: 'إخلاء مسؤولية الخصوصية',
    policies: 'السياسات',
    multiFactorAuth: 'المصادقة متعددة العوامل (MFA)',

    // Profile
    personalInformation: 'المعلومات الشخصية',
    professionalDetails: 'التفاصيل المهنية',
    skills: 'المهارات',
    experience: 'الخبرة',

    // Payments
    walletOverview: 'نظرة عامة على المحفظة',
    paymentMethods: 'طرق الدفع',
    transactionHistory: 'تاريخ المعاملات',

    // Community
    activeSolvers: 'الحلالون النشطون',
    recentDiscussions: 'المناقشات الأخيرة',
    topContributors: 'أفضل المساهمين',
    upcomingEvents: 'الأحداث القادمة'
  },
  pt: {
    // Navigation
    dashboard: 'Painel',
    profile: 'Perfil',
    bookings: 'Reservas',
    payments: 'Pagamentos',
    content: 'Conteúdo',
    community: 'Comunidade',
    settings: 'Configurações',

    // Common
    save: 'Salvar',
    cancel: 'Cancelar',
    edit: 'Editar',
    delete: 'Excluir',
    loading: 'Carregando...',
    success: 'Sucesso',
    error: 'Erro',
    warning: 'Aviso',
    info: 'Informação',

    // Dashboard
    welcomeBack: 'Bem-vindo de volta',
    totalEarnings: 'Ganhos Totais',
    activeSessions: 'Sessões Ativas',
    completedSessions: 'Sessões Concluídas',
    averageRating: 'Avaliação Média',
    recentActivity: 'Atividade Recente',
    upcomingBookings: 'Próximas Reservas',

    // Settings
    platformLanguageSettings: 'Configurações de Idioma da Plataforma',
    emailAlerts: 'Alertas por Email',
    notificationSettings: 'Configurações de Notificação',
    privacyDisclaimer: 'Aviso de Privacidade',
    policies: 'Políticas',
    multiFactorAuth: 'Autenticação Multi-Fator (MFA)',

    // Profile
    personalInformation: 'Informações Pessoais',
    professionalDetails: 'Detalhes Profissionais',
    skills: 'Habilidades',
    experience: 'Experiência',

    // Payments
    walletOverview: 'Visão Geral da Carteira',
    paymentMethods: 'Métodos de Pagamento',
    transactionHistory: 'Histórico de Transações',

    // Community
    activeSolvers: 'Solucionadores Ativos',
    recentDiscussions: 'Discussões Recentes',
    topContributors: 'Principais Contribuidores',
    upcomingEvents: 'Próximos Eventos'
  },
  ru: {
    // Navigation
    dashboard: 'Панель управления',
    profile: 'Профиль',
    bookings: 'Бронирования',
    payments: 'Платежи',
    content: 'Контент',
    community: 'Сообщество',
    settings: 'Настройки',

    // Common
    save: 'Сохранить',
    cancel: 'Отмена',
    edit: 'Редактировать',
    delete: 'Удалить',
    loading: 'Загрузка...',
    success: 'Успех',
    error: 'Ошибка',
    warning: 'Предупреждение',
    info: 'Информация',

    // Dashboard
    welcomeBack: 'Добро пожаловать обратно',
    totalEarnings: 'Общий доход',
    activeSessions: 'Активные сессии',
    completedSessions: 'Завершенные сессии',
    averageRating: 'Средний рейтинг',
    recentActivity: 'Недавняя активность',
    upcomingBookings: 'Предстоящие бронирования',

    // Settings
    platformLanguageSettings: 'Настройки языка платформы',
    emailAlerts: 'Email уведомления',
    notificationSettings: 'Настройки уведомлений',
    privacyDisclaimer: 'Заявление о конфиденциальности',
    policies: 'Политики',
    multiFactorAuth: 'Многофакторная аутентификация (MFA)',

    // Profile
    personalInformation: 'Личная информация',
    professionalDetails: 'Профессиональные детали',
    skills: 'Навыки',
    experience: 'Опыт',

    // Payments
    walletOverview: 'Обзор кошелька',
    paymentMethods: 'Способы оплаты',
    transactionHistory: 'История транзакций',

    // Community
    activeSolvers: 'Активные решатели',
    recentDiscussions: 'Недавние обсуждения',
    topContributors: 'Топ участники',
    upcomingEvents: 'Предстоящие события'
  }
}

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    // Return fallback instead of throwing error
    return {
      currentLanguage: 'en',
      changeLanguage: () => {},
      t: (key) => key,
      availableLanguages: ['en']
    }
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en')

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('preferredLanguage')
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage)
    }

    // Listen for language change events
    const handleLanguageChange = (event) => {
      if (event.detail && event.detail.language) {
        setCurrentLanguage(event.detail.language)
      }
    }

    window.addEventListener('languageChanged', handleLanguageChange)

    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange)
    }
  }, [])

  const changeLanguage = (languageCode) => {
    if (translations[languageCode]) {
      setCurrentLanguage(languageCode)
      localStorage.setItem('preferredLanguage', languageCode)
    }
  }

  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key
  }

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    availableLanguages: Object.keys(translations)
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageContext
