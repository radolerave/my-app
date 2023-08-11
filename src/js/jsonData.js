const jsonData = [
    {
        "id": 1,
        "name": "TechSolutions Ltd.",
        "who_what": "human",
        "keyword": "Technology",
        "country": "US"
    },
    {
        "id": 2,
        "name": "Global Industries Inc.",
        "who_what": "notHuman",
        "keyword": "Manufacturing",
        "country": "CN"
    },
    {
        "id": 3,
        "name": "FinanceTech Corp.",
        "who_what": "human",
        "keyword": "Finance",
        "country": "GB"
    },
    {
        "id": 4,
        "name": "HealthWise Solutions",
        "who_what": "human",
        "keyword": "Healthcare",
        "country": "DE"
    },
    {
        "id": 5,
        "name": "TransportaTech",
        "who_what": "notHuman",
        "keyword": "Transportation",
        "country": "JP"
    },
    {
        "id": 6,
        "name": "InnoVentures",
        "who_what": "human",
        "keyword": "Technology",
        "country": "FR"
    },
    {
        "id": 7,
        "name": "GlobalTech Co.",
        "who_what": "human",
        "keyword": "Technology",
        "country": "MG"
    },
    {
        "id": 8,
        "name": "FinanceFusion",
        "who_what": "human",
        "keyword": "Finance",
        "country": "US"
    },
    {
        "id": 9,
        "name": "Manufactura Group",
        "who_what": "notHuman",
        "keyword": "Manufacturing",
        "country": "CN"
    },
    {
        "id": 10,
        "name": "MediCare Innovations",
        "who_what": "human",
        "keyword": "Healthcare",
        "country": "GB"
    },
    {
        "id": 11,
        "name": "InnoTech Solutions",
        "who_what": "human",
        "keyword": "Technology",
        "country": "MG"
    },
    {
        "id": 12,
        "name": "FinanceForward",
        "who_what": "notHuman",
        "keyword": "Finance",
        "country": "FR"
    },
    {
        "id": 13,
        "name": "HealthFirst Group",
        "who_what": "human",
        "keyword": "Healthcare",
        "country": "DE"
    },
    {
        "id": 14,
        "name": "TechSys Innovations",
        "who_what": "human",
        "keyword": "Technology",
        "country": "ESP"
    },
    {
        "id": 15,
        "name": "EcoManufacturers",
        "who_what": "notHuman",
        "keyword": "Manufacturing",
        "country": "MG"
    },
    {
        "id": 16,
        "name": "MediTech Solutions",
        "who_what": "human",
        "keyword": "Healthcare",
        "country": "DE"
    },
    {
        "id": 17,
        "name": "FinanceFirm Inc.",
        "who_what": "human",
        "keyword": "Finance",
        "country": "GB"
    },
    {
        "id": 18,
        "name": "TechInno Co.",
        "who_what": "human",
        "keyword": "Technology",
        "country": "MG"
    },
    {
        "id": 19,
        "name": "InnoFusion",
        "who_what": "notHuman",
        "keyword": "Innovation",
        "country": "FR"
    },
    {
        "id": 20,
        "name": "GlobalTrade Group",
        "who_what": "human",
        "keyword": "Trade",
        "country": "ESP"
    },
    {
        "id": 21,
        "name": "Tech Innovators",
        "who_what": "human",
        "keyword": "Innovation",
        "country": "MG"
    },
    {
        "id": 22,
        "name": "GreenTech Ventures",
        "who_what": "human",
        "keyword": "Environment",
        "country": "ESP"
    },
    {
        "id": 23,
        "name": "Quantum Corp",
        "who_what": "human",
        "keyword": "Technology",
        "country": "US"
    },
    {
        "id": 24,
        "name": "GlobalTrade Co",
        "who_what": "notHuman",
        "keyword": "Trade",
        "country": "MG"
    },
    {
        "id": 25,
        "name": "Alpha Innovations",
        "who_what": "human",
        "keyword": "Innovation",
        "country": "FR"
    },
    {
        "id": 26,
        "name": "Quantum Innovations",
        "who_what": "human",
        "keyword": "Innovation",
        "country": "MG"
    },
    {
        "id": 27,
        "name": "TechMasters",
        "who_what": "human",
        "keyword": "Technology",
        "country": "MG"
    },
    {
        "id": 28,
        "name": "FinanceFutur",
        "who_what": "human",
        "keyword": "Finance",
        "country": "ESP"
    },
    {
        "id": 29,
        "name": "ManufacturaTech",
        "who_what": "notHuman",
        "keyword": "Manufacturing",
        "country": "FR"
    },
    {
        "id": 30,
        "name": "HealthCare Systems",
        "who_what": "human",
        "keyword": "Healthcare",
        "country": "ESP"
    },
    {
        "id": 31,
        "name": "TechForward Solutions",
        "who_what": "human",
        "keyword": "Technology",
        "country": "MG"
    },
    {
        "id": 32,
        "name": "AlphaTech Innovations",
        "who_what": "human",
        "keyword": "Innovation",
        "country": "FR"
    },
    {
        "id": 33,
        "name": "GlobalTrade Co",
        "who_what": "notHuman",
        "keyword": "Trade",
        "country": "MG"
    },
    {
        "id": 34,
        "name": "GreenTech Ventures",
        "who_what": "human",
        "keyword": "Environment",
        "country": "ESP"
    },
    {
        "id": 35,
        "name": "Quantum Corp",
        "who_what": "human",
        "keyword": "Technology",
        "country": "US"
    },
    {
        "id": 36,
        "name": "Tech Innovators",
        "who_what": "human",
        "keyword": "Innovation",
        "country": "MG"
    },
    {
        "id": 37,
        "name": "GreenEnergy Corp.",
        "who_what": "human",
        "keyword": "Environment",
        "country": "DE"
    },
    {
        "id": 38,
        "name": "InnoTech Solutions",
        "who_what": "human",
        "keyword": "Technology",
        "country": "MG"
    },
    {
        "id": 39,
        "name": "FinanceForward",
        "who_what": "notHuman",
        "keyword": "Finance",
        "country": "FR"
    },
    {
        "id": 40,
        "name": "HealthFirst Group",
        "who_what": "human",
        "keyword": "Healthcare",
        "country": "GB"
    },
    {
        "id": 41,
        "name": "TechSys Innovations",
        "who_what": "human",
        "keyword": "Technology",
        "country": "ESP"
    },
    {
        "id": 42,
        "name": "EcoManufacturers",
        "who_what": "notHuman",
        "keyword": "Manufacturing",
        "country": "MG"
    },
    {
        "id": 43,
        "name": "MediTech Solutions",
        "who_what": "human",
        "keyword": "Healthcare",
        "country": "DE"
    },
    {
        "id": 44,
        "name": "FinanceFirm Inc.",
        "who_what": "human",
        "keyword": "Finance",
        "country": "GB"
    },
    {
        "id": 45,
        "name": "TechInno Co.",
        "who_what": "human",
        "keyword": "Technology",
        "country": "MG"
    },
    {
        "id": 46,
        "name": "TechMasters",
        "who_what": "human",
        "keyword": "Technology",
        "country": "MG"
    },
    {
        "id": 47,
        "name": "FinanceFutur",
        "who_what": "human",
        "keyword": "Finance",
        "country": "ESP"
    },
    {
        "id": 48,
        "name": "ManufacturaTech",
        "who_what": "notHuman",
        "keyword": "Manufacturing",
        "country": "FR"
    },
    {
        "id": 49,
        "name": "HealthCare Systems",
        "who_what": "human",
        "keyword": "Healthcare",
        "country": "ESP"
    },
    {
        "id": 50,
        "name": "TechForward Solutions",
        "who_what": "human",
        "keyword": "Technology",
        "country": "MG"
    }
];
