// lib/firebaseAdmin.js

import admin from 'firebase-admin';

const serviceAccount = {
    "type": "service_account",
    "project_id": 'blog-platform-6c30c',
    "private_key_id": 'fc3b436be3057815f9d71995e578002be0ceb778',
    "private_key": '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDDf/srYCWzPxVZ\nF+sq7z2qbkIX3kF1Odlcz0pQNYiBzKI1fMQTe41jMgwrsjDuej/t8J0xYQXw37DT\nDceHVsevsOQ3dT/HmGtFt+tlRpgrdXC2V6jdBwClM/rbEAQdjooR9vNhnaz4ntCu\nqiADtvdyK4Zr7Fmhb5TcRc2DQHSYW4hd8sTfPV6qXryOdCV5hjF6yp3v+rjNu9yk\nAlTaEOEiLLGuxjrqe4vS0SSf8Go6xqSRr6ZlGoVjgePzyI68NLcWaxXLZIClqIMz\n168k5DxwLROAo+JkjOg7tSeHLYsDtppIWN7qxW1s444w+pS2bg6gytyOLfJHhaDZ\n7fCGtk6tAgMBAAECggEAKoFj8b1Y1Q0NLi7GIbKcfLa2Rgw7vSoTuVsUdDX/dQEx\n72EuHHJLflq+TK3Ud7U6uxgKhVbr/MAV6P1g+WsDxY43QFuMv2/DOwhO9NkRcrl5\nBRwwCcZg/Io9q21jB64bFObVac7ncbLN+nvgtA4O5NLTyhk8L55cBjxi/3t/HjS+\n0g2gND5oZIw1bmmUMqQ8XcRxrwSGMqjYJtTGEmRIE2Tcb5qpbfAejAhTKYbo+BB2\nHBLbotaHpVm8dHZIJCx0SuY6jv+vkgXPqXiyMVAxy6yDSM02LsmLMT9NGX+EJ7zT\n2HYgbQWMkuawYrghfVVyVytUZqKhWmqN2HjpBxGHnQKBgQD1YZodLE3tcAr/9AtC\nPuiVD70FKn0gvy1/bzWvNcqXUP1oHuF0rcCx3udyqLkc0pArUyhXs4CXbyHmfilw\nb1kdx+ieIzxxdJx9xZiHcTiJZELJY6vYhdr5lPtxxiaKei7LrdHE/Se9zQ4CVHmK\n+Yw1UYofv6rgj4Yf8tJVPF1hNwKBgQDL9cfX1Sr4g5B7EcJCI+qmWnlHJJBYxtWa\ndXFqo0ezA9CE0vpC5Msn7Fn2WPyUe1IxOeltBq+kVNQXSo+14/8cDuHOP+4pf9Jf\nmQkjB8yhIvpsg0JmnH6fB2kW6y7SRQ/M7XXIrreCvJx7CaTOEFYT8Kq6SsP2lse/\n8hJTu0XROwKBgGcaYJgbco7uwiBz2Xs3VaC0YTbXeIYW7jYac1MwZfSYmjFysEbH\nby0NvPBHhqherScXJN9c1A5NKtBfeGf+0VIbGlm/8ni1h7+tE/7tCtVn5Ewcbitn\nau/tso1GthD/b8QzP+3mdRliHJ3MAtnrKweIQGJAtbrvc2rfK5OW7qGXAoGBAL0O\nWevKgEZTTX2GfJZqTHteqcQ0NEjWJfFCo5rBNxjMlGBKYAfZpCahgtJCsf3AQfO3\nRpP0+qJMrzvXtVZYvIP5l31i7RQyk4JhjIKYHCnRDme/U7Fhpk0qxVKlNYVa1saR\n5ffbW+cnhbTWv5jys5dQIjEEVJkiMo3NiQdsM885AoGBANU3IBbcSq5kQCFURx2d\nrc/M4+k2KsE5xmd5+Wl6NktELE4rhvTd6iUqXviF8+/v4O5atd+790KzxzZW9xr4\ntldcjsBw6rNCDErNf7wnX/QzyxDJF0dFRf125Bkl1QkK+NLH+8JZi1IKSLmSbaL1\nx1Of0J86P/7AOQABDo6kspPn\n-----END PRIVATE KEY-----\n',
    "client_email": 'firebase-adminsdk-2xdkr@blog-platform-6c30c.iam.gserviceaccount.com',
    "client_id": '101566849257796892232',
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2xdkr%40blog-platform-6c30c.iam.gserviceaccount.com',
    "universe_domain": "googleapis.com"
}
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const authAdmin = admin.auth();
