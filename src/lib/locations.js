/**
 * SugarMingle Global Location Dataset
 * A curated list of major countries and cities for discovery.
 */

export const COUNTRIES = [
    { code: 'KE', name: 'Kenya', cities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Malindi', 'Diani'] },
    { code: 'NG', name: 'Nigeria', cities: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Benin City', 'Kano'] },
    { code: 'UG', name: 'Uganda', cities: ['Kampala', 'Entebbe', 'Jinja', 'Mbarara', 'Gulu'] },
    { code: 'GH', name: 'Ghana', cities: ['Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Cape Coast'] },
    { code: 'ZA', name: 'South Africa', cities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth'] },
    { code: 'TZ', name: 'Tanzania', cities: ['Dar es Salaam', 'Arusha', 'Zanzibar', 'Mwanza', 'Dodoma'] },
    { code: 'US', name: 'United States', cities: ['New York', 'Los Angeles', 'Miami', 'Chicago', 'Houston', 'Atlanta', 'Las Vegas', 'Dallas'] },
    { code: 'GB', name: 'United Kingdom', cities: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool', 'Edinburgh'] },
    { code: 'AE', name: 'United Arab Emirates', cities: ['Dubai', 'Abu Dhabi', 'Sharjah'] },
    { code: 'CA', name: 'Canada', cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'] },
    { code: 'DE', name: 'Germany', cities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt'] },
    { code: 'FR', name: 'France', cities: ['Paris', 'Lyon', 'Marseille'] },
];

export function getDistance(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2)) return 0;
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) dist = 1;
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344;
    return dist; // Kilometers
}
