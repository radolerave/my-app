const jsonData = [
    {
        "id": 1,
        "name": "TechSolutions Ltd.",
        "who_what": "human",
        "keyword": "Technology",
        "country": "US",
        "phone": "+123-456-7890"
    },
    {
        "id": 2,
        "name": "Global Industries Inc.",
        "who_what": "notHuman",
        "keyword": "Manufacturing",
        "country": "CN",
        "phone": "+987-654-3210"
    },
    {
        "id": 3,
        "name": "FinanceTech Corp.",
        "who_what": "human",
        "keyword": "Finance",
        "country": "GB",
        "phone": "+555-123-4567"
    },
    {
        "id": 4,
        "name": "HealthWise Solutions",
        "who_what": "human",
        "keyword": "Healthcare",
        "country": "DE",
        "phone": "+333-777-9999"
    },
    {
        "id": 5,
        "name": "TransportaTech",
        "who_what": "notHuman",
        "keyword": "Transportation",
        "country": "JP",
        "phone": "+777-888-9999"
    },
    {
        "id": 6,
        "name": "InnoCorp Solutions",
        "who_what": "human",
        "keyword": "Innovation",
        "country": "FR",
        "phone": "+111-222-3333"
    },
    {
        "id": 7,
        "name": "TechInnovate Ltd.",
        "who_what": "human",
        "keyword": "Technology",
        "country": "US",
        "phone": "+444-555-6666"
    },
    {
        "id": 8,
        "name": "GreenEco Ventures",
        "who_what": "human",
        "keyword": "Environment",
        "country": "DE",
        "phone": "+777-888-9999"
    },
    {
        "id": 9,
        "name": "InnoTech Solutions",
        "who_what": "human",
        "keyword": "Technology",
        "country": "MG",
        "phone": "+555-777-9999"
    },
    {
        "id": 10,
        "name": "FinanceForward",
        "who_what": "notHuman",
        "keyword": "Finance",
        "country": "FR",
        "phone": "+333-444-5555"
    },
    {
        "id": 11,
        "name": "InnoWave Solutions",
        "who_what": "human",
        "keyword": "Innovation",
        "country": "FR",
        "phone": "+111-222-3333"
    },
    {
        "id": 12,
        "name": "TechSavvy Ltd.",
        "who_what": "human",
        "keyword": "Technology",
        "country": "US",
        "phone": "+444-555-6666"
    },
    {
        "id": 13,
        "name": "EcoFriendly Ventures",
        "who_what": "human",
        "keyword": "Environment",
        "country": "DE",
        "phone": "+777-888-9999"
    },
    {
        "id": 14,
        "name": "TechWizards",
        "who_what": "human",
        "keyword": "Technology",
        "country": "MG",
        "phone": "+555-777-9999"
    },
    {
        "id": 15,
        "name": "FinanceInnovate",
        "who_what": "notHuman",
        "keyword": "Finance",
        "country": "FR",
        "phone": "+333-444-5555"
    },
    {
        "id": 16,
        "name": "HealthTech Solutions",
        "who_what": "human",
        "keyword": "Healthcare",
        "country": "DE",
        "phone": "+666-777-8888"
    },
    {
        "id": 17,
        "name": "InnoTrade Corp.",
        "who_what": "human",
        "keyword": "Trade",
        "country": "JP",
        "phone": "+555-666-7777"
    },
    {
        "id": 18,
        "name": "TechBuilders Ltd.",
        "who_what": "human",
        "keyword": "Technology",
        "country": "US",
        "phone": "+444-555-6666"
    },
    {
        "id": 19,
        "name": "GreenSolutions",
        "who_what": "human",
        "keyword": "Environment",
        "country": "DE",
        "phone": "+777-888-9999"
    },
    {
        "id": 20,
        "name": "InnoSystems",
        "who_what": "human",
        "keyword": "Technology",
        "country": "MG",
        "phone": "+555-777-9999"
    },
    {
        "id": 21,
        "name": "HealthCare Innovators",
        "who_what": "human",
        "keyword": "Healthcare",
        "country": "US",
        "phone": "+111-222-3333"
    },
    {
        "id": 22,
        "name": "TradeConnect",
        "who_what": "human",
        "keyword": "Trade",
        "country": "JP",
        "phone": "+444-555-6666"
    },
    {
        "id": 23,
        "name": "TechEco Solutions",
        "who_what": "human",
        "keyword": "Environment",
        "country": "DE",
        "phone": "+777-888-9999"
    },
    {
        "id": 24,
        "name": "InnoCommerce",
        "who_what": "human",
        "keyword": "Technology",
        "country": "MG",
        "phone": "+555-777-9999"
    },
    {
        "id": 25,
        "name": "FinanceGurus",
        "who_what": "notHuman",
        "keyword": "Finance",
        "country": "FR",
        "phone": "+333-444-5555"
    },
    {
        "id": 26,
        "name": "HealthPlus",
        "who_what": "human",
        "keyword": "Healthcare",
        "country": "DE",
        "phone": "+666-777-8888"
    },
    {
        "id": 27,
        "name": "TechAhead",
        "who_what": "human",
        "keyword": "Technology",
        "country": "US",
        "phone": "+444-555-6666"
    },
    {
        "id": 28,
        "name": "EcoTech Ventures",
        "who_what": "human",
        "keyword": "Environment",
        "country": "DE",
        "phone": "+777-888-9999"
    },
    {
        "id": 29,
        "name": "InnoLogic",
        "who_what": "human",
        "keyword": "Technology",
        "country": "MG",
        "phone": "+555-777-9999"
    },
    {
        "id": 30,
        "name": "FinancePros",
        "who_what": "notHuman",
        "keyword": "Finance",
        "country": "FR",
        "phone": "+333-444-5555"
    },
    {
        "id": 31,
        "name": "HealthFirst Solutions",
        "who_what": "human",
        "keyword": "Healthcare",
        "country": "DE",
        "phone": "+666-777-8888"
    },
    {
        "id": 32,
        "name": "TradeLink",
        "who_what": "human",
        "keyword": "Trade",
        "country": "JP",
        "phone": "+444-555-6666"
    },
    {
        "id": 33,
        "name": "EcoInnovations",
        "who_what": "human",
        "keyword": "Environment",
        "country": "DE",
        "phone": "+777-888-9999"
    },
    {
        "id": 34,
        "name": "TechSolutions Now",
        "who_what": "human",
        "keyword": "Technology",
        "country": "US",
        "phone": "+444-555-6666"
    },
    {
        "id": 35,
        "name": "GreenTech",
        "who_what": "human",
        "keyword": "Environment",
        "country": "DE",
        "phone": "+777-888-9999"
    },
    {
        "id": 36,
        "name": "InnoFuture",
        "who_what": "human",
        "keyword": "Technology",
        "country": "MG",
        "phone": "+555-777-9999"
    },
    {
        "id": 37,
        "name": "FinanceUp",
        "who_what": "notHuman",
        "keyword": "Finance",
        "country": "FR",
        "phone": "+333-444-5555"
    },
    {
        "id": 38,
        "name": "HealthWave",
        "who_what": "human",
        "keyword": "Healthcare",
        "country": "DE",
        "phone": "+666-777-8888"
    },
    {
        "id": 39,
        "name": "TradeMaster",
        "who_what": "human",
        "keyword": "Trade",
        "country": "JP",
        "phone": "+444-555-6666"
    },
    {
        "id": 40,
        "name": "EcoSystems",
        "who_what": "human",
        "keyword": "Environment",
        "country": "DE",
        "phone": "+777-888-9999"
    },
    {
        "id": 41,
        "name": "GreenTech Innovations",
        "who_what": "human",
        "keyword": "Environment",
        "country": "DE",
        "phone": "+777-888-9999"
    },
    {
        "id": 42,
        "name": "InfoTech Systems",
        "who_what": "human",
        "keyword": "Technology",
        "country": "US",
        "phone": "+444-555-6666"
    },
    {
        "id": 43,
        "name": "MediCare Solutions",
        "who_what": "human",
        "keyword": "Healthcare",
        "country": "DE",
        "phone": "+666-777-8888"
    },
    {
        "id": 44,
        "name": "SmartLogistics",
        "who_what": "notHuman",
        "keyword": "Transportation",
        "country": "JP",
        "phone": "+777-888-9999"
    },
    {
        "id": 45,
        "name": "TechConnect Inc.",
        "who_what": "human",
        "keyword": "Technology",
        "country": "FR",
        "phone": "+111-222-3333"
    },
    {
        "id": 46,
        "name": "Manufactura Innovations",
        "who_what": "human",
        "keyword": "Manufacturing",
        "country": "MG",
        "phone": "+444-555-6666"
    },
    {
        "id": 47,
        "name": "FinanceForward Tech",
        "who_what": "human",
        "keyword": "Finance",
        "country": "ESP",
        "phone": "+999-888-7777"
    },
    {
        "id": 48,
        "name": "TechGenius Corp.",
        "who_what": "notHuman",
        "keyword": "Technology",
        "country": "FR",
        "phone": "+555-123-4567"
    },
    {
        "id": 49,
        "name": "HealthWave Solutions",
        "who_what": "human",
        "keyword": "Healthcare",
        "country": "ESP",
        "phone": "+777-888-9999"
    },
    {
        "id": 50,
        "name": "InnoTech Ventures",
        "who_what": "human",
        "keyword": "Technology",
        "country": "MG",
        "phone": "+555-777-9999"
    }
];