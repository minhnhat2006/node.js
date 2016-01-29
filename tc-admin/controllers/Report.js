var _ = require('underscore');
var _s = require('underscore.string');
var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var reportModel = new (require('./../models/ReportModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "report",
    nameCountryList: 'country-list',
    nameCountryGrowth: 'country-growth',
    init: function() {
        reportModel.setRestClient(this.getRestClient());
        this.setModel(reportModel);

        if (this.originalActionName === Constant.CONTROLLER_ACTION_DEFAULT) {
            this.setView(new View(this.getResponse(), this.name));
        } else if (this.originalActionName === this.nameCountryList) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameCountryList));
        } else if (this.originalActionName === this.nameCountryGrowth) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameCountryGrowth));
        }
    },
    /**
     * Load Report page
     */
    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var dateFrom = self.getParam(Constant.PARAM_REPORT_DATE_FROM, '');
            var dateTo = self.getParam(Constant.PARAM_REPORT_DATE_TO, '');

            if (!dateFrom) {
                var from = new Date();
                from.setMonth(from.getMonth() - 1);
                dateFrom = (from.getMonth() + 1) + '/' + from.getDate() + '/' + from.getFullYear();
            }

            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (dateTo) {
                var parts = _s.words(dateTo, '/');
                var dateTo = new Date(parts[2] + '-' + parts[0] + '-' + parts[1]);
                if (dateTo > yesterday) {
                    dateTo = yesterday;
                }
            } else {
                dateTo = yesterday;
            }

            var strDateTo = (dateTo.getMonth() + 1) + '/' + dateTo.getDate() + '/' + dateTo.getFullYear();

            reportModel.getReportData({from: dateFrom, to: strDateTo}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                self.view.attachViewHelper();
                self.render({dateFrom: dateFrom, dateTo: strDateTo, dailyReg: resData.dailyReg, dailyVel: resData.dailyVel,
                    pageView: resData.pageView, totalReg: resData.totalReg, totalRegType: resData.totalRegType,
                    todayRegType: resData.todayRegType, interaction: resData.interaction, regContent: resData.regContent,
                    totalContent: resData.totalContent, countryGeo: resData.countryGeo, hourData: resData.hourData,
                    mediaData: resData.mediaData, chartData: resData.chartData, countryReg: resData.countryReg,
                    countryMedia: resData.countryMedia
                });
            });
        }
    },
    /**
     * Load Report of registered country list page
     */
    countryListAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;

            reportModel.getRegisteredCountryList({}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                // Database `tallcat`.`m_location_country`
                var countryList = {
                    'AO': {country_name: 'Angola', country_capital: 'Luanda', continent_code: 'AF', continent_name: 'Africa', currency: 'AOA'},
                    'BF': {country_name: 'Burkina Faso', country_capital: 'Ouagadougou', continent_code: 'AF', continent_name: 'Africa', currency: 'XOF'},
                    'BI': {country_name: 'Burundi', country_capital: 'Bujumbura', continent_code: 'AF', continent_name: 'Africa', currency: 'BIF'},
                    'BJ': {country_name: 'Benin', country_capital: 'Porto-Novo', continent_code: 'AF', continent_name: 'Africa', currency: 'XOF'},
                    'BW': {country_name: 'Botswana', country_capital: 'Gaborone', continent_code: 'AF', continent_name: 'Africa', currency: 'BWP'},
                    'CD': {country_name: 'Democratic Republic of the Congo', country_capital: 'Kinshasa', continent_code: 'AF', continent_name: 'Africa', currency: 'CDF'},
                    'CF': {country_name: 'Central African Republic', country_capital: 'Bangui', continent_code: 'AF', continent_name: 'Africa', currency: 'XAF'},
                    'CG': {country_name: 'Republic of the Congo', country_capital: 'Brazzaville', continent_code: 'AF', continent_name: 'Africa', currency: 'XAF'},
                    'CI': {country_name: 'Ivory Coast', country_capital: 'Yamoussoukro', continent_code: 'AF', continent_name: 'Africa', currency: 'XOF'},
                    'CM': {country_name: 'Cameroon', country_capital: 'Yaoundé', continent_code: 'AF', continent_name: 'Africa', currency: 'XAF'},
                    'CV': {country_name: 'Cape Verde', country_capital: 'Praia', continent_code: 'AF', continent_name: 'Africa', currency: 'CVE'},
                    'DJ': {country_name: 'Djibouti', country_capital: 'Djibouti', continent_code: 'AF', continent_name: 'Africa', currency: 'DJF'},
                    'DZ': {country_name: 'Algeria', country_capital: 'Algiers', continent_code: 'AF', continent_name: 'Africa', currency: 'DZD'},
                    'EG': {country_name: 'Egypt', country_capital: 'Cairo', continent_code: 'AF', continent_name: 'Africa', currency: 'EGP'},
                    'EH': {country_name: 'Western Sahara', country_capital: 'El-Aaiun', continent_code: 'AF', continent_name: 'Africa', currency: 'MAD'},
                    'ER': {country_name: 'Eritrea', country_capital: 'Asmara', continent_code: 'AF', continent_name: 'Africa', currency: 'ERN'},
                    'ET': {country_name: 'Ethiopia', country_capital: 'Addis Ababa', continent_code: 'AF', continent_name: 'Africa', currency: 'ETB'},
                    'GA': {country_name: 'Gabon', country_capital: 'Libreville', continent_code: 'AF', continent_name: 'Africa', currency: 'XAF'},
                    'GH': {country_name: 'Ghana', country_capital: 'Accra', continent_code: 'AF', continent_name: 'Africa', currency: 'GHS'},
                    'GM': {country_name: 'Gambia', country_capital: 'Banjul', continent_code: 'AF', continent_name: 'Africa', currency: 'GMD'},
                    'GN': {country_name: 'Guinea', country_capital: 'Conakry', continent_code: 'AF', continent_name: 'Africa', currency: 'GNF'},
                    'GQ': {country_name: 'Equatorial Guinea', country_capital: 'Malabo', continent_code: 'AF', continent_name: 'Africa', currency: 'XAF'},
                    'GW': {country_name: 'Guinea-Bissau', country_capital: 'Bissau', continent_code: 'AF', continent_name: 'Africa', currency: 'XOF'},
                    'KE': {country_name: 'Kenya', country_capital: 'Nairobi', continent_code: 'AF', continent_name: 'Africa', currency: 'KES'},
                    'KM': {country_name: 'Comoros', country_capital: 'Moroni', continent_code: 'AF', continent_name: 'Africa', currency: 'KMF'},
                    'LR': {country_name: 'Liberia', country_capital: 'Monrovia', continent_code: 'AF', continent_name: 'Africa', currency: 'LRD'},
                    'LS': {country_name: 'Lesotho', country_capital: 'Maseru', continent_code: 'AF', continent_name: 'Africa', currency: 'LSL'},
                    'LY': {country_name: 'Libya', country_capital: 'Tripolis', continent_code: 'AF', continent_name: 'Africa', currency: 'LYD'},
                    'MA': {country_name: 'Morocco', country_capital: 'Rabat', continent_code: 'AF', continent_name: 'Africa', currency: 'MAD'},
                    'MG': {country_name: 'Madagascar', country_capital: 'Antananarivo', continent_code: 'AF', continent_name: 'Africa', currency: 'MGA'},
                    'ML': {country_name: 'Mali', country_capital: 'Bamako', continent_code: 'AF', continent_name: 'Africa', currency: 'XOF'},
                    'MR': {country_name: 'Mauritania', country_capital: 'Nouakchott', continent_code: 'AF', continent_name: 'Africa', currency: 'MRO'},
                    'MU': {country_name: 'Mauritius', country_capital: 'Port Louis', continent_code: 'AF', continent_name: 'Africa', currency: 'MUR'},
                    'MW': {country_name: 'Malawi', country_capital: 'Lilongwe', continent_code: 'AF', continent_name: 'Africa', currency: 'MWK'},
                    'MZ': {country_name: 'Mozambique', country_capital: 'Maputo', continent_code: 'AF', continent_name: 'Africa', currency: 'MZN'},
                    'NA': {country_name: 'Namibia', country_capital: 'Windhoek', continent_code: 'AF', continent_name: 'Africa', currency: 'NAD'},
                    'NE': {country_name: 'Niger', country_capital: 'Niamey', continent_code: 'AF', continent_name: 'Africa', currency: 'XOF'},
                    'NG': {country_name: 'Nigeria', country_capital: 'Abuja', continent_code: 'AF', continent_name: 'Africa', currency: 'NGN'},
                    'RE': {country_name: 'Reunion', country_capital: 'Saint-Denis', continent_code: 'AF', continent_name: 'Africa', currency: 'EUR'},
                    'RW': {country_name: 'Rwanda', country_capital: 'Kigali', continent_code: 'AF', continent_name: 'Africa', currency: 'RWF'},
                    'SC': {country_name: 'Seychelles', country_capital: 'Victoria', continent_code: 'AF', continent_name: 'Africa', currency: 'SCR'},
                    'SD': {country_name: 'Sudan', country_capital: 'Khartoum', continent_code: 'AF', continent_name: 'Africa', currency: 'SDG'},
                    'SH': {country_name: 'Saint Helena', country_capital: 'Jamestown', continent_code: 'AF', continent_name: 'Africa', currency: 'SHP'},
                    'SL': {country_name: 'Sierra Leone', country_capital: 'Freetown', continent_code: 'AF', continent_name: 'Africa', currency: 'SLL'},
                    'SN': {country_name: 'Senegal', country_capital: 'Dakar', continent_code: 'AF', continent_name: 'Africa', currency: 'XOF'},
                    'SO': {country_name: 'Somalia', country_capital: 'Mogadishu', continent_code: 'AF', continent_name: 'Africa', currency: 'SOS'},
                    'ST': {country_name: 'Sao Tome and Principe', country_capital: 'São Tomé', continent_code: 'AF', continent_name: 'Africa', currency: 'STD'},
                    'SZ': {country_name: 'Swaziland', country_capital: 'Mbabane', continent_code: 'AF', continent_name: 'Africa', currency: 'SZL'},
                    'TD': {country_name: 'Chad', country_capital: 'N\'Djamena', continent_code: 'AF', continent_name: 'Africa', currency: 'XAF'},
                    'TG': {country_name: 'Togo', country_capital: 'Lomé', continent_code: 'AF', continent_name: 'Africa', currency: 'XOF'},
                    'TN': {country_name: 'Tunisia', country_capital: 'Tunis', continent_code: 'AF', continent_name: 'Africa', currency: 'TND'},
                    'TZ': {country_name: 'Tanzania', country_capital: 'Dodoma', continent_code: 'AF', continent_name: 'Africa', currency: 'TZS'},
                    'UG': {country_name: 'Uganda', country_capital: 'Kampala', continent_code: 'AF', continent_name: 'Africa', currency: 'UGX'},
                    'YT': {country_name: 'Mayotte', country_capital: 'Mamoudzou', continent_code: 'AF', continent_name: 'Africa', currency: 'EUR'},
                    'ZA': {country_name: 'South Africa', country_capital: 'Pretoria', continent_code: 'AF', continent_name: 'Africa', currency: 'ZAR'},
                    'ZM': {country_name: 'Zambia', country_capital: 'Lusaka', continent_code: 'AF', continent_name: 'Africa', currency: 'ZMK'},
                    'ZW': {country_name: 'Zimbabwe', country_capital: 'Harare', continent_code: 'AF', continent_name: 'Africa', currency: 'ZWL'},
                    'AE': {country_name: 'United Arab Emirates', country_capital: 'Abu Dhabi', continent_code: 'AS', continent_name: 'Asia', currency: 'AED'},
                    'AF': {country_name: 'Afghanistan', country_capital: 'Kabul', continent_code: 'AS', continent_name: 'Asia', currency: 'AFN'},
                    'AM': {country_name: 'Armenia', country_capital: 'Yerevan', continent_code: 'AS', continent_name: 'Asia', currency: 'AMD'},
                    'AZ': {country_name: 'Azerbaijan', country_capital: 'Baku', continent_code: 'AS', continent_name: 'Asia', currency: 'AZN'},
                    'BD': {country_name: 'Bangladesh', country_capital: 'Dhaka', continent_code: 'AS', continent_name: 'Asia', currency: 'BDT'},
                    'BH': {country_name: 'Bahrain', country_capital: 'Manama', continent_code: 'AS', continent_name: 'Asia', currency: 'BHD'},
                    'BN': {country_name: 'Brunei', country_capital: 'Bandar Seri Begawan', continent_code: 'AS', continent_name: 'Asia', currency: 'BND'},
                    'BT': {country_name: 'Bhutan', country_capital: 'Thimphu', continent_code: 'AS', continent_name: 'Asia', currency: 'BTN'},
                    'CC': {country_name: 'Cocos Islands', country_capital: 'West Island', continent_code: 'AS', continent_name: 'Asia', currency: 'AUD'},
                    'CN': {country_name: 'China', country_capital: 'Beijing', continent_code: 'AS', continent_name: 'Asia', currency: 'CNY'},
                    'CX': {country_name: 'Christmas Island', country_capital: 'Flying Fish Cove', continent_code: 'AS', continent_name: 'Asia', currency: 'AUD'},
                    'GE': {country_name: 'Georgia', country_capital: 'Tbilisi', continent_code: 'AS', continent_name: 'Asia', currency: 'GEL'},
                    'HK': {country_name: 'Hong Kong', country_capital: 'Hong Kong', continent_code: 'AS', continent_name: 'Asia', currency: 'HKD'},
                    'ID': {country_name: 'Indonesia', country_capital: 'Jakarta', continent_code: 'AS', continent_name: 'Asia', currency: 'IDR'},
                    'IL': {country_name: 'Israel', country_capital: 'Jerusalem', continent_code: 'AS', continent_name: 'Asia', currency: 'ILS'},
                    'IN': {country_name: 'India', country_capital: 'New Delhi', continent_code: 'AS', continent_name: 'Asia', currency: 'INR'},
                    'IO': {country_name: 'British Indian Ocean Territory', country_capital: 'Diego Garcia', continent_code: 'AS', continent_name: 'Asia', currency: 'USD'},
                    'IQ': {country_name: 'Iraq', country_capital: 'Baghdad', continent_code: 'AS', continent_name: 'Asia', currency: 'IQD'},
                    'IR': {country_name: 'Iran', country_capital: 'Tehran', continent_code: 'AS', continent_name: 'Asia', currency: 'IRR'},
                    'JO': {country_name: 'Jordan', country_capital: 'Amman', continent_code: 'AS', continent_name: 'Asia', currency: 'JOD'},
                    'JP': {country_name: 'Japan', country_capital: 'Tokyo', continent_code: 'AS', continent_name: 'Asia', currency: 'JPY'},
                    'KG': {country_name: 'Kyrgyzstan', country_capital: 'Bishkek', continent_code: 'AS', continent_name: 'Asia', currency: 'KGS'},
                    'KH': {country_name: 'Cambodia', country_capital: 'Phnom Penh', continent_code: 'AS', continent_name: 'Asia', currency: 'KHR'},
                    'KP': {country_name: 'North Korea', country_capital: 'Pyongyang', continent_code: 'AS', continent_name: 'Asia', currency: 'KPW'},
                    'KR': {country_name: 'South Korea', country_capital: 'Seoul', continent_code: 'AS', continent_name: 'Asia', currency: 'KRW'},
                    'KW': {country_name: 'Kuwait', country_capital: 'Kuwait City', continent_code: 'AS', continent_name: 'Asia', currency: 'KWD'},
                    'KZ': {country_name: 'Kazakhstan', country_capital: 'Astana', continent_code: 'AS', continent_name: 'Asia', currency: 'KZT'},
                    'LA': {country_name: 'Laos', country_capital: 'Vientiane', continent_code: 'AS', continent_name: 'Asia', currency: 'LAK'},
                    'LB': {country_name: 'Lebanon', country_capital: 'Beirut', continent_code: 'AS', continent_name: 'Asia', currency: 'LBP'},
                    'LK': {country_name: 'Sri Lanka', country_capital: 'Colombo', continent_code: 'AS', continent_name: 'Asia', currency: 'LKR'},
                    'MM': {country_name: 'Myanmar', country_capital: 'Nay Pyi Taw', continent_code: 'AS', continent_name: 'Asia', currency: 'MMK'},
                    'MN': {country_name: 'Mongolia', country_capital: 'Ulan Bator', continent_code: 'AS', continent_name: 'Asia', currency: 'MNT'},
                    'MO': {country_name: 'Macao', country_capital: 'Macao', continent_code: 'AS', continent_name: 'Asia', currency: 'MOP'},
                    'MV': {country_name: 'Maldives', country_capital: 'Malé', continent_code: 'AS', continent_name: 'Asia', currency: 'MVR'},
                    'MY': {country_name: 'Malaysia', country_capital: 'Kuala Lumpur', continent_code: 'AS', continent_name: 'Asia', currency: 'MYR'},
                    'NP': {country_name: 'Nepal', country_capital: 'Kathmandu', continent_code: 'AS', continent_name: 'Asia', currency: 'NPR'},
                    'OM': {country_name: 'Oman', country_capital: 'Muscat', continent_code: 'AS', continent_name: 'Asia', currency: 'OMR'},
                    'PH': {country_name: 'Philippines', country_capital: 'Manila', continent_code: 'AS', continent_name: 'Asia', currency: 'PHP'},
                    'PK': {country_name: 'Pakistan', country_capital: 'Islamabad', continent_code: 'AS', continent_name: 'Asia', currency: 'PKR'},
                    'PS': {country_name: 'Palestinian Territory', country_capital: 'East Jerusalem', continent_code: 'AS', continent_name: 'Asia', currency: 'ILS'},
                    'QA': {country_name: 'Qatar', country_capital: 'Doha', continent_code: 'AS', continent_name: 'Asia', currency: 'QAR'},
                    'SA': {country_name: 'Saudi Arabia', country_capital: 'Riyadh', continent_code: 'AS', continent_name: 'Asia', currency: 'SAR'},
                    'SG': {country_name: 'Singapore', country_capital: 'Singapur', continent_code: 'AS', continent_name: 'Asia', currency: 'SGD'},
                    'SY': {country_name: 'Syria', country_capital: 'Damascus', continent_code: 'AS', continent_name: 'Asia', currency: 'SYP'},
                    'TH': {country_name: 'Thailand', country_capital: 'Bangkok', continent_code: 'AS', continent_name: 'Asia', currency: 'THB'},
                    'TJ': {country_name: 'Tajikistan', country_capital: 'Dushanbe', continent_code: 'AS', continent_name: 'Asia', currency: 'TJS'},
                    'TM': {country_name: 'Turkmenistan', country_capital: 'Ashgabat', continent_code: 'AS', continent_name: 'Asia', currency: 'TMT'},
                    'TR': {country_name: 'Turkey', country_capital: 'Ankara', continent_code: 'AS', continent_name: 'Asia', currency: 'TRY'},
                    'TW': {country_name: 'Taiwan', country_capital: 'Taipei', continent_code: 'AS', continent_name: 'Asia', currency: 'TWD'},
                    'UZ': {country_name: 'Uzbekistan', country_capital: 'Tashkent', continent_code: 'AS', continent_name: 'Asia', currency: 'UZS'},
                    'VN': {country_name: 'Vietnam', country_capital: 'Hanoi', continent_code: 'AS', continent_name: 'Asia', currency: 'VND'},
                    'YE': {country_name: 'Yemen', country_capital: 'San‘a’', continent_code: 'AS', continent_name: 'Asia', currency: 'YER'},
                    'AL': {country_name: 'Albania', country_capital: 'Tirana', continent_code: 'EU', continent_name: 'Europe', currency: 'ALL'},
                    'AT': {country_name: 'Austria', country_capital: 'Vienna', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'AX': {country_name: 'Aland Islands', country_capital: 'Mariehamn', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'BA': {country_name: 'Bosnia and Herzegovina', country_capital: 'Sarajevo', continent_code: 'EU', continent_name: 'Europe', currency: 'BAM'},
                    'BE': {country_name: 'Belgium', country_capital: 'Brussels', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'BG': {country_name: 'Bulgaria', country_capital: 'Sofia', continent_code: 'EU', continent_name: 'Europe', currency: 'BGN'},
                    'BY': {country_name: 'Belarus', country_capital: 'Minsk', continent_code: 'EU', continent_name: 'Europe', currency: 'BYR'},
                    'CH': {country_name: 'Switzerland', country_capital: 'Berne', continent_code: 'EU', continent_name: 'Europe', currency: 'CHF'},
                    'CY': {country_name: 'Cyprus', country_capital: 'Nicosia', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'CZ': {country_name: 'Czech Republic', country_capital: 'Prague', continent_code: 'EU', continent_name: 'Europe', currency: 'CZK'},
                    'DE': {country_name: 'Germany', country_capital: 'Berlin', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'DK': {country_name: 'Denmark', country_capital: 'Copenhagen', continent_code: 'EU', continent_name: 'Europe', currency: 'DKK'},
                    'EE': {country_name: 'Estonia', country_capital: 'Tallinn', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'ES': {country_name: 'Spain', country_capital: 'Madrid', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'FI': {country_name: 'Finland', country_capital: 'Helsinki', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'FO': {country_name: 'Faroe Islands', country_capital: 'Tórshavn', continent_code: 'EU', continent_name: 'Europe', currency: 'DKK'},
                    'FR': {country_name: 'France', country_capital: 'Paris', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'GB': {country_name: 'United Kingdom', country_capital: 'London', continent_code: 'EU', continent_name: 'Europe', currency: 'GBP'},
                    'GG': {country_name: 'Guernsey', country_capital: 'St Peter Port', continent_code: 'EU', continent_name: 'Europe', currency: 'GBP'},
                    'GI': {country_name: 'Gibraltar', country_capital: 'Gibraltar', continent_code: 'EU', continent_name: 'Europe', currency: 'GIP'},
                    'GR': {country_name: 'Greece', country_capital: 'Athens', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'HR': {country_name: 'Croatia', country_capital: 'Zagreb', continent_code: 'EU', continent_name: 'Europe', currency: 'HRK'},
                    'HU': {country_name: 'Hungary', country_capital: 'Budapest', continent_code: 'EU', continent_name: 'Europe', currency: 'HUF'},
                    'IE': {country_name: 'Ireland', country_capital: 'Dublin', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'IM': {country_name: 'Isle of Man', country_capital: 'Douglas, Isle of Man', continent_code: 'EU', continent_name: 'Europe', currency: 'GBP'},
                    'IS': {country_name: 'Iceland', country_capital: 'Reykjavík', continent_code: 'EU', continent_name: 'Europe', currency: 'ISK'},
                    'IT': {country_name: 'Italy', country_capital: 'Rome', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'JE': {country_name: 'Jersey', country_capital: 'Saint Helier', continent_code: 'EU', continent_name: 'Europe', currency: 'GBP'},
                    'XK': {country_name: 'Kosovo', country_capital: 'Pristina', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'LI': {country_name: 'Liechtenstein', country_capital: 'Vaduz', continent_code: 'EU', continent_name: 'Europe', currency: 'CHF'},
                    'LT': {country_name: 'Lithuania', country_capital: 'Vilnius', continent_code: 'EU', continent_name: 'Europe', currency: 'LTL'},
                    'LU': {country_name: 'Luxembourg', country_capital: 'Luxembourg', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'LV': {country_name: 'Latvia', country_capital: 'Riga', continent_code: 'EU', continent_name: 'Europe', currency: 'LVL'},
                    'MC': {country_name: 'Monaco', country_capital: 'Monaco', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'MD': {country_name: 'Moldova', country_capital: 'Chişinău', continent_code: 'EU', continent_name: 'Europe', currency: 'MDL'},
                    'ME': {country_name: 'Montenegro', country_capital: 'Podgorica', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'MK': {country_name: 'Macedonia', country_capital: 'Skopje', continent_code: 'EU', continent_name: 'Europe', currency: 'MKD'},
                    'MT': {country_name: 'Malta', country_capital: 'Valletta', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'NL': {country_name: 'Netherlands', country_capital: 'Amsterdam', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'NO': {country_name: 'Norway', country_capital: 'Oslo', continent_code: 'EU', continent_name: 'Europe', currency: 'NOK'},
                    'PL': {country_name: 'Poland', country_capital: 'Warsaw', continent_code: 'EU', continent_name: 'Europe', currency: 'PLN'},
                    'PT': {country_name: 'Portugal', country_capital: 'Lisbon', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'RO': {country_name: 'Romania', country_capital: 'Bucharest', continent_code: 'EU', continent_name: 'Europe', currency: 'RON'},
                    'RS': {country_name: 'Serbia', country_capital: 'Belgrade', continent_code: 'EU', continent_name: 'Europe', currency: 'RSD'},
                    'RU': {country_name: 'Russia', country_capital: 'Moscow', continent_code: 'EU', continent_name: 'Europe', currency: 'RUB'},
                    'SE': {country_name: 'Sweden', country_capital: 'Stockholm', continent_code: 'EU', continent_name: 'Europe', currency: 'SEK'},
                    'SI': {country_name: 'Slovenia', country_capital: 'Ljubljana', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'SJ': {country_name: 'Svalbard and Jan Mayen', country_capital: 'Longyearbyen', continent_code: 'EU', continent_name: 'Europe', currency: 'NOK'},
                    'SK': {country_name: 'Slovakia', country_capital: 'Bratislava', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'SM': {country_name: 'San Marino', country_capital: 'San Marino', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'UA': {country_name: 'Ukraine', country_capital: 'Kiev', continent_code: 'EU', continent_name: 'Europe', currency: 'UAH'},
                    'VA': {country_name: 'Vatican', country_capital: 'Vatican City', continent_code: 'EU', continent_name: 'Europe', currency: 'EUR'},
                    'CS': {country_name: 'Serbia and Montenegro', country_capital: 'Belgrade', continent_code: 'EU', continent_name: 'Europe', currency: 'RSD'},
                    'AG': {country_name: 'Antigua and Barbuda', country_capital: 'St. John\'s', continent_code: 'NA', continent_name: 'North America', currency: 'XCD'},
                    'AI': {country_name: 'Anguilla', country_capital: 'The Valley', continent_code: 'NA', continent_name: 'North America', currency: 'XCD'},
                    'AW': {country_name: 'Aruba', country_capital: 'Oranjestad', continent_code: 'NA', continent_name: 'North America', currency: 'AWG'},
                    'BB': {country_name: 'Barbados', country_capital: 'Bridgetown', continent_code: 'NA', continent_name: 'North America', currency: 'BBD'},
                    'BL': {country_name: 'Saint Barthélemy', country_capital: 'Gustavia', continent_code: 'NA', continent_name: 'North America', currency: 'EUR'},
                    'BM': {country_name: 'Bermuda', country_capital: 'Hamilton', continent_code: 'NA', continent_name: 'North America', currency: 'BMD'},
                    'BQ': {country_name: 'Bonaire, Saint Eustatius and Saba ', country_capital: '', continent_code: 'NA', continent_name: 'North America', currency: 'USD'},
                    'BS': {country_name: 'Bahamas', country_capital: 'Nassau', continent_code: 'NA', continent_name: 'North America', currency: 'BSD'},
                    'BZ': {country_name: 'Belize', country_capital: 'Belmopan', continent_code: 'NA', continent_name: 'North America', currency: 'BZD'},
                    'CA': {country_name: 'Canada', country_capital: 'Ottawa', continent_code: 'NA', continent_name: 'North America', currency: 'CAD'},
                    'CR': {country_name: 'Costa Rica', country_capital: 'San José', continent_code: 'NA', continent_name: 'North America', currency: 'CRC'},
                    'CU': {country_name: 'Cuba', country_capital: 'Havana', continent_code: 'NA', continent_name: 'North America', currency: 'CUP'},
                    'CW': {country_name: 'Curacao', country_capital: ' Willemstad', continent_code: 'NA', continent_name: 'North America', currency: 'ANG'},
                    'DM': {country_name: 'Dominica', country_capital: 'Roseau', continent_code: 'NA', continent_name: 'North America', currency: 'XCD'},
                    'DO': {country_name: 'Dominican Republic', country_capital: 'Santo Domingo', continent_code: 'NA', continent_name: 'North America', currency: 'DOP'},
                    'GD': {country_name: 'Grenada', country_capital: 'St. George\'s', continent_code: 'NA', continent_name: 'North America', currency: 'XCD'},
                    'GL': {country_name: 'Greenland', country_capital: 'Nuuk', continent_code: 'NA', continent_name: 'North America', currency: 'DKK'},
                    'GP': {country_name: 'Guadeloupe', country_capital: 'Basse-Terre', continent_code: 'NA', continent_name: 'North America', currency: 'EUR'},
                    'GT': {country_name: 'Guatemala', country_capital: 'Guatemala City', continent_code: 'NA', continent_name: 'North America', currency: 'GTQ'},
                    'HN': {country_name: 'Honduras', country_capital: 'Tegucigalpa', continent_code: 'NA', continent_name: 'North America', currency: 'HNL'},
                    'HT': {country_name: 'Haiti', country_capital: 'Port-au-Prince', continent_code: 'NA', continent_name: 'North America', currency: 'HTG'},
                    'JM': {country_name: 'Jamaica', country_capital: 'Kingston', continent_code: 'NA', continent_name: 'North America', currency: 'JMD'},
                    'KN': {country_name: 'Saint Kitts and Nevis', country_capital: 'Basseterre', continent_code: 'NA', continent_name: 'North America', currency: 'XCD'},
                    'KY': {country_name: 'Cayman Islands', country_capital: 'George Town', continent_code: 'NA', continent_name: 'North America', currency: 'KYD'},
                    'LC': {country_name: 'Saint Lucia', country_capital: 'Castries', continent_code: 'NA', continent_name: 'North America', currency: 'XCD'},
                    'MF': {country_name: 'Saint Martin', country_capital: 'Marigot', continent_code: 'NA', continent_name: 'North America', currency: 'EUR'},
                    'MQ': {country_name: 'Martinique', country_capital: 'Fort-de-France', continent_code: 'NA', continent_name: 'North America', currency: 'EUR'},
                    'MS': {country_name: 'Montserrat', country_capital: 'Plymouth', continent_code: 'NA', continent_name: 'North America', currency: 'XCD'},
                    'MX': {country_name: 'Mexico', country_capital: 'Mexico City', continent_code: 'NA', continent_name: 'North America', currency: 'MXN'},
                    'NI': {country_name: 'Nicaragua', country_capital: 'Managua', continent_code: 'NA', continent_name: 'North America', currency: 'NIO'},
                    'PA': {country_name: 'Panama', country_capital: 'Panama City', continent_code: 'NA', continent_name: 'North America', currency: 'PAB'},
                    'PM': {country_name: 'Saint Pierre and Miquelon', country_capital: 'Saint-Pierre', continent_code: 'NA', continent_name: 'North America', currency: 'EUR'},
                    'PR': {country_name: 'Puerto Rico', country_capital: 'San Juan', continent_code: 'NA', continent_name: 'North America', currency: 'USD'},
                    'SV': {country_name: 'El Salvador', country_capital: 'San Salvador', continent_code: 'NA', continent_name: 'North America', currency: 'USD'},
                    'SX': {country_name: 'Sint Maarten', country_capital: 'Philipsburg', continent_code: 'NA', continent_name: 'North America', currency: 'ANG'},
                    'TC': {country_name: 'Turks and Caicos Islands', country_capital: 'Cockburn Town', continent_code: 'NA', continent_name: 'North America', currency: 'USD'},
                    'TT': {country_name: 'Trinidad and Tobago', country_capital: 'Port of Spain', continent_code: 'NA', continent_name: 'North America', currency: 'TTD'},
                    'US': {country_name: 'United States', country_capital: 'Washington', continent_code: 'NA', continent_name: 'North America', currency: 'USD'},
                    'VC': {country_name: 'Saint Vincent and the Grenadines', country_capital: 'Kingstown', continent_code: 'NA', continent_name: 'North America', currency: 'XCD'},
                    'VG': {country_name: 'British Virgin Islands', country_capital: 'Road Town', continent_code: 'NA', continent_name: 'North America', currency: 'USD'},
                    'VI': {country_name: 'U.S. Virgin Islands', country_capital: 'Charlotte Amalie', continent_code: 'NA', continent_name: 'North America', currency: 'USD'},
                    'AN': {country_name: 'Netherlands Antilles', country_capital: 'Willemstad', continent_code: 'NA', continent_name: 'North America', currency: 'ANG'},
                    'AS': {country_name: 'American Samoa', country_capital: 'Pago Pago', continent_code: 'OC', continent_name: 'Oceania', currency: 'USD'},
                    'AU': {country_name: 'Australia', country_capital: 'Canberra', continent_code: 'OC', continent_name: 'Oceania', currency: 'AUD'},
                    'CK': {country_name: 'Cook Islands', country_capital: 'Avarua', continent_code: 'OC', continent_name: 'Oceania', currency: 'NZD'},
                    'FJ': {country_name: 'Fiji', country_capital: 'Suva', continent_code: 'OC', continent_name: 'Oceania', currency: 'FJD'},
                    'FM': {country_name: 'Micronesia', country_capital: 'Palikir', continent_code: 'OC', continent_name: 'Oceania', currency: 'USD'},
                    'GU': {country_name: 'Guam', country_capital: 'Hagåtña', continent_code: 'OC', continent_name: 'Oceania', currency: 'USD'},
                    'KI': {country_name: 'Kiribati', country_capital: 'Tarawa', continent_code: 'OC', continent_name: 'Oceania', currency: 'AUD'},
                    'MH': {country_name: 'Marshall Islands', country_capital: 'Majuro', continent_code: 'OC', continent_name: 'Oceania', currency: 'USD'},
                    'MP': {country_name: 'Northern Mariana Islands', country_capital: 'Saipan', continent_code: 'OC', continent_name: 'Oceania', currency: 'USD'},
                    'NC': {country_name: 'New Caledonia', country_capital: 'Nouméa', continent_code: 'OC', continent_name: 'Oceania', currency: 'XPF'},
                    'NF': {country_name: 'Norfolk Island', country_capital: 'Kingston', continent_code: 'OC', continent_name: 'Oceania', currency: 'AUD'},
                    'NR': {country_name: 'Nauru', country_capital: 'Yaren', continent_code: 'OC', continent_name: 'Oceania', currency: 'AUD'},
                    'NU': {country_name: 'Niue', country_capital: 'Alofi', continent_code: 'OC', continent_name: 'Oceania', currency: 'NZD'},
                    'NZ': {country_name: 'New Zealand', country_capital: 'Wellington', continent_code: 'OC', continent_name: 'Oceania', currency: 'NZD'},
                    'PF': {country_name: 'French Polynesia', country_capital: 'Papeete', continent_code: 'OC', continent_name: 'Oceania', currency: 'XPF'},
                    'PG': {country_name: 'Papua New Guinea', country_capital: 'Port Moresby', continent_code: 'OC', continent_name: 'Oceania', currency: 'PGK'},
                    'PN': {country_name: 'Pitcairn', country_capital: 'Adamstown', continent_code: 'OC', continent_name: 'Oceania', currency: 'NZD'},
                    'PW': {country_name: 'Palau', country_capital: 'Melekeok', continent_code: 'OC', continent_name: 'Oceania', currency: 'USD'},
                    'SB': {country_name: 'Solomon Islands', country_capital: 'Honiara', continent_code: 'OC', continent_name: 'Oceania', currency: 'SBD'},
                    'TK': {country_name: 'Tokelau', country_capital: '', continent_code: 'OC', continent_name: 'Oceania', currency: 'NZD'},
                    'TL': {country_name: 'East Timor', country_capital: 'Dili', continent_code: 'OC', continent_name: 'Oceania', currency: 'USD'},
                    'TO': {country_name: 'Tonga', country_capital: 'Nuku\'alofa', continent_code: 'OC', continent_name: 'Oceania', currency: 'TOP'},
                    'TV': {country_name: 'Tuvalu', country_capital: 'Funafuti', continent_code: 'OC', continent_name: 'Oceania', currency: 'AUD'},
                    'UM': {country_name: 'United States Minor Outlying Islands', country_capital: '', continent_code: 'OC', continent_name: 'Oceania', currency: 'USD'},
                    'VU': {country_name: 'Vanuatu', country_capital: 'Port Vila', continent_code: 'OC', continent_name: 'Oceania', currency: 'VUV'},
                    'WF': {country_name: 'Wallis and Futuna', country_capital: 'Matâ\'Utu', continent_code: 'OC', continent_name: 'Oceania', currency: 'XPF'},
                    'WS': {country_name: 'Samoa', country_capital: 'Apia', continent_code: 'OC', continent_name: 'Oceania', currency: 'WST'},
                    'AR': {country_name: 'Argentina', country_capital: 'Buenos Aires', continent_code: 'SA', continent_name: 'South America', currency: 'ARS'},
                    'BO': {country_name: 'Bolivia', country_capital: 'La Paz', continent_code: 'SA', continent_name: 'South America', currency: 'BOB'},
                    'BR': {country_name: 'Brazil', country_capital: 'Brasília', continent_code: 'SA', continent_name: 'South America', currency: 'BRL'},
                    'CL': {country_name: 'Chile', country_capital: 'Santiago', continent_code: 'SA', continent_name: 'South America', currency: 'CLP'},
                    'CO': {country_name: 'Colombia', country_capital: 'Bogotá', continent_code: 'SA', continent_name: 'South America', currency: 'COP'},
                    'EC': {country_name: 'Ecuador', country_capital: 'Quito', continent_code: 'SA', continent_name: 'South America', currency: 'USD'},
                    'FK': {country_name: 'Falkland Islands', country_capital: 'Stanley', continent_code: 'SA', continent_name: 'South America', currency: 'FKP'},
                    'GF': {country_name: 'French Guiana', country_capital: 'Cayenne', continent_code: 'SA', continent_name: 'South America', currency: 'EUR'},
                    'GY': {country_name: 'Guyana', country_capital: 'Georgetown', continent_code: 'SA', continent_name: 'South America', currency: 'GYD'},
                    'PE': {country_name: 'Peru', country_capital: 'Lima', continent_code: 'SA', continent_name: 'South America', currency: 'PEN'},
                    'PY': {country_name: 'Paraguay', country_capital: 'Asunción', continent_code: 'SA', continent_name: 'South America', currency: 'PYG'},
                    'SR': {country_name: 'Suriname', country_capital: 'Paramaribo', continent_code: 'SA', continent_name: 'South America', currency: 'SRD'},
                    'UY': {country_name: 'Uruguay', country_capital: 'Montevideo', continent_code: 'SA', continent_name: 'South America', currency: 'UYU'},
                    'VE': {country_name: 'Venezuela', country_capital: 'Caracas', continent_code: 'SA', continent_name: 'South America', currency: 'VEF'},
                    'AQ': {country_name: 'Antarctica', country_capital: '', continent_code: 'AN', continent_name: 'Antarctica', currency: ''},
                    'BV': {country_name: 'Bouvet Island', country_capital: '', continent_code: 'AN', continent_name: 'Antarctica', currency: 'NOK'},
                    'GS': {country_name: 'South Georgia and the South Sandwich Islands', country_capital: 'Grytviken', continent_code: 'AN', continent_name: 'Antarctica', currency: 'GBP'},
                    'HM': {country_name: 'Heard Island and McDonald Islands', country_capital: '', continent_code: 'AN', continent_name: 'Antarctica', currency: 'AUD'},
                    'TF': {country_name: 'French Southern Territories', country_capital: 'Port-aux-Français', continent_code: 'AN', continent_name: 'Antarctica', currency: 'EUR'}
                };

                self.view.attachViewHelper();
                self.render({countryList: countryList, data: resData.countries});
            });
        }
    },
    /**
     * Load Report of registered growth by country page
     */
    countryGrowthAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var dateFrom = self.getParam(Constant.PARAM_REPORT_DATE_FROM, '');
            var dateTo = self.getParam(Constant.PARAM_REPORT_DATE_TO, '');

            if (!dateFrom) {
                dateFrom = '10/01/2013';
            }

            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (dateTo) {
                var parts = _s.words(dateTo, '/');
                var dateTo = new Date(parts[2] + '-' + parts[0] + '-' + parts[1]);
                if (dateTo > yesterday) {
                    dateTo = yesterday;
                }
            } else {
                dateTo = yesterday;
            }

            var strDateTo = (dateTo.getMonth() + 1) + '/' + dateTo.getDate() + '/' + dateTo.getFullYear();

            reportModel.getRegisteredCountryGrowth({from: dateFrom, to: strDateTo}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                var colorData = resData.colorData;

                var colorDataKeys = _.keys(colorData);
                for (var i = 0; i < colorDataKeys.length; i++) {
                    if (Number(colorDataKeys[i])) {
                        colorDataKeys[i] = Number(colorDataKeys[i]);
                    }
                }

                colorDataKeys = _.sortBy(colorDataKeys);
                var colorDataValues = _.values(colorData);

                self.view.attachViewHelper();
                self.render({dateFrom: dateFrom, dateTo: strDateTo, colorList: resData.colors, countryGeo: resData.countryGeo, oldGeo: resData.oldGeo,
                    colorDataKeys: colorDataKeys, colorDataValues: colorDataValues});
            });
        }
    }
});